import React,{Component,useState} from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectCartItems,selectCartItemsCount,selectCartTotal} from '../redux/cart/cart.selectors';
import {
  StyleSheet,
  View,
 Animated,
 I18nManager,
 Image,
 TouchableOpacity
} from 'react-native';
import { Text } from 'react-native-elements';
import {  SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import AppleStyleSwipeableRow from './Swipeable';
import { Icon,Button,ButtonGroup } from 'react-native-elements';
import { addItem,removeItem,clearItemFromCart,clearCart} from '../redux/cart/cart.actions';
import { withNavigation } from '@react-navigation/compat';
import { useTheme } from '@react-navigation/native';

const ButtonGroups=(props)=>{
  const {TotalCartItems,ToTalCartCost,clearCart,navigation}=props;
  const [selectedIndex,setSelectedIndex]=useState(2);
   const updateIndex= (selectedIndex)=> {
    setSelectedIndex(selectedIndex);
   }
   const component1 =() =>(
    <View>
    <TouchableOpacity
      onPress={() => clearCart()}>
    <Text h4>Clear All</Text>
    <Text> Items: {TotalCartItems} </Text>
    </TouchableOpacity>
    </View>
    );
   const component2 = () =>(
     <TouchableOpacity
      onPress={()=>navigation.navigate('Checkout',{price:ToTalCartCost,totalItems:TotalCartItems})}
      activeOpacity={0.6}>
    <Text h4>
     Proceed 
     </Text>
     <Icon
      name="arrow-forward"
      type="ionicons"
      color="black"
      size={30}
      containerStyle={{position:'absolute',marginLeft:80}}
    />
    <Text> Total: &#x20B9;{ToTalCartCost}</Text>
    </TouchableOpacity>
 
    );
    const buttons = [{ element:component1 }, { element: component2 }]
    return (
      <ButtonGroup
      onPress={updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      disabled={[1]}
      disabledStyle={{backgroundColor:'#ff5722'}}
      selectedTextStyle={{color:'white'}}
      selectedButtonStyle={{color:'white'}}
      containerStyle={{height: 80,width:'100%',zIndex:1,marginLeft:0,position:'absolute',top:615}} 
      />
      );
 
}



const Row = ({ item,addItem,removeItem}) =>{
    const {id,imageUrl,name,price,quantity}=item;
    const {colors}=useTheme();
 return(
  <RectButton key={item.id} style={[styles.rectButton,{backgroundColor:colors.background}]} >
  <View style={styles.alignment}>
  <View>
  <Image
  resizeMode="contain"
  source={{ uri:item.imageUrl}}
  style={{ width:'60%', height:60,marginLeft:-70,position:'absolute'}}
  />
  </View>
  <View>
  <Text style={[styles.fromText,{color:colors.text}]}>{item.name}</Text>
  <Text numberOfLines={2} style={[styles.messageText,{color:colors.text}]}>
  Price:  &#x20B9;{item.price}
  </Text>
   <Button
  icon={
    <Icon
      name="minus-circle"
      size={23}
      type="feather"
      color="white"
    />
  }
  onPress={()=>removeItem(item)}
  containerStyle={{width:'11%',borderBottomLeftRadius:25,borderTopLeftRadius:25,marginLeft:230,marginTop:6,position:'absolute'}}
  />
  <Text style={[styles.dateText,{color:colors.text}]}>
      {item.quantity}
  </Text>
  <Button
  icon={
    <Icon
      name="add-circle-outline"
      size={23}
      color="white"
    />
  }
  onPress={()=>addItem(item)}
  containerStyle={{width:'11%',borderBottomRightRadius:25,borderTopRightRadius:25,marginLeft:310,marginTop:6,position:'absolute'}}
  />
  </View>
  </View>
  </RectButton>
  );
}

const SwipeableRow = ({ item, index,removeItem,clearItem,addItem}) => {
    return (
      <AppleStyleSwipeableRow clearItem={clearItem} item={item}>
        <Row item={item} removeItem={removeItem} addItem={addItem} />
      </AppleStyleSwipeableRow>
    );
};

const CartComponent=({cartItems,removeItem,addItem,clearItem,clearCart, TotalCartItems,ToTalCartCost,navigation})=>{
    return(
      <View>
       <FlatList
        data={cartItems}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => (
          <SwipeableRow item={item} index={index} removeItem={removeItem} addItem={addItem} clearItem={clearItem} />
        )}
        keyExtractor={(item, index) => `message ${index}`}
      />
      {
        (TotalCartItems!==0)? <ButtonGroups ToTalCartCost={ToTalCartCost} TotalCartItems={TotalCartItems} clearCart={clearCart} navigation={navigation}/>:null
      }  
      </View>
        );
}

const mapStateToProps=createStructuredSelector({
    cartItems:selectCartItems,
    TotalCartItems:selectCartItemsCount,
    ToTalCartCost:selectCartTotal
});

const mapDispatchToProps=dispatch=>({
  removeItem:(item)=>dispatch(removeItem(item)),
  addItem:(item)=>dispatch(addItem(item)),
  clearItem:(item)=>dispatch(clearItemFromCart(item)),
  clearCart:()=>dispatch(clearCart())
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
     marginLeft:283,
     marginTop:15,
    color: '#999',
    fontWeight: 'bold',
    fontSize:22
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(CartComponent));