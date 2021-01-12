# mycart
a shopping app integrated with firebase , redux for state management and stripe api for payment..

## To run this app successfully please follow the steps:
##### This app can only run on `Android` for now as `firebase Integration` ,`unimodules Installation` and `configuration of react-native-splash-screen` has not been done on `IOS` yet if you are cloning the app.

## Step 1:
   ```js
   npx react-native init MyTestApp
   ```
   or
  `git clone https://github.com/rashidmakki/mycart.git`
   
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
