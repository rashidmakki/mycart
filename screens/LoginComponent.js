import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import {  SafeAreaView } from 'react-native-safe-area-context';
import {Icon,Input,Button} from 'react-native-elements';
import {
  GoogleSigninButton
} from '@react-native-community/google-signin';

const LoginScreenEmail=(props)=>{
	return(
		
		<SafeAreaView style={styles.container}>
		<Input
		placeholder="Username"
		leftIcon={{ type: 'font-awesome', name: 'user-o' }}
		inputContainerStyle={styles.formInput}
		/>
		<Input
		placeholder="Password"
		leftIcon={{ type: 'font-awesome', name: 'key' }}
		inputContainerStyle={styles.formInput}
		/>
		<View style={styles.formButton}>
                    <Button
                        title="Login"
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                size={24}
                                color='white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
              />
          </View> 
          <View style={{alignItems:'center',marginBottom:10}}>
          <Text style={{fontSize:30}}>---------------- OR ---------------</Text>   
          </View>
          <View style={{margin:25}}>
		<GoogleSigninButton
		style={{ width: '100%', height:70 }}
		size={GoogleSigninButton.Size.Wide}
		color={GoogleSigninButton.Color.Dark}
		onPress={props.signIn}
	    />
	    </View>
		</SafeAreaView>
		);
}

const styles=StyleSheet.create({
  container:{
  	flex:1,
  	justifyContent:'center',
  	margin:20
  },
  imageContainer:{
    flex:1,
    flexDirection:'row',
    margin:20,
    alignItems:'center',
    justifyContent:'space-between'
  },
  image:{
   margin:10,
   width:80,
   height:60
 },
 formInput:{
   margin:20
 },
 formCheckbox:{
   margin:20,
   backgroundColor:null
 },
 formButton:{
   margin:30
 }
});
export default LoginScreenEmail;





















































 