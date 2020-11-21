import React,{useEffect,useState,Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import Carousel,{ getInputRangeFromIndexes,Pagination}  from 'react-native-snap-carousel'; 
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {selectDirectorySections} from '../redux/directory/directory.selectors';



const sliderWidth = Dimensions.get('window').width;
const slideWidth = sliderWidth;
const itemWidth = slideWidth;
const itemHeight = 400;


const CardComponent = ({imageUrl,title}) =>{
  return(
    <Card>
    <Card.Title title={title.toUpperCase()}  />
    <Card.Cover source={{ uri:imageUrl}} />
  </Card>
  );
};


const CarouselComponent=({sections})=>{
    const [useActiveSlide,setActiveSlide]=useState({
      activeSlide:0
    });
 
        const pagination=()=>{
          const {activeSlide}=useActiveSlide;
        return (
            <Pagination
              dotsLength={sections.length}
              activeDotIndex={activeSlide}
              dotStyle={{
                  width: 12,
                  height: 12,
                  borderRadius:8,
                  marginHorizontal:8,
                  backgroundColor: 'rgba(255, 255, 255, 0.96)'
              }}
              inactiveDotStyle={{
                  width: 12,
                  height: 12,
                  borderRadius: 8,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.85)'
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

   const _renderItem = ({idx,item}) => {
        return (
            <View style={styles.slide}>
               <View style={styles.slideInnerContainer}>
                <CardComponent key={idx} {...item} />
                </View>
            </View>
        );
    }
        return (
          <View style={{position:'relative'}}>
            <Carousel
              ref={(c) => {_carousel = c; }}
              data={sections}
              renderItem={_renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              layout="stack"
              autoplay={true}
              loop={true}
              enableSnap={true}
              enableMomentum={false}
              lockScrollWhileSnapping={true}
              onSnapToItem={(index) => setActiveSlide({...useActiveSlide,activeSlide:index}) }
            />
            <View style={{position:'absolute',marginTop:190,marginLeft:'15%'}}>
             {pagination()}
            </View>
             </View>
        );
}

const mapStateToProps=createStructuredSelector({
  sections:selectDirectorySections
});

const styles = StyleSheet.create({
    slide: {
        width: itemWidth,
        height: itemHeight
        // other styles for the item container
    },
    slideInnerContainer: {
        width: slideWidth,
        flex: 1
        // other styles for the inner container
    }
});

export default connect(mapStateToProps,null)(CarouselComponent);