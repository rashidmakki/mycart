import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import  {SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {signOutStart} from '../redux/user/user.actions';

const LogOut=({navigation,signOutStart})=>{

	return(
		<SafeAreaView>
		<View>
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
      </SafeAreaView>
		);
};

const mapDispatchToProps=dispatch=>({
   signOutStart:()=>dispatch(signOutStart())
})

export default connect(null,mapDispatchToProps)(LogOut);