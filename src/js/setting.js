

import React, { Component } from 'react';
import { TextInput,View, Text,TouchableOpacity,Image,StyleSheet,Platform,StatusBar,ToastAndroid,AsyncStorage,BackAndroid,Dimensions,Alert,ScrollView} from 'react-native';
import Communications from 'react-native-communications';
import Button from 'react-native-button';

import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Ionicons';
import {i_error} from './fun.js';
import { NavigationActions } from 'react-navigation'

// 定义一个前进页面  清空之前的路由信息
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login'})
  ]
})

export default class Login extends Component {
    
    constructor(props) {

        super(props);
        this.state = {
            version:'v2.21B0021'
        };

        
    }

    checkNewVersion() {

        Alert.alert("","当前已经是最新版本",[
            // {text: '立即升级',onPress: () => Communications.web("http://baidu.com")}
            {text: '知道了',onPress: () => {}}
        ])
    }
    
    mySoft() {

        Alert.alert("软件说明","软件使用问题请联系：\n\nhackerjieson@gmail.com",[
            {text: '知道了',onPress: () =>{}}
        ])
    }

    logginOut() {

        AsyncStorage.removeItem("logininfo").then(()=>{
            AsyncStorage.removeItem("myinfo").then(()=>{
                this.props.navigation.dispatch(resetAction);
            })
        })

        
    }

    render() {
        return (
            <View style={{flex:1,justifyContent: 'flex-start',backgroundColor:'#EEE',flexDirection: 'column',alignItems:'flex-start',}} >
                    <View style={{height:55,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'rgba(0,158,208,0.9)',borderBottomColor:'#ccc',borderBottomWidth:0.5,borderTopColor:'rgba(0,158,208,1)',borderTopWidth:0.5,width:'100%',paddingLeft:15}}>
                        <Icon onPress={()=>this.props.navigation.goBack()} name="ios-arrow-round-back"   size={40}  color="#fff" />
                        <Text style={{color:"rgba(0,158,208,1)",fontSize:25,marginLeft:10}} >|</Text>
                        <Text style={{color:"#fff",fontSize:17,marginLeft:5}} >设置</Text>
                    </View>

                    <ScrollView>
                
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Web",{title:"成都尊诚情缘婚姻服务中心",url:"http://zcqy520.com/wap/app_about.html"})} >
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'100%',marginTop:20,justifyContent: 'space-between',borderTopWidth:0.5,borderColor:"#EEE"}}>
                        <Text style={{marginLeft:20}}>关于我们</Text>
                        <Icon style={{marginRight:20,opacity:0.5}} name="ios-arrow-forward-outline"  size={30}  color="#999" />
                    </View>
                    </TouchableOpacity>
                    {/* */}
                    <TouchableOpacity onPress={()=>this.checkNewVersion()} >
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'100%',marginTop:10,justifyContent: 'space-between',borderTopWidth:0.5,borderColor:"#EEE"}}>
                        <Text style={{marginLeft:20}}>检查新版本</Text>
                        <Icon style={{marginRight:20,opacity:0.5}} name="ios-arrow-forward-outline"  size={30}  color="#999" />
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Web",{title:"公司地址",url:"http://zcqy520.com/wap/app_contact.html"})} >
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'100%',marginTop:10,justifyContent: 'space-between',borderTopWidth:0.5,borderColor:"#EEE"}}>
                        <Text style={{marginLeft:20}}>公司地址</Text>
                        <Icon style={{marginRight:20,opacity:0.5}} name="ios-arrow-forward-outline"  size={30}  color="#999" />
                    </View>
                    </TouchableOpacity>

                    {/*<TouchableOpacity onPress={()=>this.props.navigation.navigate("Web",{title:"在线客服",url:"http://p.qiao.baidu.com/cps/mobileChat?siteId=10292444&userId=22994258&type=1&reqParam={%22from%22:0,%22sessionid%22:%22%22,%22siteId%22:%2210292444%22,%22tid%22:%22-1%22,%22userId%22:%2222994258%22,%22ttype%22:1}&appId=&referer="})} >
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'100%',marginTop:10,justifyContent: 'space-between',borderTopWidth:0.5,borderColor:"#EEE"}}>
                        <Text style={{marginLeft:20}}>在线客服</Text>
                        <Icon style={{marginRight:20,opacity:0.5}} name="ios-arrow-forward-outline"  size={30}  color="#999" />
                    </View>
                    </TouchableOpacity>*/}

                    

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Web",{title:"选择你的专属红娘",url:"http://zcqy520.com/SinglePage/app_teacher.html"})} >
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'100%',marginTop:10,justifyContent: 'space-between',borderTopWidth:0.5,borderColor:"#EEE"}}>
                        <Text style={{marginLeft:20}}>委托红娘</Text>
                        <Icon style={{marginRight:20,opacity:0.5}} name="ios-arrow-forward-outline"  size={30}  color="#999" />
                    </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>this.mySoft()} >
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'100%',marginTop:10,justifyContent: 'space-between',borderTopWidth:0.5,borderColor:"#EEE"}}>
                        <Text style={{marginLeft:20}}>软件说明</Text>
                        <Icon style={{marginRight:20,opacity:0.5}} name="ios-arrow-forward-outline"  size={30}  color="#999" />
                    </View>
                    </TouchableOpacity>


                    <Button onPress={()=>{this.logginOut()}}  containerStyle={{padding:8,height:50,width:'98%',backgroundColor:'rgba(212,14,121,0.7)', overflow:'hidden',marginTop:10,justifyContent: 'center',borderRadius:2,marginLeft:'1%',borderWidth:1,borderColor:'#EEE'}} style={{fontSize: 20, color: '#fff'}}>注销登录</Button>

                    <View style={{marginTop:20,alignItems:"center"}}>
                        <Text style={{color:'#999'}}>当前版本 {this.state.version}</Text>
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
    	width:'100%',
    	resizeMode:'cover',
    	alignItems:'center',
    } 
})