import React,{Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Pressable 
} from 'react-native';
import {Icon,Button} from 'react-native-elements';
import { withNavigation } from '@react-navigation/compat';


class AccordionView extends Component{
  constructor(props){
    super(props);
    this.state={
      toggleCollapse:false
    };
  }
 
  toggle=()=>{
   this.setState({toggleCollapse:!this.state. toggleCollapse});
 }
  render(){
    const {colors}=this.props;
    const {toggleCollapse}=this.state;
    const {navigation}=this.props;
    return(
      <View style={{top:200,position:'absolute',width:'100%'}}>
      <View style={{position:'absolute'}}> 
      <TouchableOpacity>
          <Pressable onPress={this.toggle} style={{flex:1,flexDirection:'row',left:17,top:20,width:'100%',height:60}}>
            <Icon
            name={toggleCollapse?'chevron-up':'chevron-down'}
            size={28}
            color={colors.text}
            type="material-community"
            />
          <Text style={{top:4,left:17,width:'100%',color:colors.text}}> Categories </Text>
        </Pressable>
      </TouchableOpacity>
      </View>
      {
        (toggleCollapse)?(
         <View style={{position:'absolute',top:60,width:'100%'}}>
         <TouchableOpacity>
         <Button  
        type="outline"
        title="Hats"
        titleStyle={{color:colors.text,padding:5,fontSize:17,left:-65}} 
        onPress={()=>navigation.navigate('Collections',{title:'hats'})}
        />
        </TouchableOpacity>


        <TouchableOpacity>
        <Button 
        type="outline"
        title="Jackets"
        titleStyle={{color:colors.text,padding:5,fontSize:17,left:-65}}
        onPress={()=>navigation.navigate('Collections',{title:'jackets'})}
        />
        </TouchableOpacity>

        <TouchableOpacity>
        <Button 
        type="outline"
        title="Sneakers"
        titleStyle={{color:colors.text,padding:5,fontSize:17,left:-65}}
        onPress={()=>navigation.navigate('Collections',{title:'sneakers'})}
        />
        </TouchableOpacity>

        <TouchableOpacity>
        <Button 
        type="outline"
        title="Mens"
        titleStyle={{color:colors.text,padding:5,fontSize:17,left:-65}}
        onPress={()=>navigation.navigate('Collections',{title:'mens'})}
        />
        </TouchableOpacity>

        <TouchableOpacity>
        <Button 
        type="outline"
        title="Womens"
        titleStyle={{color:colors.text,padding:5,fontSize:17,left:-65}}
        onPress={()=>navigation.navigate('Collections',{title:'womens'})}
        />
        </TouchableOpacity> 
        <TouchableOpacity>
        <Button 
        type="outline"
        title="Kids"
        titleStyle={{color:colors.text,padding:5,fontSize:17,left:-65}}
        onPress={()=>navigation.navigate('Collections',{title:'kids'})}
        />
        </TouchableOpacity> 
         
         </View>
         ):null
      }
      </View>
     );
  }
}

export default withNavigation(AccordionView);