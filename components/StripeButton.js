import React,{useState} from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView
} from 'react-native';
import { Icon,Card,Button,Input} from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Fumi } from 'react-native-textinput-effects';
import Modal from 'react-native-modal';
import { Divider } from 'react-native-elements';
import { withNavigation } from '@react-navigation/compat';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import { CreditCardInput} from "react-native-credit-card-input";

const Height=Dimensions.get('window').height;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Platform.OS === "ios"
  ? Dimensions.get("window").height
  : Dimensions.get("window").height;

const StripeCheckoutButton = (props) => {
   const [isModalVisible, setModalVisible] = useState(false);
   const [useShippingAddress,setShippingAddress]=useState({
    FirstName:'',
    LastName:'',
    AddressLine1:'',
    AddressLine2:'',
    City:'',
    State:'',
    Country:'',
    Email:'',
    Phone:'',
    PostalCode:''
   });
   const [useCardDetails,setCardDetails]=useState({
    number:'',
    expiry: '',
    cvc: '',
    type: ''
   })
   const {FirstName,LastName,AddressLine1,AddressLine2,City,State,Country,Email,Phone,PostalCode}=useShippingAddress;
   const {number,expiry,cvc,type}=useCardDetails;
   const totalPrice=props.route.params.price;
   const totalItems=props.route.params.totalItems;
   const {navigation}=props;
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

 const CartDescription=()=>{
   return(
    <View>
      <View style={{height:Height-740,width:'100%',position:'absolute', flex:1,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#b4ffff'}}>
       <Text style={{fontSize:20,padding:20}}> Total Items: {totalItems}</Text>
        <Text style={{fontSize:20,padding:20}}> Total:  &#x20B9;{totalPrice}</Text>
      </View>
      <Button title="Add Address" onPress={toggleModal} containerStyle={{position:'absolute',top:60,width:'100%',zIndex:1}} />
    </View>  
    );
 }
 const BillingComponent=()=>{
   return (
     <Modal 
      propagateSwipe
      isVisible={isModalVisible}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
       animationType="slide"
      transparent={true}
      onBackdropPress={() => setModalVisible(false)}
      swipeDirection={['down']}
      style={{ justifyContent: 'flex-end', margin:0,zIndex:2}}
      >
      <View style={{height:deviceHeight-80,width:deviceWidth,backgroundColor:'white',borderTopLeftRadius:15,borderTopRightRadius:15}}>
     <ScrollView>
     <Text style={styles.addressHeader}>SHIPPING & BILLING INFORMATION</Text>
     <Divider style={{ backgroundColor: 'blue' }} />
     <Fumi
     label={'FirstName'}
     iconClass={FontAwesomeIcon}
     iconName={'user'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     value={FirstName}
     onChangeText={(text) =>setShippingAddress({...useShippingAddress,FirstName:text}) }
     />
    <Fumi
     label={'LastName'}
     iconClass={FontAwesomeIcon}
     iconName={'user'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     value={LastName}
     onChangeText={(text) =>setShippingAddress({...useShippingAddress,LastName:text}) }
     />
    <Fumi
     label={'AddressLine1'}
     iconClass={MaterialIcon}
     iconName={'local-shipping'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     value={AddressLine1}
     onChangeText={(text) =>setShippingAddress({...useShippingAddress,AddressLine1:text}) }
     />
     <Fumi
     label={'AddressLine2'}
     iconClass={MaterialIcon}
     iconName={'local-shipping'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     value={AddressLine2}
     onChangeText={(text) =>setShippingAddress({...useShippingAddress,AddressLine2:text}) }
     />
     <Fumi
     label={'City'}
     iconClass={MaterialIcon}
     iconName={'location-city'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     value={City}
     inputPadding={16}
     onChangeText={(text) =>setShippingAddress({...useShippingAddress,City:text}) }
     />
     <Fumi
     label={'State'}
     iconClass={FontAwesomeIcon}
     iconName={'globe'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     value={State}
     inputPadding={16}
     onChangeText={(text) =>setShippingAddress({...useShippingAddress,State:text}) }
     />
      <Fumi
     label={'Country'}
     iconClass={FontAwesomeIcon}
     iconName={'globe'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     value={Country}
     inputPadding={16}
     onChangeText={(text) =>setShippingAddress({...useShippingAddress,Country:text}) }
     />
     <Fumi
     label={'Email'}
     iconClass={MaterialIcon}
     iconName={'email'}
     iconColor={'#f95a25'}
     value={Email}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     onChangeText={(text) =>setShippingAddress({...useShippingAddress,Email:text}) }
     />
     <Fumi
     label={'Phone'}
     iconClass={MaterialIcon}
     iconName={Platform.OS==='ios'?'phone-iphone':'phone-android'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     value={Phone}
     inputPadding={16}
     onChangeText={(text) =>setShippingAddress({...useShippingAddress,Phone:text}) }
     />
      <Fumi
     label={'PostalCode'}
     iconClass={MaterialIcon}
     iconName={'location-pin'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     value={PostalCode}
     onChangeText={(text) =>setShippingAddress({...useShippingAddress,PostalCode:text}) }
     />
     <Button onPress={()=>setModalVisible(false)} title='Submit' containerStyle={{width:'90%',marginBottom:10,marginLeft:20}} />
     <Button onPress={()=>setModalVisible(false)} title='Cancel' containerStyle={{width:'90%',marginBottom:10,marginLeft:20}} />
      </ScrollView>
     </View>
    </Modal>
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
  containerStyle={{position:'absolute',zIndex:1,width:'100%',top:Height-185}}
  title="Pay Now"
  titleStyle={{fontSize:26}}
  onPress={()=>{checkoutSessionIdFetch()}}
/>
    )
 }
 const checkoutSessionIdFetch=async ()=>{
   await Stripe.setOptionsAsync({
    publishableKey: 'pk_test_51H2a4YBFNahoJiBBTQDQ3guYdvsLv74Nyxj0BWDvMc24EG2MDnHfJJjMRG3TWpWcd7dPiatNP1qwq8jL0ig0e9mo00HZg33sxx' //  Your key
   });
   const params = {
  // mandatory
  number:number,
  expMonth:   Number(expiry.slice(0,2)),
  expYear: Number(expiry.slice(3,5)),
  cvc: cvc,
  // optional
  name: `${FirstName} ${LastName}`,
  currency: 'inr',
  addressLine1: AddressLine1,
  addressLine2: AddressLine2,
  addressCity: City,
  addressState: State,
  addressCountry: Country,
  addressZip: PostalCode,
};

const token = await Stripe.createTokenWithCardAsync(params);
   
   const body={
    token,
    totalPrice
   }
  fetch(`https://frozen-badlands-23496.herokuapp.com/checkout`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
     },
    body:JSON.stringify(body)
  })
  .then(response=>response.json())
  .then(({id,balance_transaction,amount})=>({id,balance_transaction,amount}))
  .then(data=>navigation.navigate('Success',{Success:data}))
  .catch((err)=>console.log(err.message))
 }

const CardComponent=()=>{
 const onChange=form=>{
  if(form.status.number!=='incomplete'&&form.status.expiry!=='incomplete'&&form.status.cvc!=='incomplete'){
  setCardDetails({...useCardDetails,number:form.values.number,cvc:form.values.cvc,expiry:form.values.expiry,type:form.values.type});
  }
  console.log(form);
}
  return(
     <View style={{marginTop:200}}>
     <CreditCardInput
     onChange={onChange} 
     cardScale={1} 
     allowScroll={true}
     autoFocus
     requiresName
     requiresCVC
     />
     </View>
    )
}
 return(    
            <View>
            <CartDescription />
            <FlatList
            data={['CreditCardInput','BillingComponent']}
            renderItem={({ item, index }) => {
              switch(index){
                case 0:
                return (<CardComponent />);
                case 1:
                return ( <BillingComponent/>);
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
    marginBottom:10,
    fontWeight:'bold',
    justifyContent:'center',
    padding:10
  },
  Card:{
    flex:1,
    marginBottom:10
  }
})

export default withNavigation(StripeCheckoutButton);
