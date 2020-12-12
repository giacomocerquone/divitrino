import React from "react";
import { Redirect, Route } from "react-router";
import Balance from "pages/Balance";
import Movements from "pages/Movements";
import AddPayment from "pages/AddPayment";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { peopleCircleOutline, listOutline } from "ionicons/icons";

const AppRoutes = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/movimenti" component={Movements} exact={true} />
        <Route path="/bilancio" component={Balance} exact={true} />
        <Route path="/nuovo-pagamento" component={AddPayment} exact={true} />
        <Redirect exact from="/" to="/movimenti" />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
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
