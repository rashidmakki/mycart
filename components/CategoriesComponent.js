import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';
import CollectionOverView from './CollectionComponent';

const CategoriesComponent=({navigation})=>{
	return(
	<View>
    <SafeAreaView>
     <FlatList
      data={['CollectionOverView']}
      keyExtractor={data=>data}
      renderItem={({item,index})=>{
        switch (index){
          case 0:
          return (
            <View style={styles.Collection}>
            <CollectionOverView />
            </View>
            ); 
          return 'Nothing is present';
        }
      }
    }
    /> 
    </SafeAreaView>
    </View>
		);
}

const styles=StyleSheet.create({
  Collection:{
    top:-164     
  }
})

export default CategoriesComponent;
