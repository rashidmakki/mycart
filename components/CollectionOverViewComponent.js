import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  ImageBackground
} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const CollectionOverViewComponent=({title,imageUrl})=>{
  return(
      	<View style={styles.container}>
          <View style={styles.header}>
       <ImageBackground source={{uri:imageUrl}} style={styles.image}>
          <Text style={styles.header}> {title.toUpperCase()} </Text>
      </ImageBackground>
          </View>
        </View>
  	);
}

const styles=StyleSheet.create({
    container:{
    width:Width-200,
   	height:Height-650,
   	backgroundColor:'#000000',
    margin:1
   },
   image: {
    width:'100%',
    height:'100%'
  },
  header:{
    justifyContent:'center',
    alignItems:'center',
  }
});

export default CollectionOverViewComponent;