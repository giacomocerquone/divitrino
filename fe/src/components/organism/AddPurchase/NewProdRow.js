import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const NewProdRow = ({ setProds }) => {
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const nameRef = useRef(null);
  const priceRef = useRef(null);

  const onProdAdd = async () => {
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
  };

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
      <IonInput
        ref={nameRef}
        onKeyPress={(e) => e.key === "Enter" && priceRef.current.setFocus()}
        autocorrect
        autocapitalize
        value={prodName}
        placeholder="Nome prodotto"
        onIonChange={(e) => setProdName(e.detail.value)}
        clearInput
      ></IonInput>
      <IonInput
        ref={priceRef}
        style={{ flex: 0.4 }}
        onKeyPress={(e) => {
          if (e.key === "Enter" && prodName && prodPrice) {
            onProdAdd();
            nameRef.current.setFocus();
          }
        }}
        value={prodPrice}
        type="number"
        onIonChange={(e) => setProdPrice(e.detail.value)}
        placeholder="Prezzo"
        clearInput
      ></IonInput>
    </CustomIonItem>
  );
};

export default NewProdRow;

const CustomIonItem = styled(IonItem)`
  --padding-start: 10px;
`;
