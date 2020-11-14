import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import {  SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen=(props)=>{
	return(
		
		<SafeAreaView style={styles.container}>
		<SocialIcon
		title='Sign In With Google'
		button
		type='google'
		iconType="font-awesome"
		iconSize={30}
		style={{
			width:300
		}}
		onPress={props.signIn}
		/>
		</SafeAreaView>
		);
}
export default LoginScreen;
const styles=StyleSheet.create({

	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',

	}
});























































 