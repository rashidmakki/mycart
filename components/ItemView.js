import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share
} from 'react-native';
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import { Icon,Button} from 'react-native-elements';
import { withNavigation } from '@react-navigation/compat';

const ItemView=(props)=>{
	const {id,imageUrl,name,price}=props.route.params.details;
	const {navigation}=props;
	return (	
		<ImageHeaderScrollView
		maxHeight={250}
		minHeight={20}
		headerImage={{uri:imageUrl}}
		renderForeground={() => (
			<View>
			<View style={{ alignItems: "flex-start",justifyContent:"flex-start",marginLeft:5,marginTop:5}}>
			<View style={{ width:40,height: 40, borderRadius:50, backgroundColor:"black",alignItems: "center",justifyContent:"center"}} >
			<TouchableOpacity onPress={() => navigation.goBack()}>
			<Icon
            name={'arrow-back'}
            size={26}
            type="ionicon"
            color="white"
            />
			</TouchableOpacity>
			</View>
			</View>
			<View style={{position:'absolute',top:5,left:350}}>
			<View style={{ width:40,height: 40, borderRadius:50, backgroundColor:"black",alignItems: "center",justifyContent:"center"}} >
			<TouchableOpacity onPress={() => Share.share({
				title:'Buy Now',
				message:`Buy ${name} : ₹${price} Visit: ${imageUrl}`,
				url:imageUrl
			},{
				dialogTitle:`Share MyCart`
			})}>
			<Icon
            name={'share-social-outline'}
            size={26}
            color='white'
            type="ionicon"
            />
			</TouchableOpacity>
			</View>
			</View>
			</View>
			)}
		>
		<View style={{ height: 1000 }}>
		<TriggeringView onHide={() => console.log("text hidden")}>
		 <Text style={{position:'absolute',top:10,left:10,fontSize:26}}>{name}</Text>
		 <Text style={{position:'absolute',top:40,left:10,fontSize:24}}>&#x20B9;{price}</Text>
		 <Button
                icon={{
                  name: "cart-plus",
                  size: 20,
                  color: "white",
                  type:"material-community"
                }}
                title="Add To Cart"
                onPress={()=>addItem({id,imageUrl,name,price})}
                containerStyle={{left:250,top:20,width:'35%',position:'absolute'}}
                />
		</TriggeringView>
		</View>
		</ImageHeaderScrollView>
	
		);

};


export default withNavigation(ItemView);