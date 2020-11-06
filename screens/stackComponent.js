import React,{useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginComponent';
import MainNavigator from './MainComponent';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import _ from 'lodash';

const Stack=createStackNavigator();


class LoginHomeStack extends React.Component{
	constructor(){
		super();
		this.state={
    		currentUser:{},
    		isUserLoggedIn:false
    	}
	  }
  
	  componentDidMount() {
	  	GoogleSignin.configure({
         webClientId:'77084579600-b4cb4aodqquf65qpckmnc3ag39djpvhk.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
         offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
         forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
         accountName: '', // [Android] specifies an account name on the device that should be used
     });

	  }
	  signIn =async ()=>{
	  	try {
	  		await GoogleSignin.hasPlayServices();
	  		const userInfo = await GoogleSignin.signIn();
	  		if(userInfo!==undefined){
	  		this.setState({currentUser:userInfo});
	  		this.setState({isUserLoggedIn:true});
	  	  }
	  	} catch (error) {
	  		if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Login Cancelled',error.message)
    } else if (error.code === statusCodes.IN_PROGRESS) {
    	Alert.alert('In Progress',error.message)
        // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert('Play Services Not Available',error.message)
    } else {
        // some other error happened
        Alert.alert('There is some problem ',error.message)
    }

}
}
  signOut = async () => {
	try {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
      this.setState({currentUser:{}}) // Remember to remove the user from your app's state as well
    } catch (error) {
  	console.error(error);
    }
   };
   componentWillUnmount(){
   	 this.setState({currentUser:{}});
   	 this.setState({isUserLoggedIn:false});
   }
       render(){
       	const {currentUser}=this.state;
       	const {isUserLoggedIn}=this.state;
			return(
				<View style={styles.View}>
				{
				 (isUserLoggedIn)?
					<MainNavigator currentUserName={currentUser} />
                    :
				    <LoginScreen signIn={this.signIn} />
				}
			   </View>
				);
       }
}

const styles=StyleSheet.create({
	View:{
		flex:1
	}
});
export default LoginHomeStack;