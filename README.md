# mycart
a shopping app integrated with firebase , redux for state management and stripe api for payment.
<p float="left">
<img src="https://github.com/rashidmakki/mycart/blob/main/screenshots/Screenshot_2021-01-11-15-31-59-173_com.miui.gallery.jpg?raw=true" width="300" height="600" />
<img src="https://github.com/rashidmakki/mycart/blob/main/screenshots/Screenshot_2021-01-11-15-32-44-608_com.miui.gallery.jpg?raw=true" width="300" height="600" />
<img src="https://github.com/rashidmakki/mycart/blob/main/screenshots/Screenshot_2021-01-11-15-33-10-500_com.miui.gallery.jpg?raw=true" width="300" height="600" />
<img src="https://github.com/rashidmakki/mycart/blob/main/screenshots/Screenshot_2021-01-11-15-35-34-870_com.miui.gallery.jpg?raw=true" width="300" height="600" />
<img src="https://github.com/rashidmakki/mycart/blob/main/screenshots/Screenshot_2021-01-11-15-35-50-253_com.miui.gallery.jpg?raw=true" width="300" height="600" />
<img src="https://github.com/rashidmakki/mycart/blob/main/screenshots/Screenshot_2021-01-11-15-36-51-015_com.miui.gallery.jpg?raw=true" width="300" height="600" />
<img src="https://github.com/rashidmakki/mycart/blob/main/screenshots/Screenshot_2021-01-11-15-37-38-535_com.miui.gallery.jpg?raw=true" width="300" height="600" />
<img src="https://github.com/rashidmakki/mycart/blob/main/screenshots/Screenshot_2021-01-11-15-37-58-724_com.miui.gallery.jpg?raw=true" width="300" height="600" />
<img src="https://github.com/rashidmakki/mycart/blob/main/screenshots/Screenshot_2021-01-11-15-38-32-536_com.miui.gallery.jpg?raw=true" width="300" height="600" />
<img src="https://github.com/rashidmakki/mycart/blob/main/screenshots/Screenshot_2021-01-11-15-38-10-701_com.miui.gallery.jpg?raw=true" width="300" height="600" />
<img src="https://github.com/rashidmakki/mycart/blob/main/screenshots/Screenshot_2021-01-11-15-53-12-965_com.miui.gallery.jpg?raw=true" width="300" height="600" />
<img src="https://github.com/rashidmakki/mycart/blob/main/screenshots/Screenshot_2021-01-11-15-39-55-190_com.miui.gallery.jpg?raw=true" width="300" height="600" />
<img src="https://github.com/rashidmakki/mycart/blob/main/screenshots/Screenshot_2021-01-11-15-40-06-667_com.miui.gallery.jpg?raw=true" width="300" height="600" />
<img src="https://github.com/rashidmakki/mycart/blob/main/screenshots/Screenshot_2021-01-11-15-41-06-997_com.miui.gallery.jpg?raw=true" width="300" height="600"/>
</p>

## To run this app successfully please follow the steps:
##### This app can only run on `Android` for now as `firebase Integration` ,`unimodules Installation` and `configuration of react-native-splash-screen` has not been done on `IOS` yet.
##### To run this app on `Ios` configures all the packages given in step 2.

## Step 1:
    git clone https://github.com/rashidmakki/mycart.git
   
## Step 2:
#### [Integrate firebase with your app ](https://rnfirebase.io/#installation)
###### Already Configured for `Android`.Only download your `google-services.json` file from [firebase](firebase.google.com) and place it at `android/app/` .
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
 ## Step 5:
 To make a transaction successful you have to create you server and with the help of [stripe api ](https://stripe.com/docs/api) we can make transaction which will be shown on your stripe account once it is successfull or failed.
 
 If you are familiar with backend then provide your endpoint where you want to send your data and then get the response.
 ```js
  fetch(`YOUR ENDPOINT HERE`,{    //example https://www.mycart.com/checkout
  method:'POST',
  headers:{
    'Content-Type':'application/json',
    'Accept':'application/json'
  },
  body:JSON.stringify(body)
})
```
If you are new to backend and nodeJs then clone the repo [mycart-api](https://github.com/rashidmakki/mycart-api.git) and follow the few steps shown there. 

## Step 6:
Download the react-native-cli : `npm i react-native-cli` if you haven't.
##### Run the following command from the root folder of your app in the terminal:
   `npm install`
   
   `react-native run-android`
   
  on another terminal:  `react-native start`

Now the `app` is ready to run.Wait till it execute all the files.

*Note:if you are facing issue regarding adb devices or Android SDK, Android SDK Platform, Android Virtual Device that is because you haven't set up [Android Development Environment](https://reactnative.dev/docs/environment-setup) properly.You can also refer to stackoverflow if you are facing issues.*
