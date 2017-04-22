

import React, { Component } from 'react';
import { TextInput,View, Text,TouchableOpacity,Image,StyleSheet,Platform,StatusBar,ToastAndroid,AsyncStorage,BackAndroid,Dimensions,Alert,ScrollView,Keyboard} from 'react-native';

import { Actions,ActionConst } from 'react-native-router-flux';

import Button from 'react-native-button';
import Modal from 'react-native-modalbox';

import Icon from 'react-native-vector-icons/Ionicons';
import {i_error} from './fun.js';


export default class Login extends Component {
    
    constructor(props) {

        super(props);
        this.state = {
            chats:[],
            myhead:'',
            myuid:'',
            modal:false,
            message:'',
            chatheight:(Dimensions.get('window').height-130)
        };
 
    }


    fresh() {
        AsyncStorage.getItem('token').then((value) => {
            if( value ) {
                window.token = value;
                fetch('http://192.168.1.121/api/wap/chat', {
                    method: 'POST',
                    //cache  强制最新的数据
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cache-Control': 'no-cache, must-revalidate'
                    },
                    body: 'userid='+this.props.navigation.state.params.uid+'&token='+value
                })
                .then((responseJson) => {
                    var jdata = responseJson._bodyText;
                    // console.log(jdata);
                    if( i_error(jdata) ) {
                        var o = JSON.parse(jdata);
                        o = o.reverse();
                        this.setState({
                            chats:o
                        })
                        
                    }  	
                    
                })
                .catch((error) => {
                    console.error(error);
                });
            } 
        })
        
        
    }


    sendgift(gid) {
        
        gid=133;
        Alert.alert("提示","确认操作",[
            {text: '发送礼物',onPress: () => {

                fetch('http://192.168.1.121/api/wap/sendgift', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cache-Control': 'no-cache, must-revalidate'
                    },
                    body: 'token='+window.token+'&userid='+this.props.navigation.state.params.userid+"&gid="+gid
                }).then((responseJson) =>{
                    var jdata = responseJson._bodyText; 
                    if( i_error(jdata) ) {
                        Alert.alert("温馨提示","赠送成功",[
                            {text: '知道了'}
                        ])
                    }else{
                        Alert.alert("温馨提示",jdata.substr(4,jdata.length),[
                            {text: '知道了'}
                        ])
                    }
                } )
                .catch((error) =>console.log("error"));
            }},
            {text: '取消'}
        ])
    }
    componentDidMount() {

        setTimeout(function(){
            this.refs.chatlist.scrollToEnd({animated: true});
        }.bind(this),100)

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));




    }
    

    _keyboardDidShow(e) { 
        
        
        var t = (Dimensions.get('window').height-130);
        var newH = (Dimensions.get('window').height-130) - parseInt(e.endCoordinates.height);
        this.setState({chatheight:newH});

        setTimeout(function(){
            this.refs.chatlist.scrollToEnd({animated: true});
        }.bind(this),500)
    }
    _keyboardDidHide() {
        var t = (Dimensions.get('window').height-130);
        this.setState({chatheight:t});

    }

    componentWillUnmount() {

        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    componentWillMount() {

        
        AsyncStorage.getItem('token').then((value) => {
            
            fetch('http://192.168.1.121/api/wap/getuserinfo', {
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
                if( i_error(jdata) ) {
                    var o = JSON.parse(jdata);
                    window.myhead = o[0].head;
                    window.myuid = o[0].uid;
                    this.setState({myhead:o[0].head});
                    this.setState({myuid:o[0].uid});
                }  	
            })
            .catch((error) => {
                console.error(error);
            });
            this.fresh();
        })
        
    }


    displayrighthead() {

        if( this.props.navigation.state.params.dishead ) {

            return (
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("User",{'uid':this.props.navigation.state.params.uid,'head':this.props.navigation.state.params.head})}>
                    <View style={{height:55,width:55,alignItems:'center',justifyContent:'center',flex:1}}>
                        <Icon  style={{marginRight:0,}} name="md-person"   size={25}  color="#fff" />
                    </View>
                </TouchableOpacity>
            );
        }
    }

    onSend() {
        if( this.state.message == '' ) {

            ToastAndroid.show("内容不能为空",ToastAndroid.SHORT); return false;
        }
        fetch('http://192.168.1.121/api/wap/sendsms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache, must-revalidate'
            },
            body: 'token='+window.token+'&userid='+this.props.navigation.state.params.uid+'&content='+this.state.message
        })
        .then((responseJson) => {
            
            var jdata = responseJson._bodyText; 
            if( i_error(jdata) ) {
                var o = this.state.chats;
                o.push({fid:this.state.myuid,content:this.state.message,head:this.state.myhead})
                
                this.setState({message:''});
                this.setState({
                    chats:o
                })
                
                this.refs.chatinput.clear();
                // this.refs.chatlist.scrollToEnd({animated: true});
                setTimeout(function(){
                    this.refs.chatlist.scrollToEnd({animated: true});
                }.bind(this),10)
            }else{
                ToastAndroid.show("发送失败",ToastAndroid.SHORT);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    renderMessage(data,i) {
        // console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[");
        // console.log(this.state.chats);
        // console.log('http://192.168.1.121/Data/User/'+data.fid+'/'+this.state.myhead+'.jpg');
        if( this.props.navigation.state.params.uid == data.fid ){
            return (
                <View key={i} style={{backgroundColor:'transparent',alignItems: 'flex-start',flex:1,flexDirection: 'row',width:'100%',marginTop:10,justifyContent: 'flex-start',borderBottomWidth:0.2,borderColor:"#EEE"}}>
                    <View style={{justifyContent: 'flex-start',flexDirection: 'row',alignItems:'flex-start',width:70}}>
                        <Image style={{height:45,width:45,marginLeft:10,borderRadius:3}} source={{uri: 'http://192.168.1.121/Data/User/'+this.props.navigation.state.params.uid+'/'+this.props.navigation.state.params.head+'.jpg'}} />
                    </View>
                    <View style={{maxWidth:(Dimensions.get('window').width)*2/3}} >
                        <Text style={{flex:0,fontSize:16,color:"#333",backgroundColor:'#9CE76C',padding:15,borderRadius:10}}>{data.content}</Text>
                    </View>
                </View>
            )
        }else{

            return(
                <View key={i} style={{backgroundColor:'transparent',alignItems: 'flex-start',flex:0,flexDirection: 'row',width:'100%',marginTop:10,justifyContent: 'flex-end',borderBottomWidth:0.2,borderColor:"#EEE"}}>
                            
                    <View style={{maxWidth:(Dimensions.get('window').width)*2/3}} >
                        <Text style={{flex:0,fontSize:16,color:"#333",backgroundColor:'#9CE76C',padding:15,borderRadius:10}}>{data.content}</Text>
                    </View>
                    <View style={{justifyContent: 'flex-start',flexDirection: 'row',alignItems:'flex-start',width:70}}>
                        <Image style={{height:45,width:45,marginLeft:10,borderRadius:3}} source={{uri: 'http://192.168.1.121/Data/User/'+data.fid+'/'+this.state.myhead+'.jpg'}} />
                    </View>
                </View>
            )
        }
        
    }

    render() {
        return (
            <View style={{flex:1,justifyContent: 'flex-start',backgroundColor:'#EEE',flexDirection: 'column',alignItems:'flex-start'}} >
                    <View style={{height:55,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'rgba(0,158,208,0.9)',borderBottomColor:'#ccc',borderBottomWidth:0.5,borderTopColor:'rgba(0,158,208,1)',borderTopWidth:0.5,width:'100%',paddingLeft:15}}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                          <Icon onPress={()=>this.props.navigation.goBack()} name="ios-arrow-round-back"   size={40}  color="#fff" />
                          <Text style={{color:"rgba(0,158,208,1)",fontSize:25,marginLeft:10}} >|</Text>
                          <Text style={{color:"#fff",fontSize:17,marginLeft:5}} >{this.props.navigation.state.params.name}</Text>
                        </View>
                        {this.displayrighthead()}
                        
                    </View>

                   <View style={{height:this.state.chatheight,width:'100%',paddingBottom:0}}>
                        <ScrollView ref="chatlist"  >
                        {this.state.chats.map((data,i)=>this.renderMessage(data,i)) }
        
                        </ScrollView>
                   </View>
                    

                    <View style={{flex:1,height:55,backgroundColor:'#eee',width:'100%',position:'absolute',bottom:0,borderTopWidth:0.5,borderTopColor:'#ccc',justifyContent:'space-between',flexDirection:'row',alignItems:'center', }}>
                        <View style={{height:55,backgroundColor:'#eee',justifyContent:'space-between',flexDirection:'row',alignItems:'center', }}>
                          <Icon onPress={()=>{ Keyboard.dismiss(); setTimeout(function(){this.setState({modal:!this.state.modal});}.bind(this),100) }} name="ios-add-circle-outline"  size={35} style={{marginLeft:10}} color="#666" />
                          <TextInput
                              ref="chatinput"
                              style={{paddingLeft:15,height:40,borderRadius:2,backgroundColor:'rgba(255,255,255,0.7)',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',width:(Dimensions.get('window').width-120),marginLeft:10,borderBottomWidth:1,borderBottomColor:'red'}}
                              value={this.state.text}
                              placeholder={''}
                              underlineColorAndroid='transparent'
                              onChangeText={(text) => { this.setState({message:text}) }}
                          />
                        </View>
                        <Button onPress={()=>this.onSend()} style={{color:"#fff",fontSize:15,fontWeight:'normal'}} containerStyle={{backgroundColor:'rgba(0,158,208,0.8)',height:33,width:50,justifyContent:'center',borderRadius:3,marginRight:10}}>发送</Button>
                    </View>

                    <Modal style={{height:375}} position={"bottom"} isOpen={this.state.modal} onClosed={ ()=>this.setState({modal:false})}>

                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <TouchableOpacity onPress={ ()=>this.sendgift(138) } activeOpacity={0.8}>
                        <Image
                            style={{'height':100,'width':100,margin:10}}
                            source={require('../images/gift/xiong.jpg')} />
                        <Text style={{textAlign:'center'}}>抱抱熊</Text>
                        <Text style={{textAlign:'center',color:'#F23510'}}>3/元</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ ()=>this.sendgift(139) } activeOpacity={0.8}>
                        <Image
                            style={{'height':100,'width':100,margin:10}}
                            source={require('../images/gift/meigui.jpg')} />
                        <Text style={{textAlign:'center'}}>粉色玫瑰</Text>
                        <Text style={{textAlign:'center',color:'#F23510'}}>6/元</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ ()=>this.sendgift(140) } activeOpacity={0.8}>
                        <Image
                            style={{'height':100,'width':100,margin:10}}
                            source={require('../images/gift/xianglian2.jpg')} />
                        <Text style={{textAlign:'center'}}>水晶项链</Text>
                        <Text style={{textAlign:'center',color:'#F23510'}}>10/元</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <TouchableOpacity onPress={ ()=>this.sendgift(141) } activeOpacity={0.8}>
                        <Image
                            style={{'height':100,'width':100,margin:10}}
                            source={require('../images/gift/xianglian.jpg')} />
                        <Text style={{textAlign:'center'}}>铂金项链</Text>
                        <Text style={{textAlign:'center',color:'#F23510'}}>15/元</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ ()=>this.sendgift(142) } activeOpacity={0.8}>
                        <Image
                            style={{'height':100,'width':100,margin:10}}
                            source={require('../images/gift/shoulian.jpg')} />
                        <Text style={{textAlign:'center'}}>钻石手链</Text>
                        <Text style={{textAlign:'center',color:'#F23510'}}>30/元</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ ()=>this.sendgift(143) } activeOpacity={0.8}>
                        <Image
                            style={{'height':100,'width':100,margin:10}}
                            source={require('../images/gift/zuanjie.jpg')} />
                        <Text style={{textAlign:'center'}}>豪华钻戒</Text>
                        <Text style={{textAlign:'center',color:'#F23510'}}>60/元</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={[styles.drawerContent,{borderTopWidth:1,borderColor:'#eee'}]} onPress={()=>this.setState({modal:false})}   >
                    <Text style={{fontSize: 18,   color: '#666'}} >
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
    	// width:'100%',
    	resizeMode:'cover',
    	alignItems:'center',
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
  }
})