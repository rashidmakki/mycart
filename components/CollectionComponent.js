import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import {selectDirectorySections} from '../redux/directory/directory.selectors';
import CollectionOverViewComponent from './CollectionOverViewComponent';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const CollectionOverView=({selections})=>{
  return(
  	<View style={styles.directory}>
       {
      	selections.map(({id,...otherProps})=>(
       <TouchableOpacity
          key={id}
          style={styles.button}
          onPress={()=>Alert.alert('Its Working')}
        >
      	  <CollectionOverViewComponent key={id} {...otherProps} />
      </TouchableOpacity>
      	))
     }
    </View>
  	);
}

const mapStateToProps=createStructuredSelector({
	selections:selectDirectorySections
});

const styles=StyleSheet.create({
    directory:{
    	flex:1,
    	flexDirection:'row',
    	flexWrap:'wrap',
    	justifyContent:'center',
    	alignContent:'center',
    	width:Width,
    	height:Height,
    	marginTop:-240 
    },
    button: {
    alignItems: "center",
    backgroundColor: '#ffffff'
  }
});

export default connect(mapStateToProps,null)(CollectionOverView);