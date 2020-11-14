import React,{useEffect} from 'react';
import { connect } from 'react-redux';
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
import auth from '@react-native-firebase/auth';
import MainNavigator from './MainComponent';import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import _ from 'lodash';
import {SignIn} from '../redux/user/userAction';

const Stack=createStackNavigator();


class LoginHomeStack extends React.Component{
	constructor(props){
		super(props);
  }
  
	  componentDidMount() {
	  	GoogleSignin.configure({
         webClientId:'77084579600-b4cb4aodqquf65qpckmnc3ag39djpvhk.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
         offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
         forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
         accountName: '', // [Android] specifies an account name on the device that should be used
     });

	  }
	  signIn =async (props)=>{
      const {SignIn}=this.props;
      console.log(this.props);
	  	try {
	  		await GoogleSignin.hasPlayServices();
	  		const userInfo = await GoogleSignin.signIn();
	  		if(userInfo!==undefined){
	  		SignIn({...userInfo});
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
        Alert.alert('There is some problem ',error.message);
    }

}


}
  signOut=async ()=>{
	try {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
     // Remember to remove the user from your app's state as well
    } catch(error){
  	 Alert.alert('Can not SignOut',error.message);
    }
   }
   
       render(){
       	const {isUserLoggedIn}=this.props.user;
        console.log('isUserLoggedIn',this.props);
			return(  
				<View style={styles.View}>
				{
				 (isUserLoggedIn)?
					<MainNavigator/>
                    :
				    <LoginScreen signIn={this.signIn} />
				}
			   </View>
				);
       }
}

const mapStateToProps=state=>({
  user:state.user
});

const mapDispatchToProps=dispatch=>({
  SignIn:(user)=>dispatch(SignIn(user))
});

const styles=StyleSheet.create({
	View:{
		flex:1
	}
});
export default connect(mapStateToProps,mapDispatchToProps)(LoginHomeStack);