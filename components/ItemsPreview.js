import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import {selectCollectionsForPreview} from '../redux/shop/shop.selectors';
import { Icon,Card,Button} from 'react-native-elements';
import { addItem } from '../redux/cart/cart.actions';
import { useTheme } from '@react-navigation/native';
import { withNavigation } from '@react-navigation/compat';
import {selectCartItems} from '../redux/cart/cart.selectors';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const ItemsPreview=({navigation,collections,addItem,cartItems,...props})=>{
    const {colors,dark}=useTheme();
    const titleName=props.route.params.title;

    return(
      
      <View style={styles.collection}>
      <ScrollView>
      {
        collections.filter(({id,title,routeName,items})=>titleName===routeName?{id,title,routeName,items}:null).map(({id,items,title})=>(
        
         <View key={id} style={styles.container}>
          {

            items.map(({id,imageUrl,name,price}) => {
              return (
                <TouchableHighlight
                key={id}
                activeOpacity={0.9}
                underlayColor="#888888"
                onPress={() => navigation.navigate("Item",{details:{id,imageUrl,name,price}})}>
                <View key={id} style={[styles.card,{borderColor:dark?'#ffffff':'#1976d2'}]}>
                <View style={styles.item}>
                <Image
                resizeMode="contain"
                source={{ uri:imageUrl}}
                style={{ width:'50%', height: 175,marginLeft:5}}
                />
                <View style={styles.description}>
                <Text style={[styles.price,{color:colors.text}]}>
                     &#x20B9;{price}
                </Text>
                <Text style={[styles.itemTitle,{color:colors.text}]}>{name}</Text>
                <Button
                icon={{
                  name: "cart-plus",
                  size: 20,
                  color: "white",
                  type:"material-community"
                }}
                title="Add To Cart"
                onPress={()=>addItem({id,imageUrl,name,price})}
                containerStyle={{top:-100,left:200,width:'45%'}}
                />
                </View>

                </View>
                 </View>
                 </TouchableHighlight>
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
	collections:selectCollectionsForPreview ,
  cartItems:selectCartItems  
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

const styles=StyleSheet.create({
    collection:{
    	flex:1,
      width:Width,
      height:Height,
      marginTop:20
    },
    container:{
      justifyContent:'center'
    },
    card:{
      height:220,
      padding:10,
      borderBottomLeftRadius:35,
      borderBottomRightRadius:35,
      margin:-5,
      marginBottom:20,
      borderLeftWidth:2,
      borderRightWidth:2,
      borderBottomWidth:12,
      borderColor:'#1976d2'
    },
    price:{
      left:200,
      top:-100,
      fontSize:25
    },
    itemTitle:{
      left:200,
      top:-100,
      fontSize:22
    }
    
});

export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(ItemsPreview));

