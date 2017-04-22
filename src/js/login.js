

import React, { Component } from 'react';
import { TextInput,View, Text,TouchableOpacity,Image,StyleSheet,Platform,StatusBar,ToastAndroid,AsyncStorage,BackAndroid,Dimensions,Alert} from 'react-native';


import Button from 'react-native-button';

import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';

import {i_error} from './fun.js';

import { NavigationActions } from 'react-navigation'


// 定义一个前进页面  清空之前的路由信息
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main'})
  ]
})

export default class Login extends Component {

    constructor() {

        super();
        this.state = {
            phone:'15828291911',
            passwd:'15828291911'
        };     
    }
    
    componentWillMount() {
        

        // AsyncStorage.getItem('logininfo').then((value) => {

        //     if( value ) {
        //         var v = JSON.parse(value);
        //         fetch('http://192.168.1.121/api/wap/login', {
        //             method: 'POST',
        //             //cache  强制最新的数据
        //             headers: {
        //                 'Content-Type': 'application/x-www-form-urlencoded',
        //                 'Cache-Control': 'no-cache, must-revalidate'
        //             },
        //             body: 'phone='+v.phone+'&passwd='+v.passwd
        //         })
        //         .then((responseJson) => {
        //             var jdata = responseJson._bodyText;
        //             if( i_error(jdata) ) {
        //                 //保存服务器返回的 token  和用户登陆信息
        //                 AsyncStorage.setItem("token",jdata);
 
        //                 this.props.navigation.dispatch(resetAction);
        //             }else{
        //                 Alert.alert("温馨提示",jdata.substr(4,jdata.length),[
        //                     {text: '知道了'}
        //                 ])
        //             }   	
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         });
        //     }
        // })
    }

    login() {
    	fetch('http://192.168.1.121/api/wap/login', {
            method: 'POST',
            //cache  强制最新的数据
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache, must-revalidate'
            },
            body: 'phone='+this.state.phone+'&passwd='+this.state.passwd
        })
        .then((responseJson) => {
            var jdata = responseJson._bodyText;
            if( i_error(jdata) ) {
                //保存服务器返回的 token  和用户登陆信息
                AsyncStorage.setItem("token",jdata);
                AsyncStorage.setItem("logininfo",JSON.stringify(this.state));

                this.props.navigation.dispatch(resetAction);
            }else{
                ToastAndroid.show(jdata.substr(4,jdata.length), ToastAndroid.SHORT);
                // Alert.alert("温馨提示",jdata.substr(4,jdata.length),[
                //     {text: '知道了'}
                // ])
            }   	
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex:1,backgroundColor:'#72068E',justifyContent: 'flex-start',alignItems: 'center',flexDirection: 'column'}} >
                <StatusBar backgroundColor="rgba(10,64,88,0.9)" barStyle="light-content" />
                    <Image style={styles.imgbox} source={require('../images/login1.jpg')} >

                    <View>
                        <Text style={{fontSize:40,color:'rgba(255,255,255,0.7)',textAlign:'left',width:'90%',marginTop:50,fontWeight:'normal'}} >尊诚情缘</Text>
                    </View>
                    <Kohana
                        style={{ backgroundColor: 'rgba(255,255,255,0.7)',flex:0,width:'90%',marginTop:20,height:50,borderRadius:2 }}
                        label={'手机号码'}
                        iconClass={MaterialsIcon}
                        iconName={'phone'}
                        iconColor={'#f4d29a'}
                        labelStyle={{ color: '#91627b' }}
                        inputStyle={{ color: '#91627b' }}
                        onChangeText={ (text)=>{ this.setState({phone:text}) } }
                        value={this.state.phone}
                    />

                    <Kohana
                        style={{ backgroundColor: 'rgba(255,255,255,0.7)',flex:0,width:'90%',marginTop:10,height:50,borderRadius:2 }}
                        label={'密码'}
                        iconClass={MaterialsIcon}
                        iconName={'lock'}
                        iconColor={'#f4d29a'}
                        labelStyle={{ color: '#91627b' }}
                        inputStyle={{ color: '#91627b' }}
                        onChangeText={ (text)=>{ this.setState({passwd:text}) } }
                        secureTextEntry={true}
                        value={this.state.passwd}
                    />
                            
                    <Button onPress={ this.login.bind(this) }  containerStyle={{padding:8,height:50,width:'90%', overflow:'hidden', backgroundColor: '#FF3B00',marginTop:10,justifyContent: 'center',borderRadius:2}} style={{fontSize: 20, color: 'white'}}>登录</Button>

                    <Button onPress={()=>navigate('Register')}  containerStyle={{borderColor:'#fff',borderWidth:0.2,marginTop:10,height:50,backgroundColor:'rgba(255,255,255,0.1)',justifyContent: 'center',marginTop:10,borderRadius:2}} style={{color:'rgba(255,255,255,0.8)',width:'90%',textAlign:'center'}} >注册新帐号</Button>
                    <Button onPress={()=>navigate('Forget')}  style={{color:'white',width:'90%',textAlign:'center',marginTop:20,fontSize:15}} >忘记密码？</Button>

                    </Image>
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