

import React, { Component } from 'react';
import { View, Text,TextInput,TouchableOpacity,Image,StyleSheet,Platform,ScrollView,Alert,ToastAndroid,AsyncStorage} from 'react-native';

import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
// import Alipay from 'rn-alipay';
import {i_error,depthcheck} from "./fun.js";


export default class Charge extends Component {

    constructor(props) {
        super(props);
        this.state = {messages: [],modal:false,payinfo:{}};
    }

    createpay(money) {
      this.setState({modal:!this.state.modal});  
        // AsyncStorage.getItem("token").then((value)=>{
        //     if( value !== null ) {

        //         window.token = value;
        //         fetch('http://zcqy520.com/api/wap/createpay', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/x-www-form-urlencoded',
        //                 'Cache-Control': 'no-cache, must-revalidate'
        //             },
        //             body: 'token='+window.token+'&type=alipay&money='+money+'&title=尊诚币立即开通'
        //         })
        //         .then((response) => response.json())
        //         .then((responseJson) => {
        //             this.setState({payinfo:responseJson});
        //             this.setState({modal:!this.state.modal});      
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         });
        //     }
        // });    
    }

    _handlePress() {
        Alipay.pay(this.state.payinfo).then((msg) => {
            var myreg = /\{(.*?)\}/ig; 
            var s = msg.match(myreg);
            if( s[0].substr(1,s[0].length-2) == 9000 ) {
              ToastAndroid.show(JSON.stringify('立即开通成功'),ToastAndroid.SHORT);
              return ;
            }
            if( s[1].length != 2 ) {
              ToastAndroid.show(JSON.stringify(s[1].substr(1,s[1].length-2)),ToastAndroid.SHORT);
              return ;
            }  
        }, (e) => {
            console.log(e);
        });
        this.setState({modal:!this.state.modal});
    }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#eee'}}>

        <View style={{height:55,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'rgba(0,158,208,0.9)',borderBottomColor:'#ccc',borderBottomWidth:0.5,borderTopColor:'rgba(0,158,208,1)',borderTopWidth:0.5,width:'100%',paddingLeft:15}}>
            <Icon onPress={()=>this.props.navigation.goBack()} name="ios-arrow-round-back"   size={40}  color="#fff" />
            <Text style={{color:"rgba(0,158,208,1)",fontSize:25,marginLeft:10}} >|</Text>
            <Text style={{color:"#fff",fontSize:17,marginLeft:5}} >开通会员 沟通无限</Text>
        </View>

    
      

      <View style={{backgroundColor:'#45DD72',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'90%',marginTop:20,justifyContent: 'flex-start',marginLeft:'5%'}}>
          <Text style={{marginLeft:20,marginRight:10}}>「体验会员」，无限畅聊10天</Text>
      </View>
      <View style={{backgroundColor:'#45DD72',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'90%',justifyContent: 'space-between',marginLeft:'5%'}}>
          <Text style={{marginLeft:20}}></Text>
          <View style={{alignItems: 'center',flex:0,flexDirection: 'row',justifyContent: 'flex-end'}}>
              <Button
          onPress = { ()=>this.createpay(30) }
            containerStyle={{padding:6,height:30, overflow:'hidden', borderRadius:3, backgroundColor: 'rgba(0,158,208,0.9)',margin:5,width:80}}
            style={{fontSize: 12, color: 'white'}}>
              ￥30
        </Button>
              <Icon style={{marginRight:20,opacity:0.5}} name="ios-arrow-forward-outline"  size={25}  color="#45DD72" />
          </View>
      </View>

      <View style={{backgroundColor:'#E52C84',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'90%',marginTop:20,justifyContent: 'flex-start',marginLeft:'5%'}}>
          <Text style={{marginLeft:20,marginRight:10,color:'white'}}>「正式会员」，享受60天会员特权</Text>
      </View>
      <View style={{backgroundColor:'#E52C84',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'90%',justifyContent: 'space-between',marginLeft:'5%'}}>
          <Text style={{marginLeft:20}}></Text>
          <View style={{alignItems: 'center',flex:0,flexDirection: 'row',justifyContent: 'flex-end'}}>
              <Button
          onPress = { ()=>this.createpay(30) }
            containerStyle={{padding:6,height:30, overflow:'hidden', borderRadius:3, backgroundColor: 'rgba(0,158,208,0.9)',margin:5,width:80}}
            style={{fontSize: 12, color: 'white'}}>
              ￥200
        </Button>
              <Icon style={{marginRight:20,opacity:0.5}} name="ios-arrow-forward-outline"  size={25}  color="#E52C84" />
          </View>
      </View>

      <View style={{paddingLeft:"5%",paddingTop:20}}>
          <Text style={{color:'#E52C84',textAlign:'center',fontSize:14,marginTop:5}}>会员特权1：无限制在线聊天</Text>
          <Text style={{color:'#E52C84',textAlign:'center',fontSize:14,marginTop:5}}>会员特权2：系统全网随机推荐增加曝光率</Text>
        <Text style={{color:'#E52C84',textAlign:'center',fontSize:14,marginTop:10}}>更多特权请期待～</Text>
        {/*<Text style={{color:'grey',textAlign:'center',fontSize:14,marginTop:15}}>如出现立即开通问题请致电（028-1234567）</Text>*/}
        
      </View>



      <Modal style={{height:170}} position={"bottom"} isOpen={this.state.modal} onClosed={ ()=>this.setState({modal:false})}>
  
            <TouchableOpacity style={[styles.drawerContent,{borderBottomWidth:1,borderColor:'#eee'}]} onPress={()=>Alert.alert('',"暂未开通")}   >
                <Text style={{fontSize: 18,   color: '#00A2EA'}} >
                  支付宝
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.drawerContent,{borderBottomWidth:1,borderColor:'#eee'}]} onPress={()=>Alert.alert('',"暂未开通")}   >
              <Text style={{fontSize: 18,   color: '#05AF10'}} >
                  微信支付
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.drawerContent]} onPress={()=>this.setState({modal:!this.state.modal})}   >
              <Text style={{fontSize: 18,   color: '#FF3E81'}} >
                  取消
                </Text>
            </TouchableOpacity>

            
 

        </Modal>

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
      justifyContent:'flex-start',
      alignItems:'flex-end',
      padding:20,
      flexDirection: 'row'
    } ,
    drawerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: 10,
    justifyContent:'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
    backgroundColor:"#fff",
    marginTop:10
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    textAlign: 'center',
    color: '#333'
  } 
})
