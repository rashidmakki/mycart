/*
 Copyright 2019 Square Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { Icon,Card,Button,Input} from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Fumi } from 'react-native-textinput-effects';
import {
  SQIPCardEntry,
  SQIPApplePay,
  SQIPCore,
  SQIPGooglePay,
} from 'react-native-square-in-app-payments';

import Modal from 'react-native-modal';
import OrderModal from '../components/OrderModal';
import CardsOnFileModal from '../components/CardsOnFileModal';
import PendingModal from '../components/PendingModal';
import GreenButton from '../components/GreenButton';
import {
  SQUARE_APP_ID,
  SQUARE_LOCATION_ID,
  CHARGE_SERVER_HOST,
  GOOGLE_PAY_LOCATION_ID,
  APPLE_PAY_MERCHANT_ID,
  CUSTOMER_ID,
} from '../Constants';
import {
  printCurlCommand,
  showAlert,
} from '../Utilities';
import chargeCardNonce from '../service/Charge';
import createCustomerCard from '../service/CreateCustomerCard';
import chargeCustomerCard from '../service/ChargeCustomerCard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

require('../images/iconCookie.png');

const cookieImage = require('../images/iconCookie.png');
const Height=Dimensions.get('window').height;
const applePayStatus = {
  none: 0,
  succeeded: 1,
  nonceNotCharged: 2,
};

const iOSCardEntryTheme = {
  saveButtonFont: {
    size: 30,
  },
  saveButtonTitle: 'Pay 🍪',
  keyboardAppearance: 'Light',
  tintColor: {
    r: 36,
    g: 152,
    b: 141,
    a: 0.9,
  },
  textColor: {
    r: 36,
    g: 152,
    b: 141,
    a: 0.9,
  },
};

export default class StripeCheckoutButton extends Component {
  constructor(props) {
    super(props);
     this.state = {
    showingBottomSheet: false,
    showingCardsOnFileScreen: false,
    showingPendingScreen: false,
    showingCardEntry: false,
    showingGiftCardEntry: false,
    showingCustomerCardEntry: false,
    showingDigitalWallet: false,
    canUseDigitalWallet: false,
    applePayState: applePayStatus.none,
    applePayError: null,
    cardsOnFile: [],
    FirstName:'',
    LastName:'',
    AddressLine1:'',
    AddressLine2:'',
    City:'',
    CountryCode:'',
    Email:'',
    Phone:'',
    PostalCode:''
  }
    this.onStartCardEntry = this.startCardEntry.bind(this);
    this.onStartGiftCardEntry = this.startGiftCardEntry.bind(this);
    this.onShowCardEntry = this.onShowCardEntry.bind(this);
    this.onShowGiftCardEntry = this.onShowGiftCardEntry.bind(this);
    this.onShowCustomerCardEntry = this.onShowCustomerCardEntry.bind(this);
    this.onCardNonceRequestSuccess = this.onCardNonceRequestSuccess.bind(this);
    this.onCustomerCardNonceRequestSuccess = this.onCustomerCardNonceRequestSuccess.bind(this);
    this.onCardEntryCancel = this.onCardEntryCancel.bind(this);
    this.onCustomerCardEntryCancel = this.onCustomerCardEntryCancel.bind(this);
    this.onApplePayRequestNonceSuccess = this.onApplePayRequestNonceSuccess.bind(this);
    this.onApplePayRequestNonceFailure = this.onApplePayRequestNonceFailure.bind(this);
    this.onApplePayComplete = this.onApplePayComplete.bind(this);
    this.onGooglePayRequestNonceSuccess = this.onGooglePayRequestNonceSuccess.bind(this);
    this.onGooglePayRequestNonceFailure = this.onGooglePayRequestNonceFailure.bind(this);
    this.onGooglePayCanceled = this.onGooglePayCanceled.bind(this);
    this.onShowDigitalWallet = this.onShowDigitalWallet.bind(this);
    this.startCardEntry = this.startCardEntry.bind(this);
    this.startGiftCardEntry = this.startGiftCardEntry.bind(this);
    this.showOrderScreen = this.showOrderScreen.bind(this);
    this.showPendingScreen = this.showPendingScreen.bind(this);
    this.closeOrderScreen = this.closeOrderScreen.bind(this);
    this.showCardsOnFileScreen = this.showCardsOnFileScreen.bind(this);
    this.closeCardsOnFileScreen = this.closeCardsOnFileScreen.bind(this);
    this.onSelectCardOnFile = this.onSelectCardOnFile.bind(this);
    this.startCardEntryWithBuyerVerification = this.startCardEntryWithBuyerVerification.bind(this);
    this.closeOrderScreen = this.closeOrderScreen.bind(this);
    this.onBuyerVerificationSuccess = this.onBuyerVerificationSuccess.bind(this);
    this.onBuyerVerificationFailure = this.onBuyerVerificationFailure.bind(this);
  }

  async componentDidMount() {
    await SQIPCore.setSquareApplicationId(SQUARE_APP_ID);
    let digitalWalletEnabled = false;
    if (Platform.OS === 'ios') {
      try {
        await SQIPApplePay.initializeApplePay(APPLE_PAY_MERCHANT_ID);
        digitalWalletEnabled = await SQIPApplePay.canUseApplePay();
      } catch (ex) {
        console.log(ex);
      }
    } else if (Platform.OS === 'android') {
      await SQIPGooglePay.initializeGooglePay(
        GOOGLE_PAY_LOCATION_ID, SQIPGooglePay.EnvironmentTest,
      );
      try {
        digitalWalletEnabled = await SQIPGooglePay.canUseGooglePay();
      } catch (ex) {
        console.log(ex);
      }
    }

    this.setState({
      canUseDigitalWallet: digitalWalletEnabled,
    });
  }
 
  async onApplePayRequestNonceSuccess(cardDetails) {
    if (this.chargeServerHostIsSet()) {
      try {
        await chargeCardNonce(cardDetails.nonce);
        await SQIPApplePay.completeApplePayAuthorization(true);
        this.setState({ applePayState: applePayStatus.succeeded });
      } catch (error) {
        await SQIPApplePay.completeApplePayAuthorization(false, error.message);
        this.setState({ applePayError: error.message });
      }
    } else {
      await SQIPApplePay.completeApplePayAuthorization(true);
      this.setState({ applePayState: applePayStatus.nonceNotCharged });
      printCurlCommand(cardDetails.nonce, SQUARE_APP_ID);
    }
  }

  async onApplePayRequestNonceFailure(errorInfo) {
    await SQIPApplePay.completeApplePayAuthorization(false, errorInfo.message);
    showAlert('Error processing Apple Pay payment', errorInfo.message);
  }

  async onApplePayComplete() {
    if (this.state.applePayState === applePayStatus.succeeded) {
      showAlert('Your order was successful',
        'Go to your Square dashboard to see this order reflected in the sales tab.');
    } else if (this.state.applePayState === applePayStatus.nonceNotCharged) {
      showAlert(
        'Nonce generated but not charged',
        'Check your console for a CURL command to charge the nonce, or replace CHARGE_SERVER_HOST with your server host.',
      );
    } else if (this.state.applePayError != null) {
      showAlert('Error processing Apple Pay payment', this.state.applePayError);
    } else { // the state is none, so they canceled
      this.showOrderScreen();
    }
  }

  async onGooglePayRequestNonceSuccess(cardDetails) {
    if (this.chargeServerHostIsSet()) {
      try {
        await chargeCardNonce(cardDetails.nonce);
        showAlert('Your order was successful',
          'Go to your Square dashbord to see this order reflected in the sales tab.');
      } catch (error) {
        showAlert('Error processing GooglePay payment', error.message);
      }
    } else {
      printCurlCommand(cardDetails.nonce, SQUARE_APP_ID);
      showAlert(
        'Nonce generated but not charged',
        'Check your console for a CURL command to charge the nonce, or replace CHARGE_SERVER_HOST with your server host.',
      );
    }
  }

  onGooglePayRequestNonceFailure(errorInfo) {
    showAlert('Could not create GooglePay nonce', errorInfo);
  }

  onGooglePayCanceled() {
    this.showOrderScreen();
  }

  async onCardNonceRequestSuccess(cardDetails) {
    if (this.chargeServerHostIsSet()) {
      try {
        await chargeCardNonce(cardDetails.nonce);
        SQIPCardEntry.completeCardEntry(() => {
          showAlert('Your order was successful',
            'Go to your Square dashbord to see this order reflected in the sales tab.');
        });
      } catch (error) {
        SQIPCardEntry.showCardNonceProcessingError(error.message);
      }
    } else {
      SQIPCardEntry.completeCardEntry(() => {
        printCurlCommand(cardDetails.nonce, SQUARE_APP_ID);
        showAlert(
          'Nonce generated but not charged',
          'Check your console for a CURL command to charge the nonce, or replace CHARGE_SERVER_HOST with your server host.',
        );
      });
    }
  }

  async onSelectCardOnFile(cardOnFile) {
    try {
      this.showPendingScreen();
      await chargeCustomerCard(CUSTOMER_ID, cardOnFile.id);
      showAlert('Your order was successful',
        'Go to your Square dashbord to see this order reflected in the sales tab.',
        this.showOrderScreen);
    } catch (error) {
      showAlert(
        'An error occured processing the card on file',
        error.message,
        this.showCardsOnFileScreen,
      );
    }
  }

  async onCustomerCardNonceRequestSuccess(cardDetails) {
    if (this.chargeServerHostIsSet()) {
      try {
        // create the customer card record and add it to the state
        const customerCard = await createCustomerCard(CUSTOMER_ID, cardDetails.nonce);
        // eslint-disable-next-line react/no-access-state-in-setstate
        this.setState({ cardsOnFile: [...this.state.cardsOnFile, customerCard] });
        SQIPCardEntry.completeCardEntry(() => {
          showAlert('Your card was saved and is ready to use.');
        });
        this.showCardsOnFileScreen();
      } catch (error) {
        SQIPCardEntry.showCardNonceProcessingError(error.message);
      }
    } else {
      SQIPCardEntry.completeCardEntry(() => {
        showAlert(
          'Customer card nonce generated but not charged',
          'Replace CHARGE_SERVER_HOST with your server host to enable saving the card.',
        );
      });
    }
  }

  onCardEntryCancel() {
    this.showOrderScreen();
  }

  onCustomerCardEntryCancel() {
    this.showCardsOnFileScreen();
  }

  onShowDigitalWallet() {
    this.closeOrderScreen();
    this.setState({ showingDigitalWallet: true });
  }

  onShowCardEntry() {
    this.closeOrderScreen();
    this.setState({ showingCardEntry: true });
  }

  onShowGiftCardEntry() {
    this.closeOrderScreen();
    this.setState({ showingGiftCardEntry: true });
  }

  onShowCustomerCardEntry() {
    this.closeOrderScreen();
    this.setState({ showingCustomerCardEntry: true });
  }

  async onBuyerVerificationSuccess(buyerVerificationDetails) {
    if (this.chargeServerHostIsSet()) {
      try {
        await chargeCardNonce(buyerVerificationDetails.nonce, buyerVerificationDetails.token);
        showAlert('Your order was successful',
          'Go to your Square dashbord to see this order reflected in the sales tab.');
      } catch (error) {
        showAlert('Error processing card payment', error.message);
      }
    } else {
      printCurlCommand(
        buyerVerificationDetails.nonce,
        SQUARE_APP_ID,
        buyerVerificationDetails.token,
      );
      showAlert(
        'Nonce and verification token generated but not charged',
        'Check your console for a CURL command to charge the nonce, or replace CHARGE_SERVER_HOST with your server host.',
      );
    }
  }

  async onBuyerVerificationFailure(errorInfo) {
    showAlert('Error verifying buyer', errorInfo.message);
  }

  showOrderScreen() {
    this.setState({
      showingBottomSheet: true,
      showingCardsOnFileScreen: false,
      showingPendingScreen: false,
    });
  }

  closeOrderScreen() {
    this.setState({ showingBottomSheet: false });
  }

  showCardsOnFileScreen() {
    this.setState({
      showingBottomSheet: true,
      showingCardsOnFileScreen: true,
      showingPendingScreen: false,
    });
  }

  closeCardsOnFileScreen() {
    this.setState({
      showingCardsOnFileScreen: false,
    });
  }

  showPendingScreen() {
    this.setState({
      showingPendingScreen: true,
      showingCardsOnFileScreen: false,
    });
  }

  applicationIdIsSet() { return SQUARE_APP_ID !== 'REPLACE_ME'; }

  chargeServerHostIsSet() { return CHARGE_SERVER_HOST !== 'REPLACE_ME'; }

  googlePayLocationIsSet() { return GOOGLE_PAY_LOCATION_ID !== 'REPLACE_ME'; }

  applePayMerchantIsSet() { return APPLE_PAY_MERCHANT_ID !== 'REPLACE_ME'; }

  customerIdIsSet() { return CUSTOMER_ID !== 'REPLACE_ME'; }

  checkStateAndPerform() {
    if (this.state.showingCardEntry) {
      // if application id is not set, we will let you know where to set it,
      // but the card entry will still open due to allowing visuals to be shown
      if (!this.applicationIdIsSet()) {
        showAlert('Missing Square Application ID',
          'To request a nonce, replace SQUARE_APP_ID in Constants.js with an Square Application ID.',
          this.startCardEntry);
      } else {
        // call this.startCardEntry() to start Card Entry without buyer verification (SCA)
        this.startCardEntry();
        // OR call this.startCardEntryWithBuyerVerification() to
        // start Card Entry with buyer verification (SCA)
        // NOTE this requires _squareLocationSet to be set
        // this.startCardEntryWithBuyerVerification();
      }
    } else if (this.state.showingCustomerCardEntry) {
      // if application id is not set, we will let you know where to set it,
      // but the card entry will still open due to allowing visuals to be shown
      if (!this.applicationIdIsSet()) {
        showAlert('Missing Square Application ID',
          'To request a nonce, replace SQUARE_APP_ID in Constants.js with an Square Application ID.',
          this.startCustomerCardEntry);
      } else {
        this.startCustomerCardEntry();
      }
    } else if (this.state.showingGiftCardEntry) {
      this.startGiftCardEntry();
    } else if (this.state.showingDigitalWallet) {
      this.startDigitalWallet();
      this.setState({ showingDigitalWallet: false });
    }
  }

  async startCardEntry() {
    console.log('STARTING card entry');
    this.setState({ showingCardEntry: false });
    const cardEntryConfig = {
      collectPostalCode: true,
    };
    if (Platform.OS === 'ios') {
      await SQIPCardEntry.setIOSCardEntryTheme({
        ...iOSCardEntryTheme,
        saveButtonTitle: 'Pay Now',
      });
    }
    await SQIPCardEntry.startCardEntryFlow(
      cardEntryConfig,
      this.onCardNonceRequestSuccess,
      this.onCardEntryCancel,
    );
  }

  async startGiftCardEntry() {
    console.log('STARTING gift card entry');
    this.setState({ showingGiftCardEntry: false });
    if (Platform.OS === 'ios') {
      await SQIPCardEntry.setIOSCardEntryTheme({
        ...iOSCardEntryTheme,
        saveButtonTitle: 'Pay Now',
      });
    }
    await SQIPCardEntry.startGiftCardEntryFlow(
      this.onCardNonceRequestSuccess,
      this.onCardEntryCancel,
    );
  }

  async startCustomerCardEntry() {
    this.setState({ showingCustomerCardEntry: false });
    const cardEntryConfig = {
      collectPostalCode: true,
    };
    if (Platform.OS === 'ios') {
      await SQIPCardEntry.setIOSCardEntryTheme({
        ...iOSCardEntryTheme,
        saveButtonTitle: 'Save ',
      });
    }
    await SQIPCardEntry.startCardEntryFlow(
      cardEntryConfig,
      this.onCustomerCardNonceRequestSuccess,
      this.onCustomerCardEntryCancel,
    );
  }

  async startCardEntryWithBuyerVerification() {
    this.setState({ showingCardEntry: false });
    const cardEntryConfig = {
      collectPostalCode: true,
      squareLocationId: SQUARE_LOCATION_ID,
      buyerAction: 'Charge',
      amount: this.props.route.params.price,
      currencyCode: 'INR',
      givenName: this.props.FirstName,
      familyName: this.props.LastName,
      addressLines: [this.props.AddressLine1, this.props.AddressLine2],
      city: this.props.City,
      countryCode: ths.props.CountryCode,
      email: this.props.Email,
      phone: this.props.Phone,
      postalCode:this.props.PostalCode,
    };
    await SQIPCardEntry.startCardEntryFlowWithBuyerVerification(
      cardEntryConfig,
      this.onBuyerVerificationSuccess,
      this.onBuyerVerificationFailure,
      this.onCardEntryCancel,
    );
  }

  async startDigitalWallet() {
    if (Platform.OS === 'ios' && this.state.canUseDigitalWallet) {
      if (!this.applePayMerchantIsSet()) {
        showAlert('Missing Apple Merchant ID',
          'To request an Apple Pay nonce, replace APPLE_PAY_MERCHANT_ID'
          + ' in Constants.js with an Apple Merchant ID.');
      } else {
        await SQIPApplePay.requestApplePayNonce(
          {
            price: String(this.props.route.params.price),
            summaryLabel: 'Test Item',
            countryCode: this.props.CountryCode,
            currencyCode: 'INR',
            paymentType: SQIPApplePay.PaymentTypeFinal,
          },
          this.onApplePayRequestNonceSuccess,
          this.onApplePayRequestNonceFailure,
          this.onApplePayComplete,
        );
      }
    } else if (Platform.OS === 'android') {
      if (!this.googlePayLocationIsSet()) {
        showAlert('Missing GooglePay Location ID',
          'To request a GooglePay nonce, replace GOOGLE_PAY_LOCATION_ID'
          + ' in Constants.js with an Square Location ID.');
      } else {
        await SQIPGooglePay.requestGooglePayNonce(
          {
            price:String(this.props.route.params.price),
            currencyCode: 'INR',
            priceStatus: SQIPGooglePay.TotalPriceStatusFinal,
          },
          this.onGooglePayRequestNonceSuccess,
          this.onGooglePayRequestNonceFailure,
          this.onGooglePayCanceled,
        );
      }
    }
  }

  renderModal() {
    const {FirstName,LastName,AddressLine1,AddressLine2,City,CountryCode,Email,Phone,PostalCode}=this.state;
    const Amount=this.props.route.params.price;
    if (this.state.showingPendingScreen) {
      return <PendingModal />;
    // eslint-disable-next-line no-else-return
    } else if (this.state.showingCardsOnFileScreen) {
      return (
        <CardsOnFileModal
          onCloseCardsOnFileScreen={this.closeCardsOnFileScreen}
          onShowCustomerCardEntry={this.onShowCustomerCardEntry}
          onSelectCardOnFile={this.onSelectCardOnFile}
          cardsOnFile={this.state.cardsOnFile}
        />
      );
    } else {
      return (
        <OrderModal
          onCloseOrderScreen={this.closeOrderScreen}
          onPayWithGiftCard={this.onShowGiftCardEntry}
          onPayWithCard={this.customerIdIsSet() ? this.showCardsOnFileScreen : this.onShowCardEntry}
          onShowDigitalWallet={this.onShowDigitalWallet}
          FirstName={FirstName}
          LastName={LastName}
          AddressLine1={AddressLine1}
          AddressLine2={AddressLine2}
          City={City}
          CountryCode={CountryCode}
          Email={Email}
          Phone={Phone}
          PostalCode={PostalCode}
          Amount={Amount}
        />
      );
    }
  }

  render() {
  const totalPrice=this.props.route.params.price;
  const totalItems=this.props.route.params.totalItems;
  const {FirstName,LastName,AddressLine1,AddressLine2,City,CountryCode,Email,Phone,PostalCode}=this.state;
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

    <KeyboardAwareScrollView
    style={{ backgroundColor: '#4c69a5' ,flex:1,postion:'absolute',top:60,height:Height+20}}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      >
    <View >
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
     onChangeText={(text) => { this.setState({FirstName: text}) }}
     value={FirstName}
     />
    <Fumi
     label={'LastName'}
     iconClass={FontAwesomeIcon}
     iconName={'user'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     onChangeText={(text) => { this.setState({LastName: text}) }}
     value={LastName}
     />
    <Fumi
     label={'AddressLine1'}
     iconClass={MaterialIcon}
     iconName={'local-shipping'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     onChangeText={(text) => { this.setState({AddressLine1: text}) }}
     value={AddressLine1}
     />
     <Fumi
     label={'AddressLine2'}
     iconClass={MaterialIcon}
     iconName={'local-shipping'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     onChangeText={(text) => { this.setState({AddressLine2: text}) }}
     value={AddressLine2}
     />
     <Fumi
     label={'City'}
     iconClass={MaterialIcon}
     iconName={'location-city'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     onChangeText={(text) => { this.setState({City: text}) }}
     value={City}
     />
      <Fumi
     label={'CountryCode'}
     iconClass={FontAwesomeIcon}
     iconName={'globe'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     onChangeText={(text) => { this.setState({CountryCode: text}) }}
     value={CountryCode}
     />
     <Fumi
     label={'Email'}
     iconClass={MaterialIcon}
     iconName={'email'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     onChangeText={(text) => { this.setState({Email: text}) }}
     value={Email}
     />
     <Fumi
     label={'Phone'}
     iconClass={MaterialIcon}
     iconName={Platform.OS==='ios'?'phone-iphone':'phone-android'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     onChangeText={(text) => { this.setState({Phone: text}) }}
     value={Phone}
     />
      <Fumi
     label={'PostalCode'}
     iconClass={MaterialIcon}
     iconName={'location-pin'}
     iconColor={'#f95a25'}
     iconSize={20}
     iconWidth={40}
     inputPadding={16}
     onChangeText={(text) => { this.setState({PostalCode: text}) }}
     value={PostalCode}
     />
    </Card>
    </View>
    </KeyboardAwareScrollView>
  );
 }
 
 const ButtonSubmit=(props)=>{
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
  onPress={props.showOrderScreen}
  titleStyle={{fontSize:26}}
/>
    );
 }
    return (
      <View style={styles.container}>
        <View>
            <CartDescription />
            <FlatList
            keyboardShouldPersistTaps={'handled'}
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
            <ButtonSubmit showOrderScreen={this.showOrderScreen}/>
            </View>
        <Modal
          isVisible={this.state.showingBottomSheet}
          style={styles.bottomModal}
          onBackdropPress={this.closeOrderScreen}
          // set timeout due to iOS needing to make sure modal is closed
          // before presenting another view
          onModalHide={() => setTimeout(() => this.checkStateAndPerform(), 200)}
        >
          <View style={styles.modalContent}>
            {this.renderModal()}
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
    textAlign: 'center',
  },
  modalContent: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 0,
    flexShrink: 1,
    justifyContent: 'flex-start',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
  },
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
});
