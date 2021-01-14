import React,{useState} from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator
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
import Spinner from 'react-native-loading-spinner-overlay';
import * as SecureStore from 'expo-secure-store';
import { useTheme } from '@react-navigation/native';

const Height=Dimensions.get('window').height;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Platform.OS === "ios"
? Dimensions.get("window").height
: Dimensions.get("window").height;

const BillingComponent=(props)=>{
 const {useShippingAddress,setShippingAddress,isModalVisible,setModalVisible}=props;
 const {FirstName,LastName,AddressLine1,AddressLine2,City,State,Country,Email,Phone,PostalCode}=useShippingAddress;
 const {colors,dark}=useTheme();
 const handleRegister=()=>{
   return(
    SecureStore.setItemAsync('userinfo',JSON.stringify({FirstName:FirstName,LastName:LastName,AddressLine1:AddressLine1,AddressLine2:AddressLine2,City:City,State:State,Country:Country,Email:Email,Phone:Phone,PostalCode:PostalCode}))
    .catch(error=>console.log('Could not save the info',error))
    )
 }
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
   <View style={{height:deviceHeight-80,width:deviceWidth,backgroundColor:colors.background,borderTopLeftRadius:15,borderTopRightRadius:15}}>
   <ScrollView>
   <Text style={[styles.addressHeader,{color:colors.text}]}>SHIPPING & BILLING INFORMATION</Text>
   <Divider style={{ backgroundColor: dark?'white':'blue' }} />
   <Fumi
   style={{backgroundColor:colors.background}}
   labelStyle={{color:colors.text}}
   inputStyle={{color:colors.text}}
   label={'FirstName'}
   iconClass={FontAwesomeIcon}
   iconName={'user'}
   iconColor={dark?'white':'#f95a25'}
   iconSize={20}
   iconWidth={40}
   inputPadding={16}
   value={FirstName}
   onChangeText={(text) =>{
    setShippingAddress({...useShippingAddress,FirstName:text}) }}
    /> 
    <Fumi
    style={{backgroundColor:colors.background}}
    labelStyle={{color:colors.text}}
    inputStyle={{color:colors.text}}
    label={'LastName'}
    iconClass={FontAwesomeIcon}
    iconName={'user'}
    iconColor={dark?'white':'#f95a25'}
    iconSize={20}
    iconWidth={40}
    inputPadding={16}
    value={LastName}
    onChangeText={(text) =>setShippingAddress({...useShippingAddress,LastName:text}) }
    />
    <Fumi
    style={{backgroundColor:colors.background}}
    labelStyle={{color:colors.text}}
    inputStyle={{color:colors.text}}
    label={'AddressLine1'}
    iconClass={MaterialIcon}
    iconName={'local-shipping'}
    iconColor={dark?'white':'#f95a25'}
    iconSize={20}
    iconWidth={40}
    inputPadding={16}
    value={AddressLine1}
    onChangeText={(text) =>setShippingAddress({...useShippingAddress,AddressLine1:text}) }
    />
    <Fumi
    style={{backgroundColor:colors.background}}
    labelStyle={{color:colors.text}}
    inputStyle={{color:colors.text}}
    label={'AddressLine2'}
    iconClass={MaterialIcon}
    iconName={'local-shipping'}
    iconColor={dark?'white':'#f95a25'}
    iconSize={20}
    iconWidth={40}
    inputPadding={16}
    value={AddressLine2}
    onChangeText={(text) =>setShippingAddress({...useShippingAddress,AddressLine2:text}) }
    />
    <Fumi
    style={{backgroundColor:colors.background}}
    labelStyle={{color:colors.text}}
    inputStyle={{color:colors.text}}
    label={'City'}
    iconClass={MaterialIcon}
    iconName={'location-city'}
    iconColor={dark?'white':'#f95a25'}
    iconSize={20}
    iconWidth={40}
    value={City}
    inputPadding={16}
    onChangeText={(text) =>setShippingAddress({...useShippingAddress,City:text}) }
    />
    <Fumi
    style={{backgroundColor:colors.background}}
    labelStyle={{color:colors.text}}
    inputStyle={{color:colors.text}}
    label={'State'}
    iconClass={FontAwesomeIcon}
    iconName={'globe'}
    iconColor={dark?'white':'#f95a25'}
    iconSize={20}
    iconWidth={40}
    value={State}
    inputPadding={16}
    onChangeText={(text) =>setShippingAddress({...useShippingAddress,State:text}) }
    />
    <Fumi
    style={{backgroundColor:colors.background}}
    labelStyle={{color:colors.text}}
    inputStyle={{color:colors.text}}
    label={'Country'}
    iconClass={FontAwesomeIcon}
    iconName={'globe'}
    iconColor={dark?'white':'#f95a25'}
    iconSize={20}
    iconWidth={40}
    value={Country}
    inputPadding={16}
    onChangeText={(text) =>setShippingAddress({...useShippingAddress,Country:text}) }
    />
    <Fumi
    style={{backgroundColor:colors.background}}
    labelStyle={{color:colors.text}}
    inputStyle={{color:colors.text}}
    label={'Email'}
    iconClass={MaterialIcon}
    iconName={'email'}
    iconColor={dark?'white':'#f95a25'}
    value={Email}
    iconSize={20}
    iconWidth={40}
    inputPadding={16}
    onChangeText={(text) =>setShippingAddress({...useShippingAddress,Email:text}) }
    />
    <Fumi
    style={{backgroundColor:colors.background}}
    labelStyle={{color:colors.text}}
    inputStyle={{color:colors.text}}
    label={'Phone'}
    iconClass={MaterialIcon}
    iconName={Platform.OS==='ios'?'phone-iphone':'phone-android'}
    iconColor={dark?'white':'#f95a25'}
    iconSize={20}
    iconWidth={40}
    value={Phone}
    inputPadding={16}
    onChangeText={(text) =>setShippingAddress({...useShippingAddress,Phone:text}) }
    />
    <Fumi
    style={{backgroundColor:colors.background}}
    labelStyle={{color:colors.text}}
    inputStyle={{color:colors.text}}
    label={'PostalCode'}
    iconClass={MaterialIcon}
    iconName={'location-pin'}
    iconColor={dark?'white':'#f95a25'}
    iconSize={20}
    iconWidth={40}
    inputPadding={16}
    value={PostalCode}
    onChangeText={(text) =>setShippingAddress({...useShippingAddress,PostalCode:text}) }
    />
    <Button onPress={()=>{handleRegister();setModalVisible(false)}} title='Submit' containerStyle={{width:'90%',marginBottom:10,marginLeft:20}} />
    <Button onPress={()=>setModalVisible(false)} title='Cancel' containerStyle={{width:'90%',marginBottom:10,marginLeft:20}} />
    </ScrollView>
    </View>
    </Modal>
    );
}



