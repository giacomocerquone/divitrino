import React from "react";
import { Route } from "react-router";
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
import AddPerson from "pages/AddPerson";

const AppRoutes = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/" component={Movements} exact={true} />
        <Route path="/bilancio" component={Balance} />
        <Route path="/nuovo-pagamento" component={AddPayment} />
        <Route path="/nuova-spesa" component={AddPurchase} />
        <Route path="/persone" component={People} />
        <Route path="/nuova-persona" component={AddPerson} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" mode="md">
        <IonTabButton tab="movimenti" href="/">
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
