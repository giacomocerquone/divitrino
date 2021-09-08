import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, Keyboard, Platform, StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/atoms/Button";
import AssignModal from "../components/organisms/NewPurchase/AssignModal";
import Product from "../components/organisms/NewPurchase/Product";
import ProductInput from "../components/organisms/NewPurchase/ProductInput";
import RecapModal from "../components/organisms/NewPurchase/RecapModal";
import Toolbar from "../components/organisms/NewPurchase/Toolbar";
import * as endpoints from "../constants/endpoints";
import { colors, unit } from "../constants/ui";
import { IAPIProduct, IProduct, IUser } from "../interfaces";
import client from "../services/client";
import { getActiveGroupId, getPurchaseState } from "../store";
import * as purchaseActions from "../store/purchaseSlice";
import { convertToCents } from "../utils";

type TSelectedProds = Record<string, boolean>;

const keyboardDismissProp =
  Platform.OS === "ios"
    ? { keyboardDismissMode: "on-drag" }
    : { onScrollEndDrag: Keyboard.dismiss };

const NewPurchase = () => {
  const { goBack } = useNavigation();
  const dispatch = useDispatch();
  const { prods } = useSelector(getPurchaseState);
  const groupId = useSelector(getActiveGroupId);
  const [selectedProdsIndexes, setSelectedProdsIndexes] =
    useState<TSelectedProds>({});
  const assignSheet = useRef<BottomSheetModal>(null);
  const recapSheet = useRef<BottomSheetModal>(null);
  const someIsSelected = Object.values(selectedProdsIndexes).some(
    (selected) => selected
  );

  const onProductPress = useCallback(
    (idx) => {
      setSelectedProdsIndexes((idxs) => ({
        ...idxs,
        [idx]: !selectedProdsIndexes[idx],
      }));
    },
    [selectedProdsIndexes]
  );

  const onSelectAll = () => {
    const areAllSelected = Object.values(Array.from(prods.keys())).every(
      (index) => selectedProdsIndexes[index]
    );
    const newIndexes = prods.reduce<TSelectedProds>((acc, _, idx) => {
      return { ...acc, [idx]: !areAllSelected };
    }, {});

    setSelectedProdsIndexes(newIndexes);
  };

  const onDelete = () => {
    dispatch(
      purchaseActions.delProds(
        Object.keys(selectedProdsIndexes).filter(
          (index) => selectedProdsIndexes[index]
        )
      )
    );
    setSelectedProdsIndexes({});
  };

  const onAssign = () => {
    if (someIsSelected) {
      assignSheet.current?.present();
    }
  };

  const onAssignDone = (selectedPeople: IUser["id"][]) => {
    const editedProds = Object.keys(selectedProdsIndexes).reduce<
      Record<string, IProduct>
    >((acc, idxString) => {
      const idx = parseInt(idxString, 10);
      acc[idx] = {
        ...prods[idx],
        debtors: selectedPeople,
      };

      return acc;
    }, {});
    dispatch(purchaseActions.editProds(editedProds));
    assignSheet.current?.dismiss();
    setSelectedProdsIndexes({});
  };

  const openRecap = async () => {
    recapSheet.current?.present();
  };

  const onSubmit = async (
    selectedPeople: IUser["id"][],
    date: Date,
    description: string
  ) => {
    const transformedProds: IAPIProduct[] = prods.map((prod) => ({
      pricePerDebtor: Math.round(
        convertToCents(prod.price) / prod.debtors.length // todo use dinero.allocate maybe?
      ),
      debtors: prod.debtors as string[],
      name: prod.name,
    }));

    try {
      await client.post(endpoints.purchase, {
        description,
        payerId: selectedPeople[0],
        products: transformedProds,
        groupId,
        date,
      });

      goBack();
      dispatch(purchaseActions.setProds([]));
    } catch (e) {
      showMessage({
        type: "danger",
        message: "Errore",
        description: "Errore aggiunta acquisto",
      });
      console.log("error adding purchase on server", e);
    }
  };

  return (
    <>
      {/* @ts-ignore waiting on https://github.com/facebook/react-native/pull/26422 */}
      <FlatList
        {...keyboardDismissProp}
        data={prods}
        keyboardShouldPersistTaps="handled"
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View
            style={{
              alignItems: "center",
              backgroundColor: colors.darkerWhite,
              paddingBottom: unit * 6,
            }}
          >
            <Toolbar
              onAssign={onAssign}
              onSelectAll={onSelectAll}
              onDelete={onDelete}
              deleteEnabled={someIsSelected}
              assignEnabled={someIsSelected}
              selectDisabled={!prods.length}
            />
          </View>
        }
        contentContainerStyle={styles.root}
        renderItem={({ item, index }) => (
          <Product
            product={item}
            selected={selectedProdsIndexes[index]}
            onPress={onProductPress}
            index={index}
          />
        )}
        ListFooterComponent={<ProductInput />}
        keyExtractor={(_, index) => index.toString()}
      />
      <Button
        disabled={
          !(prods.length && prods.every((prod) => prod?.debtors?.length))
        }
        label="Salva"
        onPress={openRecap}
        style={{ marginVertical: unit * 2 }}
      />
      <AssignModal sheetRef={assignSheet} onDone={onAssignDone} />
      <RecapModal sheetRef={recapSheet} onDone={onSubmit} />
    </>
  );
};

export default NewPurchase;

const styles = StyleSheet.create({
  root: { paddingBottom: unit * 4 },
});
