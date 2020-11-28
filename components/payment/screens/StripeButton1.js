import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  Platform
} from 'react-native';
import { Icon,Card,Button,Input} from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Fumi } from 'react-native-textinput-effects';

const Height=Dimensions.get('window').height;

const StripeCheckoutButton = (props) => {
  const totalPrice=props.route.params.price;
  const totalItems=props.route.params.totalItems;

 const CartDescription=()=>{
   return(
      <View style={{height:Height-740,width:'100%',position:'absolute',zIndex:1, flex:1,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#b4ffff'}}>
       <Text style={{fontSize:20,padding:20}}> Total Items: {totalItems}</Text>
        <Text style={{fontSize:20,padding:20}}> Total:  &#x20B9;{totalPrice}</Text>
      </View>
    );
 }
 const BillingComponent=()=>{
   return (
    <View style={{flex:1,postion:'absolute',top:60,height:Height+20}}>
    <Card style={styles.addressCard}>
     <Text style={styles.addressHeader}>SHIPPING & BILLING INFORMATION</Text>
     <Fumi
     label={'FirstName'}
     iconClass={FontAwesomeIcon}
     iconName={'user'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     />
    <Fumi
     label={'LastName'}
     iconClass={FontAwesomeIcon}
     iconName={'user'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     />
    <Fumi
     label={'AddressLine1'}
     iconClass={MaterialIcon}
     iconName={'local-shipping'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     />
     <Fumi
     label={'AddressLine2'}
     iconClass={MaterialIcon}
     iconName={'local-shipping'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     />
     <Fumi
     label={'City'}
     iconClass={MaterialIcon}
     iconName={'location-city'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     />
      <Fumi
     label={'CountryCode'}
     iconClass={FontAwesomeIcon}
     iconName={'globe'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     />
     <Fumi
     label={'Email'}
     iconClass={MaterialIcon}
     iconName={'email'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     />
     <Fumi
     label={'Phone'}
     iconClass={MaterialIcon}
     iconName={Platform.OS==='ios'?'phone-iphone':'phone-android'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     />
      <Fumi
     label={'PostalCode'}
     iconClass={MaterialIcon}
     iconName={'location-pin'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     />
    </Card>
    </View>
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
  buttonStyle={{height:75}}
  containerStyle={{position:'absolute',zIndex:1,height:75,width:'100%',top:Height-185}}
  title="Pay Now"
  titleStyle={{fontSize:26}}
/>
    )
 }
 return(    
            <View>
            <CartDescription />
            <FlatList
            data={['BillingComponent']}
            renderItem={({ item, index }) => {
              switch(index){
                case 0:
                return (<BillingComponent/>);
                default:
                return (<Text> No Component Found</Text>);
              }
            }
           }
            keyExtractor={(item, index) => `message ${index}`}
            />
            <ButtonSubmit />
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
