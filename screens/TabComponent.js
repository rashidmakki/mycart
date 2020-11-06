import * as React from 'react';
import { Text, View,StyleSheet,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'react-native-elements';
import Home from '../components/HomeComponent';
import CategoriesComponent from '../components/CategoriesComponent';
import CartComponent from '../components/CartComponent';
import {  SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createMaterialBottomTabNavigator();

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
        component={Home}
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
        component={CartComponent}
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
    <NavigationContainer independent={true}>
      <MyTabs />
     </NavigationContainer>
  );
}

export default TabComponent;