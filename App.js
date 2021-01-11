import React,{useEffect,useContext} from 'react';
import {
  StyleSheet,
  ScrollView,
  View, 
  Text,
  StatusBar,
  Platform,
  ToastAndroid
} from 'react-native';
import { NavigationContainer,DarkTheme as NavigationDarkTheme,DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginHomeStack from './screens/stackComponent';
import OnboardingScreen from './screens/OnboardScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import { useTheme } from '@react-navigation/native';
import {ThemeManagerContext} from './components/authContext/AuthContext';
import SplashScreen from 'react-native-splash-screen';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const AppStack=createStackNavigator();

export const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background:'#ffffff',
    text:'#333333'
  },
};

export const CustomDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background:'#333333',
    text:'#ffffff'
  },
};


const App=(props) => {
 const {isDark}=useContext(ThemeManagerContext);
 const [isFirstLaunch,setIsFirstLaunch]=React.useState(true);
 const  handleConnectivityChange=(connectionInfo)=>{
  switch(connectionInfo.type){
    case 'none':
    return ToastAndroid.show('You are now offline!',ToastAndroid.LONG);
    break;
    case 'wifi':
    return ToastAndroid.show('You are now connected to wifi',ToastAndroid.LONG);
    break;
    case 'cellular':
    return ToastAndroid.show('You are now conneted to cellular',ToastAndroid.LONG);
    break;
    case 'unknown':
    return ToastAndroid.show('You are now have an unknown connection',ToastAndroid.LONG);
    break;
    default:
    break;
  }
}
  useEffect(()=>{
    SplashScreen.hide();
    AsyncStorage.getItem('alreadyLaunched').then(value=>{
      if(value===null){
        AsyncStorage.setItem('alreadyLaunched','true');
        setIsFirstLaunch(true);
      }else{
        setIsFirstLaunch(false);
      }
     });
      NetInfo.fetch()
      .then((connectionInfo)=>{
        if(connectionInfo.type==='cellular'){
          ToastAndroid.show('Intial Network Connectivity Type:'
            + connectionInfo.type+', Connection:'+ connectionInfo.isConnected+', Carrier :'+connectionInfo.details.carrier,
            ToastAndroid.LONG)
        }else{
         ToastAndroid.show('Intial Network Connectivity Type:'
          + connectionInfo.type+', Connection:'+ connectionInfo.isConnected+', Strength :'+connectionInfo.details.strength,
          ToastAndroid.LONG)
       }
     });
      window.value=NetInfo.addEventListener(connectionChange=>handleConnectivityChange(connectionChange));
  },[isFirstLaunch,window.value]);

  if(isFirstLaunch===null){
    return null;
  }else{
    return (
    <SafeAreaProvider>
    <StatusBar backgroundColor="#004ba0" barStyle="light-content" style={styles.statusBar}/>
    <NavigationContainer theme={isDark?CustomDarkTheme:CustomDefaultTheme}>
        {
          (isFirstLaunch===true)?(
            <AppStack.Navigator
            headerMode="none"
            >
            <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
            <AppStack.Screen name="Login" component={LoginHomeStack} />
            </AppStack.Navigator>
            ):(
            <AppStack.Navigator
            headerMode="none"
            >
            <AppStack.Screen name="Login" component={LoginHomeStack} />
            </AppStack.Navigator>
            )
          }
    </NavigationContainer>
    </SafeAreaProvider>
      );
  }
  
};

const styles=StyleSheet.create({
  statusBar:{
    flex:0,
    height:STATUSBAR_HEIGHT
  }
})

export default App;
