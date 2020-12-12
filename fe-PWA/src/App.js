import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { peopleCircleOutline, listOutline } from "ionicons/icons";
import Tab1 from "pages/Tab1";
import Tab2 from "pages/Tab2";
import { Provider } from "react-redux";
import { store, persistor } from "store/store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/movimenti" component={Tab1} exact={true} />
              <Route path="/bilancio" component={Tab2} exact={true} />
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
        </IonReactRouter>
      </IonApp>
    </PersistGate>
  </Provider>
);

export default App;
