# mycart
a shopping app integrated with firebase , redux for state management and stripe api for payment..

## To run this app successfully please follow the steps:
##### This app can only run on `Android` for now as `firebase Integration` ,`unimodules Installation` and `configuration of react-native-splash-screen` has not been done on `IOS` yet.
##### To run this app on `Ios` configures all the packages given in step 2.

## Step 1:
    git clone https://github.com/rashidmakki/mycart.git
   
## Step 2 :
#### [Integrate firebase with your app ](https://rnfirebase.io/#installation)
###### Already Configured for `Android`.Only download your `google-services.json` file from firebase and place it at `android/app/` .
###### For `Ios` you have to configure it on your own for now.

#### [Install Unimodules](https://docs.expo.io/bare/installing-unimodules/) 
###### Already Configured for `Android`.
###### For `Ios` you have to configure it on your own for now.

#### [Installation of react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)
###### Already Configured for `Android`.
###### For `Ios` you have to configure it on your own for now.

#### [Expo-stripe-Payment](https://docs.expo.io/versions/latest/sdk/payments/)
###### Already Configured for `Android`.
###### For `Ios` you have to configure it on your own for now.

*Note: If you have installed all the above packages and configured it on the both `Android` and `Ios` then you are free to use app on both the platform.*

## Step 3:
Place you webClientId at `./screens/stackComponent.js`.You can find your webClientId at [firebase](https://firebase.google.com/) in Authentication Section.
If You are new then signup on Firebase to get the webClientId. 

```js
   async componentDidMount() {
	    await GoogleSignin.configure({
         webClientId:'Client_Id', // client ID of type WEB for your server(needed to verify user ID and offline access)
         offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
         forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
         accountName: '', // [Android] specifies an account name on the device that should be used
     });
   } 
 ```
 ## Step 4:
 Place Your Publishable Key at `./components/stripeButton.js`.You can find your Publishable Key at [Stripe](https://stripe.com).If You are new then signup on     Stripe to get the Publishable Key. 
 
 ```js
    await Stripe.setOptionsAsync({
    publishableKey: 'Your Publishable Key' //  Your key
  });
 ```
 
  
