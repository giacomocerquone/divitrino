import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const NewProdRow = ({ setProds }) => {
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");

  const onProdAdd = async () => {
    setProds((p) => [...p, { name: prodName, price: prodPrice, id: uuidv4() }]);
    setProdName();
    setProdPrice();
  };

  return (
    <CustomIonItem>
      <IonButton
        disabled={!prodName || !prodPrice}
        style={{ marginInlineEnd: 20 }}
        mode="ios"
        slot="start"
        onClick={onProdAdd}
      >
        <IonIcon icon={add} />
      </IonButton>
      <IonInput
        value={prodName}
        placeholder="Nome"
        onIonChange={(e) => setProdName(e.detail.value)}
        clearInput
      ></IonInput>
      <IonInput
        style={{ flex: 0.3 }}
        value={prodPrice}
        type="number"
        onIonChange={(e) => setProdPrice(e.detail.value)}
        placeholder="€"
        clearInput
      ></IonInput>
    </CustomIonItem>
  );
};

export default NewProdRow;

const CustomIonItem = styled(IonItem)`
  --padding-start: 10px;
`;
