import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import  {SafeAreaView } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {signOutStart} from '../redux/user/user.actions';

const LogOut=({navigation,signOutStart})=>{

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
		<Button
		icon={
			<Icon
			name="sign-out"
			size={15}
			color="white"
			type="font-awesome-5"
			/>
		}
		title="LogOut"
		onPress={()=>signOutStart()}
		/>
	
		</View>

		);
};

const mapDispatchToProps=dispatch=>({
   signOutStart:()=>dispatch(signOutStart())
})

export default connect(null,mapDispatchToProps)(LogOut);