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
import {
  listOutline,
  cashOutline,
  peopleCircleOutline,
  logInOutline,
} from "ionicons/icons";
import AddPurchase from "pages/AddPurchase";
import Balance from "pages/Balance";
import Movements from "pages/Movements";
import AddPayment from "pages/AddPayment";
import PurchaseDetail from "pages/PurchaseDetail";
import People from "pages/People";
import Login from "pages/Login";

const AppRoutes = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/login" component={Login} />
        <Route path="/people" component={People} />
        <Route path="/movimenti" component={Movements} exact={true} />
        <Route path="/bilancio" component={Balance} />
        <Route path="/movimenti/new-trasferimento" component={AddPayment} />
        <Route path="/movimenti/new-acquisto" component={AddPurchase} />
        <Route path="/movimenti/dettaglio/:id" component={PurchaseDetail} />
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
        <IonTabButton tab="people" href="/people">
          <IonIcon icon={peopleCircleOutline} />
          <IonLabel>People</IonLabel>
        </IonTabButton>
        <IonTabButton tab="bilancio" href="/bilancio">
          <IonIcon icon={cashOutline} />
          <IonLabel>Bilancio</IonLabel>
        </IonTabButton>
        <IonTabButton tab="login" href="/login">
          <IonIcon icon={logInOutline} />
          <IonLabel>Login</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppRoutes;
