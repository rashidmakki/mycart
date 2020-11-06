import React,{Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions 
} from 'react-native';
import TabComponent from './TabComponent';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator,DrawerItem,DrawerItemList,DrawerContentScrollView} from '@react-navigation/drawer';
import  {SafeAreaView } from 'react-native-safe-area-context';
import {Icon} from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Drawer=createDrawerNavigator();

const CustomDrawerContentComponent=({currentUserPhoto,currentUserName,...props})=>{
	console.log('Drawer:',currentUserPhoto,currentUserName);
	return(
		<DrawerContentScrollView {...props}>
		<SafeAreaView style={styles.container} forceInset={{top:'always',horizontal:'never'}}>
		<View style={styles.drawerHeader}>
		<View style={{flex:1}}>
		<Image source={{uri:currentUserPhoto}} style={styles.drawerImage} />
		</View>
		<View style={{flex:3,marginTop:30}}>
		<Text style={styles.drawerHeaderText}>{currentUserName}  </Text>
		</View>
		</View>
		<DrawerItem label=''/>
		<DrawerItemList {...props} />
		</SafeAreaView>
		</DrawerContentScrollView>
		);
   };

const MainNavigator=(props)=>{
	console.log('props',props);
	const currentUserName=props.currentUserName.user.name.toString();
	const currentUserPhoto=props.currentUserName.user.photo.toString();
  return(
  	<NavigationContainer independent={true} {...props}>
	<Drawer.Navigator 
	initialRouteName='Home' 
	drawerStyle={{
		backgroundColor: 'white'
	}} 
	drawerContent={(props)=> <CustomDrawerContentComponent currentUserName={currentUserName} currentUserPhoto={currentUserPhoto} {...props}/>}
	>

	<Drawer.Screen 
	name="Home" 
	component={TabComponent} 
	options={{title:'Home',drawerLabel:'Home',drawerIcon:({tintColor})=>(
		<Icon name='home' type='font-awesome' size={24} color={tintColor} />)}}
	/>
	</Drawer.Navigator>
	</NavigationContainer>
		);
};

const styles=StyleSheet.create({
	container:{
		flex:1,
		width:windowWidth,
		height:windowHeight
	},
	drawerHeader:{
		backgroundColor:'#1976d2',
		flexDirection:'row',
		marginTop:-34
	},
	drawerHeaderText:{
		color:'white',
		fontSize:24,
		fontWeight:'bold'
	},
	drawerImage:{
       margin:10,
       width:75,
       height:75,
       borderRadius:50
	}

});

export default MainNavigator;