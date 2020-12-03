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
import StripeCheckout from 'react-native-stripe-checkout-webview';

const Height=Dimensions.get('window').height;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Platform.OS === "ios"
  ? Dimensions.get("window").height
  : Dimensions.get("window").height;

const StripeCheckoutButton = (props) => {
   const [isModalVisible, setModalVisible] = useState(false);
   const [isPaymentClicked,setIsPaymentClicked]=useState(false);
   const [checkoutSessionIdfetch,setCheckoutSessionIdfetch]=useState('');
   const totalPrice=props.route.params.price;
   const totalItems=props.route.params.totalItems;
  
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
      <Button title="Add Address" onPress={toggleModal} containerStyle={{position:'absolute',top:60,width:'100%'}} />
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
      style={{ justifyContent: 'flex-end', margin: 0}}
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
     <Button onPress={()=>setModalVisible(false)} title='Cancel' />
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
  containerStyle={{position:'absolute',zIndex:1,height:75,width:'100%',top:Height-185}}
  title="Pay Now"
  titleStyle={{fontSize:26}}
  onPress={()=>{checkoutSessionIdFetch(),setIsPaymentClicked(true);}}
/>
    )
 }
 const checkoutSessionIdFetch=async ()=>{
     const fetchSession=await fetch(`http://192.168.1.247:5000/create-checkout-session`,{
      method:'POST'
     });
     const Response=await fetchSession.json();
     console.log('fetchSessionid',Response.id);
     setCheckoutSessionIdfetch(Response.id);
 }

 type Props = { STRIPE_PUBLIC_KEY: String, CHECKOUT_SESSION_ID: String};

const MyStripeCheckout = ({ STRIPE_PUBLIC_KEY, CHECKOUT_SESSION_ID }: Props) =>{
    
   return(
  <StripeCheckout
    stripePublicKey={STRIPE_PUBLIC_KEY}
    checkoutSessionInput={{
      sessionId: CHECKOUT_SESSION_ID,
    }}
    onSuccess={({ checkoutSessionId }) => {
      console.log(`Stripe checkout session succeeded. session id: ${checkoutSessionId}.`);
    }}
    onCancel={() => {
      console.log(`Stripe checkout session cancelled.`);
    }}
  />
);
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
            {
            (isPaymentClicked)?<MyStripeCheckout STRIPE_PUBLIC_KEY='pk_test_51H2a4YBFNahoJiBBTQDQ3guYdvsLv74Nyxj0BWDvMc24EG2MDnHfJJjMRG3TWpWcd7dPiatNP1qwq8jL0ig0e9mo00HZg33sxx' CHECKOUT_SESSION_ID={checkoutSessionIdfetch}/>:null
            }
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

export default StripeCheckoutButton;
