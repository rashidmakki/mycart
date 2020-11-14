import React from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';


const LogOut=(props)=>{
	return(
		<View style={{flex:1}}>
		<Button
		onPress={props.signOut}
		title="Logout"
		color="#841584"
		style={{flex:1}}
		/>
		</View>
		);
};

export default LogOut;