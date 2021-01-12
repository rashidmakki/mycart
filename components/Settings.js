import * as React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import * as eva from '@eva-design/eva';
import { ApplicationProvider as KittenApplicationProvider, Layout,Toggle } from '@ui-kitten/components';
import {ThemeManagerContext} from './authContext/AuthContext';
import { useTheme } from '@react-navigation/native';

const SettingsComponent= () => {
  const {colors}=useTheme();

 const {isDark,toggleTheme}=React.useContext(ThemeManagerContext);
 return (
  <Layout style={[styles.container,{backgroundColor:colors.background}]} level='1'>
  <Text style={[styles.text,{color:colors.text}]}> Dark Mode: </Text>
  <Toggle
  style={styles.toggle}
  checked={isDark}
  onChange={toggleTheme} /> 
  </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height:60
  },
  text:{
   fontSize:25,
   marginTop:10
  },
  toggle: {
    margin: 2,
    height:50,
    marginLeft:200
  },
});

const Settings=() => {
  const {isDark}=React.useContext(ThemeManagerContext);
  return (
  <KittenApplicationProvider {...eva} theme={isDark?eva.dark:eva.light}>
  <SettingsComponent />
  </KittenApplicationProvider>
  );
};

export default Settings;