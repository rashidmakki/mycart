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
import { Header } from 'react-native-elements';
import {fetchCollectionsStartAsync} from '../redux/shop/shop.actions';
import CarouselComponent from './Carousel';
import CollectionOverView from './CollectionComponent';

const Home=({navigation,fetchCollectionsStartAsync})=>{
   useEffect(()=>{
    fetchCollectionsStartAsync();
  },[fetchCollectionsStartAsync]);
	return(
    <View>
    <Header
    statusBarProps={{ barStyle: 'light-content' }}
    barStyle="light-content" // or directly
    leftComponent={{ icon: 'menu', color: '#fff',onPress:()=>navigation.toggleDrawer(),size:40}}
    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
    containerStyle={{
      backgroundColor: '#1976d2',
      justifyContent: 'space-around',
    }}
    />
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
          return (<CollectionOverView />);
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

export default connect(null,mapDispatchToProps)(Home);