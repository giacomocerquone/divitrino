import React from "react";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Provider } from "react-redux";
import { store, persistor } from "store/store";
import { PersistGate } from "redux-persist/integration/react";
import AppRoutes from "App.routes";
import GenericAlert from "components/atoms/GenericAlert";
import { ClientContext, GraphQLClient } from "graphql-hooks";
import userSlice from "reducers/user";

const client = new GraphQLClient({
  url: `${process.env.REACT_APP_API_ORIGIN}graphql`,
  fetch: (url, opts) => {
    const token = store.getState()?.user?.token;
    console.log("RETRIEVE TOKEN LOG", store.getState());

    // todo or is expired
    if (!token) {
      store.dispatch(userSlice.actions.logout());
    }

    return fetch(url, {
      ...opts,
      headers: {
        ...opts.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  },
});

const App = () => (
  <ClientContext.Provider value={client}>
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
  </ClientContext.Provider>
);

export default App;
