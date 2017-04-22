

import React, { Component } from 'react';
import { View, Text,TextInput,TouchableOpacity,Image,StyleSheet,Platform,WebView,ToastAndroid,AsyncStorage,ScrollView,Dimensions,StatusBar,BackAndroid,AppState} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view' ;

import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './login.js';
import Register from './register.js';
import Web from './web.js';
import Chat from './chat.js';
import Tab_1 from './tab_1.js';
import Tab_2 from './tab_2.js';
import Tab_3 from './tab_3.js';
import Tab_4 from './tab_4.js';

import {i_error} from './fun.js';

import FacebookTabBar from './FacebookTabBar.js';

import { NavigationActions } from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'

// const {height, width} = Dimensions.get('window');

const tabIconNames = ["md-rose","ios-chatboxes","ios-search","md-person"];
const tabNames = ["推荐","聊天","搜索","我"];
// 定义一个前进页面  清空之前的路由信息
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login'})
  ]
})

export default class Main extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        appState: '',
        noReadState:null
    }
    this.intervalId = null;
    this.intervalId2 = null;

    PushNotification.configure({

        onRegister: function(token) {
            console.log( 'TOKEN:', token );
        },
        onNotification: function(notification) {
            // console.log( 'NOTIFICATION:', notification );
            this.refs.mytabview.goToPage(1);
        }.bind(this),
        senderID: "YOUR GCM SENDER ID",
        popInitialNotification: true,
        requestPermissions: true
    });



    AsyncStorage.getItem('logininfo').then((value) => {

        if( value ) {
            var v = JSON.parse(value);
            fetch('http://www.zcqy520.com/api/wap/login', {
                method: 'POST',
                //cache  强制最新的数据
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache, must-revalidate'
                },
                body: 'phone='+v.phone+'&passwd='+v.passwd
            })
            .then((responseJson) => {
                var jdata = responseJson._bodyText;
                if( i_error(jdata) ) {
                    //保存服务器返回的 token  和用户登陆信息
                    AsyncStorage.setItem("token",jdata);

                    this.fresh(jdata);
                }else{
                    this.props.navigation.dispatch(resetAction);
                }   	
            })
            .catch((error) => {
                this.props.navigation.dispatch(resetAction);
            });
        }else{
          this.props.navigation.dispatch(resetAction);
        }
    })
  }

  fresh(token) {

      // 登陆刷新数据
      fetch('http://www.zcqy520.com/api/wap/getuserinfo', {
          method: 'POST',
          //cache  强制最新的数据
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cache-Control': 'no-cache, must-revalidate'
          },
          body: 'token='+token
      })
      .then((responseJson) => {
          var jdata = responseJson._bodyText;

          if( i_error(jdata) ) {
              var o = JSON.parse(jdata);
              //保存登陆用户的信息
              AsyncStorage.setItem("myinfo",JSON.stringify(o[0]));

          }  	
      })
      .catch((error) => {
          console.log("error");
      });
  }

  sendPush(title,content) {

    PushNotification.localNotification({
        id:6,
        vibrate:true,
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        title: title, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
        message: content, // (required)
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. 

    });
  }

  
  componentDidMount() {
        // 1s后隐藏splash
        setTimeout(function(){
          SplashScreen.hide();
        }.bind(this),1000)
        //监听当前app是处于前台还是后台
        // AppState.addEventListener('change', this._handleAppStateChange.bind(this));

        // 定时任务
        // this.intervalId = BackgroundTimer.setTimeout(() => {

        //   this.sendPush("你有新消息","张海燕：你好，可以聊聊吗？");
        // }, 4000);

        //轮循未读消息
        this.intervalId2 = BackgroundTimer.setInterval(() => {
            
            this.freshNoReadMessageCnt();
        }, 4000);


        

        
        // 注册通知
    }

    freshNoReadMessageCnt() {

        AsyncStorage.getItem('token').then((value) => {

            fetch('http://www.zcqy520.com/api/wap/noreadmessage', {
                method: 'POST',
                //cache  强制最新的数据
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache, must-revalidate'
                },
                body: 'token='+value
            })
            .then((responseJson) => {
                var jdata = responseJson._bodyText;
                // console.log(jdata);
                if( i_error(jdata) ) {
                    console.log("---------------");
                    console.log(jdata);
                    console.log(JSON.stringify(this.state.noReadState));
                    console.log("---------------");
                    var o = JSON.parse(jdata);
                    if( this.state.noReadState == null || this.state.noReadState.stime != o.stime ) {

                        this.sendPush("你有新消息",o.name+"："+o.content);
                        setTimeout(function(){
                            this.changeTo(1);
                        }.bind(this),1000)
                    }

                    this.setState({noReadState:o});
                }	
            })
            .catch((error) => {
                console.error(error);
            });
        })
        
    }

    componentWillUnmount() {

        BackgroundTimer.clearTimeout(this.intervalId);
        BackgroundTimer.clearInterval(this.intervalId2);
        // AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
    }

    _handleAppStateChange(nextAppState){

        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            if( this.state.noReadState != null ) {

            }

        }
        this.setState({appState: nextAppState});
    }

    changeTab(data) {
        switch(data.i) {
            // 聊天列表
            case 1 :
            // 取消所有通知
                PushNotification.cancelAllLocalNotifications();
                break;
            default:
                break;
        }
    }
    // 改变tab页面
    changeTo(i) {
        this.refs.mytabview.goToPage(i);
    }

  render() {

    return (
      
      <View style={{flex:1}}>
        <View style={{height:55,flexDirection:'row',justifyContent:'center',backgroundColor:'rgba(0,158,208,0.9)',borderBottomColor:'#ccc',borderBottomWidth:0.5,borderTopColor:'rgba(0,158,208,1)',borderTopWidth:0.5,}}>
          <Image style={{flex:1, height:null, width:'100%', resizeMode:'contain', alignItems:'center',}} source={require('../images/logo.png')} >
          </Image>
        </View>
        <StatusBar backgroundColor="rgba(0,158,208,0.8)" barStyle="light-content" />
        <ScrollableTabView
        ref="mytabview"
        tabNames={["cdscs",'csdcds','cdscds','cdscds']}
        tabBarPosition='bottom'
        initialPage={0}
        onChangeTab={(data)=>this.changeTab(data)}
        renderTabBar={() => <FacebookTabBar tabNames={tabNames} tabIconNames={tabIconNames} />}
        >
          <ScrollView tabLabel="md-rose" >
                <Tab_1 navigation={this.props.navigation} />
          </ScrollView>
          <ScrollView tabLabel="ios-chatboxes" >
            <Tab_2 navigation={this.props.navigation} />
          </ScrollView>
          <ScrollView tabLabel="ios-search" >
            <Tab_3 navigation={this.props.navigation} />
          </ScrollView>
          <ScrollView tabLabel="md-person" >
            <Tab_4 navigation={this.props.navigation} />
          </ScrollView>
    </ScrollableTabView>
        <TouchableOpacity>
        <View style={{flex:1,justifyContent:'center',alignItems:'center',height:50,width:50,borderRadius:25,backgroundColor:'#fff'}}>
            <Icon  name="md-add"  size={30}  color="#333" />
          </View>
        </TouchableOpacity>

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