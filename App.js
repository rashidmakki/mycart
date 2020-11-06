import React,{useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginHomeStack from './screens/stackComponent';
import OnboardingScreen from './screens/OnboardScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider,SafeAreaView} from 'react-native-safe-area-context';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const AppStack=createStackNavigator();

const App=({props}) => {
  const [isFirstLaunch,setIsFirstLaunch]=React.useState(null);
  useEffect(()=>{

    AsyncStorage.getItem('alreadyLaunched').then(value=>{
      if(value===null){
    AsyncStorage.setItem('alreadyLaunched','true');
        setIsFirstLaunch(true);
      }else{
        setIsFirstLaunch(false);
      }
    });
  },[]);
  if(isFirstLaunch===null){
    return null;
  }else if(isFirstLaunch===true){
    return (
    <SafeAreaProvider>
    <StatusBar backgroundColor="#004ba0" barStyle="light-content" style={styles.statusBar}/>
    <NavigationContainer>
      <AppStack.Navigator
          headerMode="none"
        >
      <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AppStack.Screen name="Login" component={LoginHomeStack} />
      </AppStack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
      );
  }else{
    return (
    <SafeAreaProvider>
    <StatusBar backgroundColor="#004ba0" barStyle="light-content" style={styles.statusBar} />
    <NavigationContainer>
      <AppStack.Navigator
          headerMode="none"
        >
        <AppStack.Screen name="Login" component={LoginHomeStack} />
      </AppStack.Navigator>
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
