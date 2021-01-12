import React,{Component} from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions 
} from 'react-native';
import TabComponent from './TabComponent';
import ItemsPreview from '../components/ItemsPreview';
import AccordionView from '../components/DrawerCollapse';
import {CartNavigator} from './TabComponent';
import {SettingsNavigator} from './TabComponent';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator,DrawerItem,DrawerItemList,DrawerContentScrollView} from '@react-navigation/drawer';
import  {SafeAreaView } from 'react-native-safe-area-context';
import {Icon,Button} from 'react-native-elements';
import { createStructuredSelector } from 'reselect';
import {selectCurrentUser} from '../redux/user/user.selectors';
import {signOutStart} from '../redux/user/user.actions';
import { useTheme } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Drawer=createDrawerNavigator();
   
   const CustomDrawerContentComponent=({currentUserName,currentUserPhoto,signOutStart,...props})=>{
	const {colors}=useTheme();
	return(
     <DrawerContentScrollView {...props}>
         <SafeAreaView style={styles.container} forceInset={{top:'always',horizontal:'never'}}>
          <View style={styles.drawerHeader}>
             <View style={{flex:1}}>
               <Image source={{uri:currentUserPhoto}} style={styles.drawerImage} />
             </View>
             <View style={{flex:3,marginTop:32}}>
               <Text style={styles.drawerHeaderText}> {currentUserName}</Text>
             </View>
          </View> 
          <View>

          <Button
          icon={
          	<Icon
          	name='sign-out-alt'
          	size={20}
          	color={colors.text}
          	type="font-awesome-5"
          	/>
          }
          type="outline"
          title="LogOut"
          titleStyle={{color:colors.text,padding:5,fontSize:17}}
          onPress={()=>signOutStart()}
          />
          </View>
          <View>
          <AccordionView colors={colors} />  
          </View>
          <DrawerItem label=''/>
          <DrawerItemList {...props} />
         </SafeAreaView>
     </DrawerContentScrollView>
     );
	};



const MainNavigator=({signOutStart,...props})=>{
	const currentUserName=props.currentUser.name.toString();
	const currentUserPhoto=props.currentUser.photo.toString();
	const {colors}=useTheme();
  return(
	<Drawer.Navigator 
	initialRouteName='Home' 
	drawerStyle={{
		backgroundColor:colors.background
	}} 
	screenOptions={{headerStyle:{backgroundColor:'#1976d2'}}}
	drawerContent={(props)=><CustomDrawerContentComponent currentUserName={currentUserName} currentUserPhoto={currentUserPhoto} signOutStart={signOutStart} {...props}/>
	}  
	>
	<Drawer.Screen 
	name="Home" 
	component={TabComponent}
	options={{title:'Home',drawerLabel:'Home',headerTitleStyle:{color:colors.text},headerShown:false,drawerIcon:({tintColor})=>(
		<Icon name='home' type='font-awesome-5' size={28} color={colors.text} />)}}
	/>
	 <Drawer.Screen 
	name="Cart" 
	component={CartNavigator} 
	options={{title:'Cart',drawerLabel:'Cart',headerShown:false,drawerIcon:({tintColor,navigation})=>(
		<Icon name='cart' type='material-community' size={26} color={colors.text}  onPress={()=>navigation.navigate('Cart')}/>)}}
	 />
	 <Drawer.Screen 
	name="Settings" 
	component={SettingsNavigator} 
	options={{title:'Settings',drawerLabel:'Settings',headerShown:false,headerTitleStyle:{color:'white',fontSize:22},headerTintColor:'white',drawerIcon:({tintColor})=>(
		<Icon name='app-settings-alt' type='material-icons' size={28} color={colors.text}  />)}}
	 /> 
	</Drawer.Navigator>
	
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
		marginTop:-4
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

const mapStateToProps=createStructuredSelector({
	currentUser:selectCurrentUser
});

const mapDispatchToProps=dispatch=>({
   signOutStart:()=>dispatch(signOutStart())
});
 

export default connect(mapStateToProps,mapDispatchToProps)(MainNavigator);
