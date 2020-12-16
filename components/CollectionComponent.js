import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions
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
      
      	  <CollectionOverViewComponent key={id} {...otherProps} />

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
    	height:Height
    }
});

export default connect(mapStateToProps,null)(CollectionOverView);