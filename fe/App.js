import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import AppNavigator from './app.navigator';
import {store, persistor} from 'store/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppNavigator />
          <FlashMessage position="bottom" />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
