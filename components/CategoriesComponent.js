import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';

const CategoriesComponent=({navigation})=>{
	return(
		<View>
		<Header
		statusBarProps={{ barStyle: 'light-content' }}
    barStyle="light-content" // or directly
    leftComponent={{ icon: 'menu', color: '#fff',onPress:()=>navigation.toggleDrawer(),size:40 }}
    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
    containerStyle={{
    	backgroundColor: '#1976d2',
    	justifyContent: 'space-around',
    }}
    />
    <SafeAreaView>
    <Text> This is Categories Component </Text>

    </SafeAreaView>
    </View>
		);
}

export default CategoriesComponent;
