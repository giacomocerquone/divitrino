import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const NewProdRow = ({ setProds }) => {
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");

  const onProdAdd = async () => {
    setProds((p) => [...p, { name: prodName, price: prodPrice, id: uuidv4() }]);
    setProdName();
    setProdPrice();
  };

  return (
    <IonItem>
      <IonInput
        value={prodName}
        placeholder="Nome"
        onIonChange={(e) => setProdName(e.detail.value)}
        clearInput
      ></IonInput>
      <IonInput
        value={prodPrice}
        onIonChange={(e) => setProdPrice(e.detail.value)}
        placeholder="Prezzo"
        clearInput
      ></IonInput>
      <IonButton mode="ios" slot="end" onClick={onProdAdd}>
        <IonIcon icon={add} />
      </IonButton>
    </IonItem>
  );
};

export default NewProdRow;
