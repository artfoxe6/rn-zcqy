

import React, { Component } from 'react';
import { View, Text,TextInput,TouchableOpacity,Image,StyleSheet,Platform,ToastAndroid,Dimensions,AsyncStorage,ListView,ScrollView} from 'react-native';

import ScrollableTabView ,{DefaultTabBar } from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/Ionicons';
import {i_error} from "./fun.js";

import Button from 'react-native-button';
import Icon2 from 'react-native-vector-icons/Ionicons';

var WINDOW_HEIGHT = Dimensions.get('window').height;
var WINDOW_WIDTH = Dimensions.get('window').width;

export default class Chat extends Component {
	constructor(props) {
		// 5099
		super(props);
		ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			userinfo:{},
			zeou:{},
			dataSource: ds.cloneWithRows([]),
			dataImg: ds.cloneWithRows([]),
			modal1:false,
			viewimg:''
		};
		
	}



	_handlePress() {
		// ToastAndroid.show('敬请期待', ToastAndroid.SHORT)
		// ToastAndroid.show('打招呼成功', ToastAndroid.SHORT);
		// ToastAndroid.show(this.props.navigation.state.params.uid, ToastAndroid.SHORT);
	}

    componentWillMount() {


        // setTimeout(function(){

	        fetch('http://www.zcqy520.com/api/wap/userinfo', {
		        method: 'POST',
		        headers: {
		        	'Content-Type': 'application/x-www-form-urlencoded',
		        	'Cache-Control': 'no-cache, must-revalidate'
	        	},
	        	body: "userid="+this.props.navigation.state.params.uid
    		})
	    	.then((responseJson) => {
		        var jdata = responseJson._bodyText;
		        if( i_error(jdata) ) {
		        	this.setState({userinfo:JSON.parse(jdata)[0]});
		        }else{
		        	//
		        }
        
		    })
		    .catch((error) => {
		        console.error(error);
		    });  

		    fetch('http://www.zcqy520.com/api/wap/claim', {
		        method: 'POST',
		        headers: {
		        	'Content-Type': 'application/x-www-form-urlencoded',
		        	'Cache-Control': 'no-cache, must-revalidate'
	        	},
	        	body: "userid="+this.props.navigation.state.params.uid
    		})
	    	.then((responseJson) => {
		        var jdata = responseJson._bodyText;
		        if( i_error(jdata) ) {
		        	this.setState({zeou:JSON.parse(jdata)[0]});
		        }else{
		        	//
		        }
        
		    })
		    .catch((error) => {
		        console.error(error);
		    }); 

		    

        // }.bind(this),100)

    }


  render() {
    return (
    	<View style={{flex:1,flexDirection:'column',}}>
    	
    		<View style={{height:55,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'rgba(0,158,208,0.9)',borderBottomColor:'#ccc',borderBottomWidth:0.5,borderTopColor:'rgba(0,158,208,1)',borderTopWidth:0.5,width:'100%',paddingLeft:15}}>
                <Icon onPress={()=>this.props.navigation.goBack()} name="ios-arrow-round-back"   size={40}  color="#fff" />
                <Text style={{color:"rgba(0,158,208,1)",fontSize:25,marginLeft:10}} >|</Text>
                <Text style={{color:"#fff",fontSize:17,marginLeft:5}} >详细资料</Text>
            </View>
    		<ScrollView style={{flexDirection:'column',flex:1}}>
    		

    		
    		<View style={{backgroundColor:"#F1F1F1"}}>


		        <View style={{paddingLeft:20,backgroundColor:"#fff"}}>

			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>昵称:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.userinfo.name}</Text>
			        	</View>
			        </View>

			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>性别:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.userinfo.sex}</Text>
			        	</View>
			        </View>

			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>地区:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.userinfo.addr}</Text>
			        	</View>
			        </View>
			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>生日:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.userinfo.age}</Text>
			        	</View>
			        </View>
			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>婚况:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.userinfo.mryst}</Text>
			        	</View>
			        </View>
			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>身高:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.userinfo.height}cm</Text>
			        	</View>
			        </View>
			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>学历:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.userinfo.edu}</Text>
			        	</View>
			        </View>
			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>薪资:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.userinfo.salary}/月</Text>
			        	</View>
			        </View>
			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>购车:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.userinfo.hascar}</Text>
			        	</View>
			        </View>
			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>购房:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.userinfo.hashouse}</Text>
			        	</View>
			        </View>
			    </View>


		        <View style={{height:50,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:20,paddingTop:5}}>
		          <Text style={{color:'#999',fontSize:16}}>择偶要求</Text>
		        </View>

		        <View style={{paddingLeft:20,backgroundColor:"#fff"}}>

			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>年龄:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.zeou.age}</Text>
			        	</View>
			        </View>

			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>婚况:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.zeou.mryst}</Text>
			        	</View>
			        </View>

			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>子女:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.zeou.haschild}</Text>
			        	</View>
			        </View>
			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>身高:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.zeou.height}</Text>
			        	</View>
			        </View>
			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>薪资:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.zeou.salary}</Text>
			        	</View>
			        </View>
			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>学历:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.zeou.age}</Text>
			        	</View>
			        </View>
			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>购车:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.zeou.hascar}</Text>
			        	</View>
			        </View>
			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10,borderBottomWidth: 1, borderBottomColor: '#f5f5f5'}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>购房:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.zeou.hashouse}</Text>
			        	</View>
			        </View>
			        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:0,paddingTop:10,paddingBottom:10}}>
			        	<View style={{flex:2,flexDirection:'row'}}>
			        		<Text style={{color:'#999',fontSize:14}}>地区:</Text>
			        	</View>
			        	<View style={{flex:4,flexDirection:'row',justifyContent:'space-between'}}>
			        		<Text style={{color:'#666',fontSize:14}}>{this.state.zeou.addr}</Text>
			        	</View>
			        </View>
			    </View>


		        
		        
    			
    		</View>
    		
    		
    	</ScrollView>


    	</View>
      
    );
  }
}

const styles = StyleSheet.create({
    imgbox:{
    	flex:1,
    	height:null,
    	width:null,
    	resizeMode:'cover',
    	justifyContent:'center',
    	alignItems:'center',
    	padding:20,
    	flexDirection: 'column'
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: '#DDD',
        margin: 3,
        width: 80,
        height:80
    }
})
