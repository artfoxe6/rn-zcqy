

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
    NavigationActions.navigate({ routeName: 'Main'})
  ]
})

export default class Forget extends Component {
    
    constructor(props) {

        super(props);
        this.state = {
    	  	phone:'',
            passwd:'',
    	  	verify:'',
            sendsms:'发送验证码'
        };

        
    }

 

    sendcode() {
        if( this.state.sendsms == '已发' ) {
            ToastAndroid.show("验证码已经发送，请注意查收",ToastAndroid.SHORT); return false;
        }
        // 发送手机验证码
        var phone = this.state.phone;
        if(!(/^1[34578]\d{9}$/.test(phone))){ 
            ToastAndroid.show("手机号码有误",ToastAndroid.SHORT); 
            return false; 
        }else{
            fetch('http://www.zcqy520.com/api/wap/sendverifycode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache, must-revalidate'
                },
                body: 'phone='+this.state.phone
            }).then((responseJson) => {
                var jdata = responseJson._bodyText;
                if( i_error(jdata) ) {
                    this.setState({sendsms:'已发'});
                    Alert.alert("","发送成功,请注意查收\n15分钟内有效",[
                        {text: '知道了'}
                    ])
                }else{
                    Alert.alert("温馨提示",jdata.substr(4,jdata.length),[
                        {text: '知道了'}
                    ])
                } 
            });
        }
    }

    login() {
        fetch('http://www.zcqy520.com/api/wap/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache, must-revalidate'
            },
            body: 'phone='+this.state.phone+'&passwd='+this.state.passwd
        })
        .then((responseJson) => {
            var jdata = responseJson._bodyText;
            if( i_error(jdata) ) {
                AsyncStorage.setItem("token",jdata);
                AsyncStorage.setItem("logininfo",JSON.stringify(this.state));
                this.props.navigation.dispatch(resetAction);
            }else{
                Alert.alert("温馨提示",jdata.substr(4,jdata.length),[
                    {text: '知道了'}
                ])
            }       
        })
        .catch((error) => {
            console.error(error);
        });
    }

    register() {
		fetch('http://www.zcqy520.com/api/wap/forget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache, must-revalidate'
            },
            body: 'phone='+this.state.phone+'&passwd='+this.state.passwd+"&code="+this.state.verify
        }).then((responseJson) => {
            var jdata = responseJson._bodyText;
            if( i_error(jdata) ) {
                Alert.alert("","更改成功",[
                  {text: '立即登陆',onPress: () => this.login()}
                ])
            }else{
                ToastAndroid.show("失败",ToastAndroid.SHORT);

            } 
          	
        })
        .catch((error) => {
          console.error(error);
        });
	}

    render() {
        return (
            <View style={{flex:1,justifyContent: 'flex-start',backgroundColor:'#EEE',flexDirection: 'column',alignItems:'flex-start',}} >
                    <View style={{height:55,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'rgba(0,158,208,0.9)',borderBottomColor:'#ccc',borderBottomWidth:0.5,borderTopColor:'rgba(0,158,208,1)',borderTopWidth:0.5,width:'100%',paddingLeft:15}}>
                        <Icon onPress={()=>this.props.navigation.goBack()} name="ios-arrow-round-back"   size={40}  color="#fff" />
                        <Text style={{color:"rgba(0,158,208,1)",fontSize:25,marginLeft:10}} >|</Text>
                        <Text style={{color:"#fff",fontSize:17,marginLeft:5}} >忘记密码</Text>
                    </View>

                    <Kohana
                        style={{ backgroundColor: 'rgba(255,255,255,0.7)',flex:0,width:'96%',marginTop:20,height:50,borderRadius:2,marginLeft:'2%' }}
                        label={'手机号码'}
                        iconClass={MaterialsIcon}
                        iconName={'phone'}
                        iconColor={'#f4d29a'}
                        labelStyle={{ color: '#91627b' }}
                        inputStyle={{ color: '#91627b' }}
                        onChangeText={ (text)=>{ this.setState({phone:text}) } }
                    />

                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',width:'96%',marginLeft:'2%'}}>
                        <TextInput
                            style={{paddingLeft:15,marginTop:10,height:45,borderRadius:2,backgroundColor:'rgba(255,255,255,0.7)',width:150}}
                            value={this.state.text}
                            placeholder={'验证码'}
                            onChangeText={(text) => { this.setState({verify:text}) }}
                        />
                        <Button onPress={()=>this.sendcode()} containerStyle={{backgroundColor:'#FF3B00',height:40,marginTop:10,padding:5,marginLeft:10,justifyContent: 'center',overflow:'hidden',marginTop:10,borderRadius:2}} style={{fontSize: 15, color: 'white'}} >{this.state.sendsms}</Button>
                    </View>

                    <Kohana
                        style={{ backgroundColor: 'rgba(255,255,255,0.7)',flex:0,width:'96%',marginTop:10,height:50,borderRadius:2,marginLeft:'2%' }}
                        label={'设置新的密码'}
                        iconClass={MaterialsIcon}
                        iconName={'lock'}
                        iconColor={'#f4d29a'}
                        labelStyle={{ color: '#91627b' }}
                        inputStyle={{ color: '#91627b' }}
                        onChangeText={ (text)=>{ this.setState({passwd:text}) } }
                    />
    
                    <Button onPress={()=>this.register()}  containerStyle={{padding:8,height:50,width:'96%', overflow:'hidden', backgroundColor: '#FF3B00',marginTop:10,justifyContent: 'center',borderRadius:2,marginLeft:'2%'}} style={{fontSize: 20, color: 'white'}}>确认更改</Button>
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