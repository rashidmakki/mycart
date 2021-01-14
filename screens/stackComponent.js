import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {
  GoogleSignin
} from '@react-native-community/google-signin';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import MainNavigator from './MainComponent';
import {googleSignInStart} from '../redux/user/user.actions';
import {googleConfigure} from '../firebase/firebase';
import LoginScreenEmail from './LoginComponent';

const Stack=createStackNavigator();


class LoginHomeStack extends React.Component{
	constructor(props){
		super(props);
  }
  
	  async componentDidMount() {
	    await GoogleSignin.configure({
         webClientId:'YOUR CLIENT ID', // client ID of type WEB for your server(needed to verify user ID and offline access)
         offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
         forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
         accountName: '', // [Android] specifies an account name on the device that should be used
     });
	  } 
	  signIn =async (props)=>{
      const {googleSignInStart}=this.props;
	  	try {
         googleSignInStart();
	  	} catch (error) {
	  		console.log('GoogleSignin',error.message);
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
			return(  
				<View style={styles.View}>
				{
				 (isUserLoggedIn)?
					<MainNavigator/>
                    :
				    <LoginScreenEmail signIn={this.signIn} />
				}
			   </View>
				);
       }
}

const mapStateToProps=state=>({
  user:state.user
});

const mapDispatchToProps=dispatch=>({
   googleSignInStart:()=>dispatch( googleSignInStart())
});

const styles=StyleSheet.create({
	View:{
		flex:1
	}
});
export default connect(mapStateToProps,mapDispatchToProps)(LoginHomeStack);
