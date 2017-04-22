

import React, { Component } from 'react';
import { TextInput,View, Text,TouchableOpacity,Image,StyleSheet,Platform,StatusBar,ToastAndroid,AsyncStorage,BackAndroid,Dimensions,Alert} from 'react-native';

import { Actions,ActionConst } from 'react-native-router-flux';

import Button from 'react-native-button';

import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Ionicons';
import {i_error} from './fun.js';

import ImagePicker from 'react-native-image-picker';

import RNFetchBlob from 'react-native-fetch-blob'  


export default class Login extends Component {
    
    constructor(props) {

        super(props);
        this.state = {
            myinfo:{
                'name':'',
                'userid':'',
                'head':'',
                'phone':'',
                'gold':''
            },
            photos:[],
            token:''
        }
        
    }

    selectImage() {
        
        let options = {

             quality:1,
            maxWidth:800,
            maxHeight:800,


            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        AsyncStorage.getItem('token').then((value) => {

            if(value) {
                
                ImagePicker.launchImageLibrary(options, (response)  => {

                    if( response.didCancel ) {

                        return false;
                    }
                    
                    if( response.path ) {

                        RNFetchBlob.fetch('POST', 'http://www.zcqy520.com/api/wap/uploadfile?token='+value+'&action=head', {
                            
                            'Content-Type' : 'application/octet-stream',

                        }, RNFetchBlob.wrap(response.path))
                        .then((res) => {
                            // console.log(res.text());
                            if( res.text() == '上传成功' ) {
                                ToastAndroid.show("设置成功",ToastAndroid.SHORT);
                                this.fresh();
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            // error handling ..
                        })
                    }

                    
                    
                });
            }
        })
        
    }

    // 刷新用户信息
    fresh() {

        // 获取用户帐号信息
        AsyncStorage.getItem('token').then((value) => {

            if( value ) {
                // this.setState({token:value});
                // 登陆刷新数据
                fetch('http://www.zcqy520.com/api/wap/getuserinfo', {
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
                    // console.log("0000000000000000000");
                    // console.log(jdata);
                    if( i_error(jdata) ) {
                        var o = JSON.parse(jdata);
                        //保存登陆用户的信息
                        AsyncStorage.setItem("myinfo",JSON.stringify(o[0]));
                        this.setState({
                            myinfo:o[0]
                        })
                    }else{
                        // Actions.login({type: ActionConst.RESET});
                    }   	
                })
                .catch((error) => {
                    Actions.login({type: ActionConst.RESET});
                });
            }else{

                Actions.login({type: ActionConst.RESET});
            }
        })
                
    }
    // 显示用户信息
    displayinfo() {

        //从缓存中取出用户的信息  如果有
        AsyncStorage.getItem('myinfo').then((value) => {

            this.setState({
                myinfo:JSON.parse(value)
            })
            setTimeout(function(){
                this.getuserphotos();
            }.bind(this),100)
        })
         AsyncStorage.getItem('token').then((value) => {

            this.setState({
                token:value
            })
         })
    }

    getuserphotos() {

        AsyncStorage.getItem('token').then((value) => {

            fetch('http://www.zcqy520.com/api/wap/myphoto', {
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
                    //保存登陆用户的信息
                    // AsyncStorage.setItem("myinfo",JSON.stringify(o[0]));
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
        // console.log('http://www.zcqy520.com/Data/User/'+data.uid+'/'+data.imgurl+'.jpg'+'\n');
        return(
            <Image key = {i} style={{height:60,width:60,borderRadius:1,marginLeft:10}} source={{uri: 'http://www.zcqy520.com/Data/User/'+data.uid+'/'+data.imgurl+'.jpg'}} />
            // <Image style={{height:60,width:60,borderRadius:1,marginLeft:10}} source={require('../images/2.jpg')} />
        )
    }
    componentWillMount() {

        this.displayinfo();
    }

    render() {  
        return (
            <View style={{flex:1,justifyContent: 'flex-start',backgroundColor:'#EEE',flexDirection: 'column',alignItems:'flex-start',height:parseInt((Dimensions.get("window").height-135))}} >
                    
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:100,width:'100%',marginTop:20,justifyContent: 'space-between',borderWidth:1,borderColor:"#EEE"}}>
                        <View style={{flex:1,justifyContent: 'flex-start',flexDirection: 'row',alignItems:'flex-start'}}>
                            <TouchableOpacity onPress={()=>this.selectImage()}>
                                <Image style={{height:80,width:80,marginLeft:20,borderRadius:1}} source={{uri: 'http://www.zcqy520.com/Data/User/'+this.state.myinfo.uid+'/'+this.state.myinfo.head+'.jpg'}} />
                            </TouchableOpacity>
                            <View style={{flex:1,justifyContent: 'space-around',flexDirection: 'column',alignItems:'flex-start',marginLeft:20}}>
                                <Text style={{fontSize:20,color:"#666",}}>{this.state.myinfo.name}</Text>
                                <Text style={{fontSize:15,color:"#666",marginTop:10}}>情缘编号：{this.state.myinfo.userid}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Web",{title:'修改资料',url:"http://www.zcqy520.com/wap/center_app.html#"+this.state.token})}>
                        <View style={{marginRight:10,height:100,width:50,flex:1,alignItems:'center',justifyContent:'center'}} >
                            <Icon name="ios-create-outline"  size={35}  color="#666" />
                        </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'100%',marginTop:20,justifyContent: 'space-between',}}>
                        <Text style={{marginLeft:20}}>手机号</Text>
                        <Text style={{marginRight:20}}>{this.state.myinfo.phone}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Charge")} >
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'100%',justifyContent: 'space-between',borderWidth:0.5,borderColor:"#EEE"}}>
                        <Text style={{marginLeft:20}}>情缘服务</Text>
                        <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',justifyContent: 'flex-end'}}>
                            <Text style={{marginRight:20,color:'#E82794',fontSize:13,opacity:0.7}}>开通/充值</Text>
                            <Icon style={{marginRight:20,opacity:0.5}} name="ios-arrow-forward-outline"  size={25}  color="#999" />
                        </View>
                    </View>
                    </TouchableOpacity>
                    
                    
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Xiangce",{uid:this.state.myinfo.uid,head:this.state.myinfo.head,that:this,showadd:'add'})}>
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:80,width:'100%',marginTop:20,justifyContent: 'flex-start'}}>
                        <Text style={{marginLeft:20,marginRight:10}}>个人相册</Text>
                        {this.state.photos.map((data,i)=>this.renderImg(data,i)) }
                        <Image  style={{height:60,width:60,borderRadius:1,marginLeft:10}} source={{uri: 'http://www.zcqy520.com/Data/User/'+this.state.myinfo.uid+'/'+this.state.myinfo.head+'.jpg'}} />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Userdetail",{uid:this.state.myinfo.uid})}  >
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'100%',marginTop:0,justifyContent: 'space-between',borderTopWidth:0.5,borderColor:"#EEE"}}>
                        <Text style={{marginLeft:20}}>详细资料</Text>
                        <Icon style={{marginRight:20,opacity:0.5}} name="ios-arrow-forward-outline"  size={30}  color="#aaa" />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Setting")} >
                    <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:50,width:'100%',marginTop:20,justifyContent: 'space-between',borderWidth:1,borderColor:"#EEE"}}>
                        <Text style={{marginLeft:20}}>设置</Text>
                        <Icon style={{marginRight:20,opacity:0.5}} name="ios-arrow-forward-outline"  size={25}  color="#999" />
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