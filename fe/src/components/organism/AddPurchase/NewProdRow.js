import { IonButton, IonIcon, IonItem } from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import useProdInputs from "hooks/useProdInputs";

const NewProdRow = ({ setProds }) => {
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");

  const onProdAdd = async () => {
    if (prodName && prodPrice) {
      setProds((p) => [
        ...p,
        {
          name: prodName,
          amount: prodPrice,
          id: uuidv4(),
        },
      ]);
      setProdName();
      setProdPrice();
    }
  };

  const { NameInput, PriceInput } = useProdInputs({
    nameProps: {
      value: prodName,
      onIonChange: (e) => setProdName(e.detail.value),
      placeholder: "Nome prodotto",
    },
    priceProps: {
      value: prodPrice,
      style: { flex: 0.4, marginLeft: 10 },
      type: "number",
      onIonChange: (e) => setProdPrice(e.detail.value),
      placeholder: "Prezzo",
    },
    submit: onProdAdd,
  });

  return (
    <CustomIonItem>
      <IonButton
        disabled={!prodName}
        style={{ marginInlineEnd: 20 }}
        mode="ios"
        slot="start"
        onClick={onProdAdd}
      >
        <IonIcon icon={add} />
      </IonButton>
      {NameInput}
      {PriceInput}
    </CustomIonItem>
  );
};

export default NewProdRow;

const CustomIonItem = styled(IonItem)`
  --padding-start: 10px;
`;