const CardComponent=(props)=>{
  const {setCardDetails,useCardDetails}=props;
  const {colors}=useTheme();
  const {number,expiry,cvc,type}=useCardDetails;
  const onChange=form=>{
    if(form.status.number!=='incomplete'&&form.status.expiry!=='incomplete'&&form.status.cvc!=='incomplete'&&form.status.name!=='incomplete'&&form.status.postalCode!=='incomplete'){
      setCardDetails({...useCardDetails,number:form.values.number,cvc:form.values.cvc,expiry:form.values.expiry,type:form.values.type});
    }
  }
  return(
   <View style={{marginTop:200}}>
   <CreditCardInput
   onChange={onChange} 
   cardScale={1} 
   allowScroll={true}
   inputStyle={{color:colors.text}}
   placeholderColor={colors.text}
   labelStyle={{color:colors.text}}
   autoFocus
   requiresName
   requiresCVC
   requiresPostalCode
   />
   </View>
   )
}

const StripeCheckoutButton = (props) => {
 const [isModalVisible, setModalVisible] = useState(false);
 const [isLoading,setIsLoading]=useState(false);
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
 const {FirstName,LastName,AddressLine1,AddressLine2,City,State,Country,Email,Phone,PostalCode}=useShippingAddress;
 const [useCardDetails,setCardDetails]=useState({
  number:'',
  expiry: '',
  cvc: '',
  type: ''
})
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
  loading={isLoading}
  onPress={()=>{setIsLoading(true); setTimeout(()=>{checkoutSessionIdFetch()},3000); setTimeout(()=>{setIsLoading(false)},8000)}}
  />);
}
const checkoutSessionIdFetch=async ()=>{
  if(number!==''&&cvc!==''&&expiry!==''&&FirstName!==''&&City!==''&&State!==''&&Country!==''&&PostalCode!==''){
    await Stripe.setOptionsAsync({
    publishableKey: 'YOUR PUBLISHABLE KEY' //  Your key
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
  totalPrice,
  Email
}
fetch(`YOUR ENDPOINT`,{
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
}else{
  Alert.alert("Kindly fill your details correctly !");
}

}

return(    
  <View>
  <CartDescription />
  <FlatList
  data={['CreditCardInput','BillingComponent']}
  renderItem={({ item, index }) => {
    switch(index){
      case 0:
      return (<CardComponent setCardDetails={setCardDetails} useCardDetails={useCardDetails} />);
      case 1:
      return ( <BillingComponent useShippingAddress={useShippingAddress} setShippingAddress={setShippingAddress} isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>);
      default:
      return (<Text> No Component Found</Text>);
    }
  }
}
keyExtractor={(item, index) => `message ${index}`}
/>
<ButtonSubmit />
<Spinner textContent={'Loading...'} visible={isLoading} textStyle={styles.spinnerTextStyle}/>
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
  },
  spinnerTextStyle: {
    color: '#FFF'
  }
})

export default withNavigation(StripeCheckoutButton);
