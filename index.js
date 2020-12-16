import React from 'react';
import { Provider as PaperProvider} from 'react-native-paper';
import 'react-native-gesture-handler';
import {AppRegistry,ActivityIndicator} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {ConfigureStore} from './redux/store.js';
import { AppearanceProvider } from 'react-native-appearance';
import {theme,CustomDefaultTheme,CustomeDarkTheme} from './App';
import {ThemeManagerProvider} from './components/authContext/AuthContext';
const {persistor,store}=ConfigureStore()

 export default function Main(){
 return (
    <AppearanceProvider>
    <ThemeManagerProvider>
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
    </ThemeManagerProvider>
    </AppearanceProvider>
  );
 }
AppRegistry.registerComponent(appName, () => Main);
