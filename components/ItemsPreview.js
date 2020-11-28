import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  ScrollView
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import {selectCollectionsForPreview} from '../redux/shop/shop.selectors';
import { Icon,Card,Button} from 'react-native-elements';
import { addItem } from '../redux/cart/cart.actions';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const ItemsPreview=({collections,addItem,...props})=>{
    const titleName=props.route.params.title;

    return(
      <View style={styles.collection}>
      <ScrollView>
      {
        collections.filter(({id,title,routeName,items})=>titleName===routeName?{id,title,routeName,items}:null).map(({id,items,title})=>(
         <View key={id} style={styles.container}>
         <Text style={styles.headerTitle}>{title.toUpperCase()} </Text>
          
          {
            items.map(({id,imageUrl,name,price}) => {
              return (
                <Card key={id}>
                <View style={styles.item}>
                <Image
                resizeMode="contain"
                source={{ uri:imageUrl}}
                style={{ width:'50%', height: 175,marginLeft:10}}
                />
                <View style={styles.description}>
                <Text style={styles.itemTitle}>{name}</Text>
                <View style={styles.priceDetails}>
                <Text style={styles.price}>
                     &#x20B9;{price}
                </Text>
                </View>
                <Button
                icon={{
                  name: "cart-plus",
                  size: 20,
                  color: "white",
                  type:"material-community"
                }}
                title="Add To Cart"
                onPress={()=>addItem({id,imageUrl,name,price})}
                />
                </View>
                </View>
                 </Card>
                );
            })    
          }
         </View>
          ))
      }
      </ScrollView>
      </View>
      );
  }


const mapStateToProps=createStructuredSelector({
	collections:selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

const styles=StyleSheet.create({
    collection:{
    	flex:1,
      width:Width,
      height:Height
    },
    container:{
      justifyContent:'center'
    },
    headerTitle:{
      fontSize:32,
      marginLeft:16
    },
    item:{
      justifyContent:'flex-start',
      alignItems:'center',
      flexDirection:'row'
    },
    priceDetails:{
      flex:1,
      justifyContent:'center',
      flexDirection:'row',
      alignItems:'center'
    },
    description:{
      flex:1,
      justifyContent:'center',
      alignItems:'flex-start'
    },
    itemTitle:{
      fontSize:20
    },
    price:{
      fontSize:28
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(ItemsPreview);

