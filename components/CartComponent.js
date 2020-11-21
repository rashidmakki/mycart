import React,{Component} from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectCartItems} from '../redux/cart/cart.selectors';
import {
  StyleSheet,
  View,
  Text,
 Animated,
 I18nManager,
 Image
} from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import AppleStyleSwipeableRow from './Swipeable';
import { Icon,Button } from 'react-native-elements';
import { addItem } from '../redux/cart/cart.actions';
import {removeItem} from '../redux/cart/cart.actions';

const Row = ({ item,addItem,removeItem}) =>{
    console.log('item',item,addItem,removeItem);
    const {id,name,price,quantity}=item;
 return(
  <RectButton key={item.id} style={styles.rectButton} >
  <View style={styles.alignment}>
  <View>
  <Image
  resizeMode="contain"
  source={{ uri:item.imageUrl}}
  style={{ width:'60%', height:60,marginLeft:-70,position:'absolute'}}
  />
  </View>
  <View>
  <Text style={styles.fromText}>{item.name}</Text>
  <Text numberOfLines={2} style={styles.messageText}>
  Price:{item.price}
  </Text>
   <Button
  icon={
    <Icon
      name="minus-circle"
      size={24}
      type="feather"
    />
  }
  onPress={(item)=>removeItem(item)}
  containerStyle={{width:'14%',borderRadius:50,marginLeft:200,marginTop:6,position:'absolute'}}
  />
  <Text style={styles.dateText}>
      {item.quantity}
  </Text>
  <Button
  icon={
    <Icon
      name="add-circle-outline"
      size={24}
    />
  }
  onPress={()=>addItem(item)}
  containerStyle={{width:'14%',borderRadius:50,marginLeft:300,marginTop:6,position:'absolute'}}
  />
  </View>
  </View>
  </RectButton>
  );
}

const SwipeableRow = ({ item, index,removeItem}) => {
    return (
      <AppleStyleSwipeableRow removeItem={removeItem} item={item}>
        <Row item={item} removeItem={removeItem} addItem={addItem} />
      </AppleStyleSwipeableRow>
    );
};

const CartComponent=({cartItems,removeItem,addItem})=>{
    return(
       <FlatList
        data={cartItems}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => (
          <SwipeableRow item={item} index={index} removeItem={removeItem} addItem={addItem} />
        )}
        keyExtractor={(item, index) => `message ${index}`}
      />
        );
}

const mapStateToProps=createStructuredSelector({
    cartItems:selectCartItems
});

const mapDispatchToProps=dispatch=>({
  removeItem:(item)=>dispatch(removeItem(item)),
  addItem:(item)=>dispatch(addItem(item))
});

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  alignment:{
    flex:1
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop:0,
    marginLeft:70,
    position:'absolute'
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
    position:'absolute',
    marginLeft:70,
    marginTop:30,
    fontWeight: 'bold'
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
     marginLeft:270,
     marginTop:15,
    color: '#999',
    fontWeight: 'bold',
    fontSize:22
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(CartComponent);