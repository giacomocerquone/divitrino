import {
  IonCheckbox,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import useProdInputs from "hooks/useProdInputs";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPeopleObj, getPurchaseProducts } from "store/app.reducer";
import purchaseSlice from "reducers/purchase";

export const ProdRow = ({
  setAssignModalOpen,
  product,
  selectedRows,
  setSelectedRows,
}) => {
  const peopleObj = useSelector(getPeopleObj);
  const debtorsString = product?.debtors?.length
    ? product.debtors.map((d) => peopleObj[d].name).join(", ")
    : "";
  const itemSliding = useRef(null);
  const setProds = (prods) => dispatch(purchaseSlice.actions.addProds(prods));
  const prods = useSelector(getPurchaseProducts);
  const dispatch = useDispatch();

  const updateProduct = (e) => {
    // TODO normalize prods array in obj
    const newProds = prods.map((p) => {
      if (p.id === product.id) {
        return {
          ...p,
          [e.target.name]: e.detail.value,
        };
      }
      return p;
    });

    setProds(newProds);
  };

  const { NameInput, PriceInput } = useProdInputs({
    nameProps: {
      placeholder: "Nome prodotto",
      name: "name",
      onIonChange: updateProduct,
      style: { marginRight: 10 },
      value: product.name,
    },
    priceProps: {
      type: "number",
      name: "amount",
      onIonChange: updateProduct,
      placeholder: "Prezzo",
      style: { flex: 0.3 },
      value: product.amount,
    },
  });

  const onSingleAssignIntent = (id, slidingRef) => {
    if (slidingRef) {
      slidingRef.close();
    }
    setSelectedRows({ [id]: true });
    setAssignModalOpen(true);
  };

  const onDelete = async (id) => {
    dispatch(purchaseSlice.actions.delProds({ idsToDelete: [id] }));
  };

  return (
    <IonItemSliding ref={itemSliding}>
      <IonItemOptions side="start">
        <IonItemOption
          color="primary"
          onClick={() => onSingleAssignIntent(product.id, itemSliding?.current)}
        >
          assegna
        </IonItemOption>
      </IonItemOptions>

      <IonItem mode="md">
        <IonCheckbox
          slot="start"
          checked={selectedRows?.[product.id]}
          onClick={() =>
            setSelectedRows((rows) => ({
              ...rows,
              [product.id]: !rows[product.id],
            }))
          }
        />

        <IonLabel position="stacked">
          {debtorsString && <p>Di: {debtorsString}</p>}
        </IonLabel>

        <div style={{ display: "flex", marginTop: debtorsString ? 0 : 10 }}>
          {NameInput}
          {PriceInput}
        </div>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={() => onDelete(product.id)}>
          elimina
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};
