import React from "react";
import { Redirect, Route } from "react-router";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { peopleCircleOutline, listOutline } from "ionicons/icons";
import AddPurchase from "pages/AddPurchase";
import Balance from "pages/Balance";
import Movements from "pages/Movements";
import AddPayment from "pages/AddPayment";
import People from "pages/People";
import PurchaseDetail from "pages/PurchaseDetail";

const AppRoutes = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/movimenti" component={Movements} exact={true} />
        <Route path="/bilancio" component={Balance} />
        <Route path="/nuovo-trasferimento" component={AddPayment} />
        <Route path="/nuovo-acquisto" component={AddPurchase} />
        <Route path="/dettaglio-acquisto/:id" component={PurchaseDetail} />
        <Route path="/persone" component={People} />
        <Route
          path="/"
          render={() => <Redirect to="/movimenti" />}
          exact={true}
        />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" mode="md">
        <IonTabButton tab="movimenti" href="/movimenti">
          <IonIcon icon={listOutline} />
          <IonLabel>Movimenti</IonLabel>
        </IonTabButton>
        <IonTabButton tab="bilancio" href="/bilancio">
          <IonIcon icon={peopleCircleOutline} />
          <IonLabel>Bilancio</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppRoutes;
