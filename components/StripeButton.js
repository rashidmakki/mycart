import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  FlatList
} from 'react-native';
import { Icon,Card,Button} from 'react-native-elements';
import { TextInput } from 'react-native-paper';

const StripeCheckoutButton = (props) => {
  const [text, setText] = React.useState('');
  const price=props.route.params.price;
  const priceForStripe = price * 100;
  const publishableKey ="pk_test_51H2a4YBFNahoJiBBTQDQ3guYdvsLv74Nyxj0BWDvMc24EG2MDnHfJJjMRG3TWpWcd7dPiatNP1qwq8jL0ig0e9mo00HZg33sxx";
 const BillingComponent=()=>{
   return (
    <View>
    <Card style={styles.addressCard}>
     <Text style={styles.addressHeader}>SHIPPING & BILLING INFORMATION</Text>
      <TextInput
      mode='outlined'
      label="Name"
      value={text}
      placeholder='Enter Your Name'
      onChangeText={text => setText(text)}
    />
    <TextInput
      mode='outlined'
      label="Email"
      value={text}
      placeholder='Enter Your Email'
      onChangeText={text => setText(text)}
    />
    <TextInput
      mode='outlined'
      label="Address"
      value={text}
      placeholder='Enter Your Address'
      onChangeText={text => setText(text)}
    />
    <TextInput
      mode='outlined'
      label="City"
      value={text}
      placeholder='Enter Your City'
      onChangeText={text => setText(text)}
    />
    <TextInput
      mode='outlined'
      label="State"
      value={text}
      placeholder='Enter Your State'
      onChangeText={text => setText(text)}
    />
    <TextInput
      mode='outlined'
      label="ZIP"
      value={text}
      placeholder='Enter Your Zip Code'
      onChangeText={text => setText(text)}
    />
    </Card>
    </View>
  );
 }
 
 return(
            <BillingComponent/>       
  );
};

const styles=StyleSheet.create({
  addressCard:{
    marginLeft:0
  },
  addressHeader:{
    fontSize:21,
    marginBottom:15,
    fontWeight:'bold'
  }
})

export default StripeCheckoutButton;
