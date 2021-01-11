  import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions 
} from 'react-native';
import { Tile } from 'react-native-elements';
import { withNavigation } from '@react-navigation/compat';
import * as Animatable from 'react-native-animatable';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const CollectionOverViewComponent=({title,imageUrl,navigation})=>{
  return(
   <Animatable.View animation="zoomIn" duration={2000} delay={1000} style={styles.container}>
   <Tile
   imageSrc={{uri:imageUrl}}
   title={title.toUpperCase()}
   featured
   width={Width-200}
   height={Height-650}
   activeOpacity={0.3}
   titleStyle={{fontSize:28}}
   onPress={()=>navigation.navigate('Collections',{title:title})}
   />
   </Animatable.View>
  	);
}

const styles=StyleSheet.create({
    container:{
   	backgroundColor:'#000000',
    margin:1,
   }
});


export default withNavigation(CollectionOverViewComponent);