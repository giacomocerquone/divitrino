import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
} from "@ionic/react";
import PageContainer from "components/atoms/PageContainer";
import React from "react";
import { IonTitle, IonToolbar } from "components/atoms/CustomIon";
import {
  getMovementById,
  getMovementProducts,
  getPersonById,
} from "store/app.reducer";
import { useSelector } from "react-redux";
import ProductRow from "components/organism/ProductRow";

const PurchaseDetail = ({ match }) => {
  const purchase = useSelector((state) =>
    getMovementById(state, match.params.id)
  );
  const purchasedProds = useSelector((state) =>
    getMovementProducts(state, match.params.id)
  );

  const payer = useSelector((state) => getPersonById(state, purchase.payer));

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Indietro" default-href="/" />
          </IonButtons>
          <IonTitle>{purchase.description}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PageContainer>
          <IonList>
            {purchasedProds.map((p) => (
              <ProductRow key={p.id} product={p} />
            ))}
          </IonList>
          <p>Pagato da {payer.name}</p>
        </PageContainer>
      </IonContent>
    </IonPage>
  );
};

export default PurchaseDetail;
