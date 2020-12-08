import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
import { Icon} from 'react-native-elements';

const Success=(props)=>{
	 const SuccessInfo=props.route.params.Success;
	 console.log('Success',SuccessInfo);
	return(
	   
       <View style={styles.container}>
       <View>
       <Icon type="fontawesome-5" name="check-circle" size={110} color="green" />
       </View>
       <View style={styles.infoList}>
       <Text style={styles.amount}>Successfully Paid: &#x20B9;{SuccessInfo.amount/100} </Text>
       <Text style={styles.id}>id: {SuccessInfo.id} </Text>
       <Text style={styles.txn}>txn id: {SuccessInfo.balance_transaction} </Text>
       </View>
       </View>
		);
}

const styles=StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center'
	},
    infoList:{
    	alignItems:'center'
    },
	amount:{
		fontSize:24,
		fontWeight:'bold'
	},
	id:{
		fontSize:16
	},
	txn:{
		fontSize:16
	}
})
export default Success;