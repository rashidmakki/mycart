import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';

const ItemView=(props)=>{
	const {id,imageUrl,name,price}=props.route.params.details;
	console.log(props);
	return (	
		<ImageHeaderScrollView
		maxHeight={250}
		minHeight={20}
		headerImage={{uri:imageUrl}}
		renderForeground={() => (
			<View style={{ height: 150, justifyContent: "center", alignItems: "center" }} >
			<TouchableOpacity onPress={() => console.log("tap!!")}>
			<Text style={{ backgroundColor: "transparent" ,color:'white',fontSize:22}}>{name}</Text>
			</TouchableOpacity>
			</View>
			)}
		>
		<View style={{ height: 1000 }}>
		<TriggeringView onHide={() => console.log("text hidden")}>
		<Text>{price}</Text>
		</TriggeringView>
		</View>
		</ImageHeaderScrollView>
	
		);

};


export default ItemView;