import React,{Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';
import  {SafeAreaView } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';

const Home=({navigation})=>{
	return(
    <View>
    <Header
    statusBarProps={{ barStyle: 'light-content' }}
    barStyle="light-content" // or directly
    leftComponent={{ icon: 'menu', color: '#fff',onPress:()=>navigation.toggleDrawer() }}
    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
    containerStyle={{
      backgroundColor: '#1976d2',
      justifyContent: 'space-around',
    }}
    />
    <SafeAreaView>
    <Text> Welcome Home !</Text>
    </SafeAreaView>
    </View>
    );
}

export default Home;