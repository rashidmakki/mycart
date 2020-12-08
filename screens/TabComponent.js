import * as React from 'react';
import { Text, View,StyleSheet,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'react-native-elements';
import Home from '../components/HomeComponent';
import ItemsPreview from '../components/ItemsPreview';
import StripeCheckoutButton from '../components/StripeButton';
import Success from '../components/Success.js';
import CategoriesComponent from '../components/CategoriesComponent';
import CartComponent from '../components/CartComponent';
import {  SafeAreaView } from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';

const Stack=createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeNavigator=()=>(
    <Stack.Navigator 
       initialRouteName='Home' 
        screenOptions={{
        headerStyle:{
        backgroundColor:'#1976d2'
      },
      headerTintColor:'#fff',
      headerTitleStyle:{
        color:'#fff'
      },
    }}>
    <Stack.Screen name="Home" component={Home} options={({navigation})=>({
      headerLeft:()=>(<Icon name='menu' size={36} color='white' onPress={()=>navigation.toggleDrawer()} />)
    }) }/>
    <Stack.Screen name="Collections" component={ItemsPreview} />
    </Stack.Navigator>
    
    );

const CartNavigator=()=>(
       <Stack.Navigator 
       initialRouteName='Cart' 
        screenOptions={{
       headerStyle:{
        backgroundColor:'#1976d2'
      },
      headerTintColor:'#fff',
      headerTitleStyle:{
        color:'#fff'
      },
    }}>
    <Stack.Screen name="Cart" component={CartComponent} options={({navigation})=>({
      headerLeft:()=>(<Icon name='menu' size={36} color='white' onPress={()=>navigation.toggleDrawer()} />)
    }) }/>
    <Stack.Screen name="Checkout" component={StripeCheckoutButton} />
    <Stack.Screen name="Success" component={Success}  />
    </Stack.Navigator>
  )

const MyTabs=()=>{
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: '#1976d2' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} type="material-community" />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesComponent}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color }) => (
            <Icon name="bell" color={color} size={26} type="material-community"/>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <Icon name="cart" color={color} size={26} type="material-community"/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const TabComponent=()=> {
  return (
      <MyTabs />
  );
}

export default TabComponent;