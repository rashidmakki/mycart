import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions
} from 'react-native';
import axios from "axios";

const StripeCheckoutButton = (props) => {
  const price=props.route.params.price;
  const priceForStripe = price * 100;
  const publishableKey ="pk_test_51H2a4YBFNahoJiBBTQDQ3guYdvsLv74Nyxj0BWDvMc24EG2MDnHfJJjMRG3TWpWcd7dPiatNP1qwq8jL0ig0e9mo00HZg33sxx";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then(response=> {
        console.log('Payment Successful');
      })
      .catch((error) => {
        console.log("Payment Unsuccessful", error);
      });
  };

  return (
    <View>
    <Text> Hi </Text>
    </View>
  );
};

export default StripeCheckoutButton;
