import React from "react";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Provider } from "react-redux";
import { store, persistor } from "store/store";
import { PersistGate } from "redux-persist/integration/react";
import AppRoutes from "App.routes";
import GenericAlert from "components/atoms/GenericAlert";
import { OpenCvProvider } from "opencv-react";

const App = () => (
  <OpenCvProvider openCvPath="./opencv/opencv.js">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IonApp>
          <IonReactRouter>
            <AppRoutes />
            <GenericAlert />
          </IonReactRouter>
        </IonApp>
      </PersistGate>
    </Provider>
  </OpenCvProvider>
);

export default App;
