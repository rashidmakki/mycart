import React from 'react';
import 'react-native-gesture-handler';
import {AppRegistry,ActivityIndicator} from 'react-native';
import App from './App';
import { Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {ConfigureStore} from './redux/store.js';

const {persistor,store}=ConfigureStore()

 export default function Main(){
 return (
    <PaperProvider>
    <Provider store={store}>
     <PersistGate 
            loading={<ActivityIndicator/>}
            persistor={persistor}
            >
      <App />
      </PersistGate>
      </Provider>
    </PaperProvider>
  );
 }
AppRegistry.registerComponent(appName, () => Main);
