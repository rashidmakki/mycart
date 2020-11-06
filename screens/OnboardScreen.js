import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Dots=({selected})=>{
	let backgroundColor;
	backgroundColor= selected ? 'rgba(0,0,0,0.8)':'rgba(0,0,0,0.3)';
    return(
         <View 
            style={{
            	 width:7,
            	 height:7,
            	 marginHorizontal:3,
            	 backgroundColor:backgroundColor
            }} 
            />
    	);
};

const Skip=({...props})=>(
    <Button
      title="Skip"
      color="#000000"
      {...props}
      />  
	);

const Next=({...props})=>(
    <Button
      title="Next"
      color="#000000"
      {...props}
      />  
	);

const Done=({...props})=>(
    <TouchableOpacity
       style={{marginHorizontal:8}}
       {...props}
       >
       <Text style={{fontSize:16}}>Done</Text>
    
    </TouchableOpacity>  
	);

const OnboardingScreen=({navigation})=>{
	return (
		<SafeAreaView style={styles.View}>
		
		<Onboarding
		SkipButtonComponent={Skip}
		NextButtonComponent={Next}
		DoneButtonComponent={Done}
		DotComponent={Dots}
		onSkip={()=>navigation.navigate("Login")}
        onDone={()=>navigation.navigate("Login")}
		pages={[
			{
				backgroundColor: '#a6e4d0',
				image: <Image source={require('../assests/onboarding-img1.png')} />,
				title: 'Onboarding 1',
				subtitle: 'Done with React Native Onboarding Swiper',
			},
			{
				backgroundColor: '#fdeb93',
				image: <Image source={require('../assests/onboarding-img2.png')} />,
				title: 'Onboarding 2',
				subtitle: 'Done with React Native Onboarding Swiper',
			},
			{
				backgroundColor: '#e9bcbe',
				image: <Image source={require('../assests/onboarding-img3.png')} />,
				title: 'Onboarding 3',
				subtitle: 'Done with React Native Onboarding Swiper',
			}
			]}
			/>
			
		</SafeAreaView>
		);
};

const styles=StyleSheet.create({
	View:{
		flex:1
	}
});

export default OnboardingScreen;