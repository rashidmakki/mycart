import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions
} from 'react-native';
import { Icon,Card,Button,Input} from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';

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
 
 const CardComponent=()=>{
   return(
   <Card style={styles.Card}>
     <Text style={{fontSize:20}}> Card Details: </Text>
     <Input
     placeholder='Card Number'
     leftIcon={{ type: 'font-awesome', name: 'credit-card' }}
    />
    <View style={{flexDirection:'row'}}>
    <Input
     placeholder='MM/YY'
     leftIcon={{ type: 'font-awesome', name: 'calendar' }}
     containerStyle={{width:'45%'}}
    />
     <Input
     placeholder='CVV'
     leftIcon={{ type: 'material-community', name: 'card-account-details' }}
     containerStyle={{width:'45%'}}
    />
    </View>
   </Card>
    );
 }

 const ButtonSubmit=()=>{
   return(
      <Button
      type="solid"
     icon={
    <Icon
      name="check-circle-outline"
      type="material-community"
      size={40}
      color="white"
    />
  }
  iconContainerStyle={{marginLeft:25}}
  iconRight
  buttonStyle={{marginTop:10,height:75}}
  title="Pay Now"
  titleStyle={{fontSize:26}}
/>
    )
 }
 return(    
            <View>
            <FlatList
            data={['BillingComponent','CardComponent','ButtonSubmit']}
            renderItem={({ item, index }) => {
              switch(index){
                case 0:
                return (<BillingComponent/>);
                case 1:
                return (<CardComponent />);
                case 2:
                return (<ButtonSubmit />)
                default:
                return (<Text> No Component </Text>);
              }
            }
           }
            keyExtractor={(item, index) => `message ${index}`}
            />
            </View>
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
  },
  Card:{
    flex:1,
    marginBottom:10
  }
})

export default StripeCheckoutButton;
