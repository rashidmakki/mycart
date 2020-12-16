import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList
} from 'react-native';
import  {SafeAreaView } from 'react-native-safe-area-context';
import {fetchCollectionsStartAsync} from '../redux/shop/shop.actions';
import CarouselComponent from './Carousel';
import CollectionOverView from './CollectionComponent';

const Home=({fetchCollectionsStartAsync})=>{
   useEffect(()=>{
    fetchCollectionsStartAsync();
  },[fetchCollectionsStartAsync]);
	return(
    <View>
     <FlatList
      data={['CarouselComponent','CollectionOverView']}
      keyExtractor={data=>data}
      renderItem={({item,index})=>{
        switch (index){
          case 0:
          return (
            <CarouselComponent/>
            );
          case 1:
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
    </View>
    );
}



const mapDispatchToProps=dispatch=>({
  fetchCollectionsStartAsync:()=>dispatch(fetchCollectionsStartAsync())
})

const styles=StyleSheet.create({
  Collection:{
    top:-270
  }
})

export default connect(null,mapDispatchToProps)(Home);