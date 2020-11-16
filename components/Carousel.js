import React,{useEffect,Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import Carousel from 'react-native-snap-carousel'; 
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {selectDirectorySections} from '../redux/directory/directory.selectors';

const CardComponent = ({imageUrl,title}) =>{
  return(
    <Card>
    <Card.Title title={title.toUpperCase()}  />
    <Card.Cover source={{ uri:imageUrl}} />
  </Card>
  );
};


const CarouselComponent=({sections})=>{
   const _renderItem = ({idx,item}) => {
        return (
            <View>
                <CardComponent key={idx} {...item} />
            </View>
        );
    }
        return (
            <Carousel
              ref={(c) => {_carousel = c; }}
              data={sections}
              renderItem={_renderItem}
              sliderWidth={400}
              itemWidth={400}
              autoplay={true}
              lockScrollWhileSnapping={true}
              enableMomentum={false}
              loop={true}
              enableSnap={true}
              activeAnimationOptions={null}
              activeAnimationType="spring"
              layout="tinder"
              layoutCardOffset={26}
              activeSlideAlignment="center"
            />
        );
}

const mapStateToProps=createStructuredSelector({
  sections:selectDirectorySections
});

export default connect(mapStateToProps,null)(CarouselComponent);