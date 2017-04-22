

import React, { Component } from 'react';
import { TextInput,View, Text,TouchableOpacity,Image,StyleSheet,Platform,StatusBar,ToastAndroid,AsyncStorage,BackAndroid,Dimensions,Alert,ScrollView} from 'react-native';

import { Actions,ActionConst } from 'react-native-router-flux';

import Button from 'react-native-button';

import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Ionicons';
import {i_error} from './fun.js';
import Lightbox from 'react-native-lightbox';
import Communications from 'react-native-communications';

export default class Login extends Component {
    
    constructor(props) {

        super(props);
        this.state = {
           userinfo:{
                'name':'',
                'userid':'',
                'head':'',
                'phone':'',
                'sex':'',
                'mryst':'',
                'height':'',
                'age':'',
                'addr':'',
                'intro':''
            },
            photos:[{uid:'',imgurl:''}]
        };

        // console.log(this.props.navigation.navigate);
    }


    getuserphotos() {

        AsyncStorage.getItem('token').then((value) => {

            fetch('http://192.168.1.121/api/wap/userphoto', {
                method: 'POST',
                //cache  强制最新的数据
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache, must-revalidate'
                },
                body: 'userid='+this.props.navigation.state.params.uid
            })
            .then((responseJson) => {
                var jdata = responseJson._bodyText;
                if( i_error(jdata) ) {
                    var o = JSON.parse(jdata);
                    //保存登陆用户的信息
                    // AsyncStorage.setItem("myinfo",JSON.stringify(o[0]));
                    // console.log(jdata);
                    this.setState({
                        photos:o.reverse()
                    })
                    // console.log(o);

                } 	
            })
        })
        
    }

    renderImg(data,i) {
        if( i>=2 ) {
            return false;
        }
        // console.log('http://192.168.1.121/Data/User/'+data.uid+'/'+data.imgurl+'.jpg'+'\n');
        return(
            <Image key = {i} style={{height:60,width:60,borderRadius:1,marginLeft:10}} source={{uri: 'http://192.168.1.121/Data/User/'+data.uid+'/'+data.imgurl+'.jpg'}} />
            // <Image style={{height:60,width:60,borderRadius:1,marginLeft:10}} source={require('../images/2.jpg')} />
        )
    }

    date2age(date)
	{
		return (new Date()).getFullYear() - parseInt(date.split("-")[0]);
	}

    fresh() {

        fetch('http://192.168.1.121/api/wap/userinfo', {
            method: 'POST',
            //cache  强制最新的数据
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache, must-revalidate'
            },
            body: 'userid='+this.props.navigation.state.params.uid
        })
        .then((responseJson) => {
            var jdata = responseJson._bodyText;
            if( i_error(jdata) ) {
                var o = JSON.parse(jdata);
                this.setState({
                    userinfo:o[0]
                })
            }  	
        })
        .catch((error) => {
            console.error(error);
        });
    }

    componentWillMount() {

            this.fresh();
            this.getuserphotos();
    }

    render() {
        return (
            <View style={{flex:1,justifyContent: 'flex-start',backgroundColor:'#EEE',flexDirection: 'column',alignItems:'flex-start',}} >
                    <View style={{height:55,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'rgba(0,158,208,0.9)',borderBottomColor:'#ccc',borderBottomWidth:0.5,borderTopColor:'rgba(0,158,208,1)',borderTopWidth:0.5,width:'100%',paddingLeft:15}}>
                        <Icon onPress={()=>this.props.navigation.goBack()} name="ios-arrow-round-back"   size={40}  color="#fff" />
                        <Text style={{color:"rgba(0,158,208,1)",fontSize:25,marginLeft:10}} >|</Text>
                        <Text style={{color:"#fff",fontSize:17,marginLeft:5}} >{this.state.userinfo.name}</Text>
                    </View>

                    <ScrollView>
                
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:110,width:'100%',marginTop:20,justifyContent: 'space-between',borderWidth:1,borderColor:"#EEE"}}>
                            <Image style={{height:90,width:90,marginLeft:20,borderRadius:1}} source={{uri: 'http://192.168.1.121/Data/User/'+this.props.navigation.state.params.uid+'/'+this.props.navigation.state.params.head+'.jpg'}} />
                            <View style={{flex:1,justifyContent: 'space-around',flexDirection: 'column',alignItems:'flex-start',marginLeft:20,paddingRight:15}}>
                                <Text style={{fontSize:16,color:"#666",marginTop:-10}}>{this.state.userinfo.name} <Text style={{fontSize:12,color:"#666",marginLeft:15}}>ID:{this.state.userinfo.uid}</Text></Text>
                                
                                <Text style={{fontSize:12,color:"#666",marginTop:5}}>{this.state.userinfo.sex}、{this.date2age(this.state.userinfo.age)}岁，{this.state.userinfo.height}cm、{this.state.userinfo.mryst}、{this.state.userinfo.salary}/月、{this.state.userinfo.edu}、{this.state.userinfo.addr}</Text>

                            </View>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Xiangce",{uid:this.props.navigation.state.params.uid,head:this.props.navigation.state.params.head})}>
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:80,width:'100%',marginTop:20,justifyContent: 'flex-start'}}>
                        <Text style={{marginLeft:20,marginRight:10}}>个人相册</Text>
                        {this.state.photos.map((data,i)=>this.renderImg(data,i)) }
                        <Image  style={{height:60,width:60,borderRadius:1,marginLeft:10}} source={{uri: 'http://192.168.1.121/Data/User/'+this.props.navigation.state.params.uid+'/'+this.props.navigation.state.params.head+'.jpg'}} />
                    </View>
                    </TouchableOpacity>
                    
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',width:'100%',marginTop:20,justifyContent: 'flex-start',padding:20}}>
                        <Text>{this.state.userinfo.intro}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Userdetail",{uid:this.props.navigation.state.params.uid})}  >
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'100%',marginTop:0,justifyContent: 'space-between',borderTopWidth:0.5,borderColor:"#EEE"}}>
                        <Text style={{marginLeft:20}}>详细资料</Text>
                        <Icon style={{marginRight:20,opacity:0.5}} name="ios-arrow-forward-outline"  size={30}  color="#aaa" />
                    </View>
                    </TouchableOpacity>
                    <Button onPress={()=>this.props.navigation.navigate("Chat",{'uid':this.props.navigation.state.params.uid,'head':this.props.navigation.state.params.head,"name":this.state.userinfo.name})}   containerStyle={{padding:8,height:50,width:'98%', overflow:'hidden', backgroundColor: 'rgba(0,158,208,0.9)',marginTop:20,justifyContent: 'center',borderRadius:2,marginLeft:'1%'}} style={{fontSize: 20, color: 'white'}}>发消息</Button>
                    <Button onPress={() => Communications.phonecall('18328402805', true)}  containerStyle={{padding:8,height:50,width:'98%',backgroundColor:'#EE2763', overflow:'hidden',marginTop:10,justifyContent: 'center',borderRadius:2,marginLeft:'1%',borderWidth:1,borderColor:'#EEE'}} style={{fontSize: 20, color: '#fff'}}>请红娘搭线</Button>

                    
                    </ScrollView>
            </View>
      
        );
    }
}

const styles = StyleSheet.create({
    imgbox:{
    	flex:1,
    	height:null,
    	width:'100%',
    	resizeMode:'cover',
    	alignItems:'center',
    } 
})