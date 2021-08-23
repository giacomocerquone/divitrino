import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, Keyboard, Platform, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/atoms/Button";
import AssignModal from "../components/organisms/NewPurchase/AssignModal";
import Product from "../components/organisms/NewPurchase/Product";
import ProductInput from "../components/organisms/NewPurchase/ProductInput";
import RecapModal from "../components/organisms/NewPurchase/RecapModal";
import Toolbar from "../components/organisms/NewPurchase/Toolbar";
import { colors, unit } from "../constants/ui";
import { IProduct, IUser } from "../interfaces";
import { getPurchaseProducts } from "../store";
import * as purchaseActions from "../store/purchaseSlice";

type TSelectedProds = Record<string, boolean>;

const keyboardDismissProp =
  Platform.OS === "ios"
    ? { keyboardDismissMode: "on-drag" }
    : { onScrollEndDrag: Keyboard.dismiss };

const NewPurchase = () => {
  const dispatch = useDispatch();
  const prods = useSelector(getPurchaseProducts);
  const [selectedProdsIndexes, setSelectedProdsIndexes] =
    useState<TSelectedProds>({});
  const assignSheet = useRef<BottomSheetModal>(null);
  const recapSheet = useRef<BottomSheetModal>(null);

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
    const someIsSelected = Object.values(selectedProdsIndexes).some(
      (selected) => selected
    );
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

  const onSubmit = () => {
    // TODO submit new purchase to server
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
        label="Aggiungi"
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
