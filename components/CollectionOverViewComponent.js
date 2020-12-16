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

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const CollectionOverViewComponent=({title,imageUrl,navigation})=>{
  return(
   <View style={styles.container}>
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
   </View>
  	);
}

const styles=StyleSheet.create({
    container:{
   	backgroundColor:'#000000',
    margin:1,
   }
});


export default withNavigation(CollectionOverViewComponent);