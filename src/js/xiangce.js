

import React, { Component } from 'react';
import { StatusBar,Navigator,View, Text,TextInput,TouchableOpacity,Image,StyleSheet,Platform,ScrollView,Alert,ToastAndroid,AsyncStorage,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Actions } from 'react-native-router-flux';

import {i_error} from './fun.js';
import ImagePicker from 'react-native-image-picker';

import RNFetchBlob from 'react-native-fetch-blob'       
import PhotoBrowser from 'react-native-photo-browser';


export default class Charge extends Component {

    

    constructor(props) {

        
        super(props);

        this._renderScene = this._renderScene.bind(this);

        this.state = {

            images:[],
            token:''
        }
        this.preThis = this.props.navigation.state.params.that;

    }

    getuserphotos() {

        AsyncStorage.getItem('token').then((value) => {

            fetch('http://192.168.1.121/api/wap/myphoto', {
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
                    this.preThis.setState({
                        photos:o.reverse()
                    })
                    // console.log(o);

                } 	
            })
            .catch((error) => {
                console.error(error);
            });
        })
        
    }


    fresh() {

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
                var a = [];

                var o = JSON.parse(jdata);

                for( var i = o.length-1; i>= 0 ; i-- ) {
                    var t = {photo:"http://192.168.1.121/Data/User/"+o[i].uid+"/"+o[i].imgurl+".jpg"};
                    a.push(t);
                }
                a.push({photo:"http://192.168.1.121/Data/User/"+this.props.navigation.state.params.uid+"/"+this.props.navigation.state.params.head+".jpg"});

                this.setState({
                    images:a
                })

            }  	
        })
        .catch((error) => {
            console.error(error);
        });
    }

    componentDidMount() {

            setTimeout(function(){
                this.fresh();
                if( this.props.navigation.state.params.showadd ) {
                    this.getuserphotos();
                }   
                
            }.bind(this), 200)
            
            
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

                        RNFetchBlob.fetch('POST', 'http://192.168.1.121/api/wap/uploadfile?token='+value, {
                            
                            'Content-Type' : 'application/octet-stream',

                        }, RNFetchBlob.wrap(response.path))
                        .then((res) => {
                            // console.log(res.text());
                            if( res.text() == '上传成功' ) {
                                ToastAndroid.show("上传成功",ToastAndroid.SHORT);

                                this.fresh();
                                this.getuserphotos();

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


    renderAdd() {

        if( this.props.navigation.state.params.showadd ) {

            return (
                <TouchableOpacity onPress={()=>{this.selectImage()}} style={{position:'absolute',right:0,height:55,width:55,alignItems:'center',justifyContent:'center'}} >
                    <Icon name="ios-add-circle-outline"  size={25}  color="#fff" />
                </TouchableOpacity>
            
                
            )
        }
    }

    renderDel() {

        if( this.props.navigation.state.params.showadd ) {

            return (
                <TouchableOpacity onPress={()=>{this.deleteImage()}} style={{position:'absolute',right:56,height:55,width:55,alignItems:'center',justifyContent:'center'}} >
                    <Icon name="ios-trash-outline"  size={25}  color="#fff" />
                </TouchableOpacity>            
            )
        }
    }

    deleteImage() {
        // var t = this.state.images;
        // t.pop();
        this.props.navigation.navigate("Delimg",{imgs:this.state.images,token:this.state.token});
    }

    renderGe() {

        if( this.props.navigation.state.params.showadd ) {

            return (
                <Text style={{color:"rgba(0,158,208,1)",fontSize:25,position:'absolute',right:53}} >|</Text>          
            )
        }
    }

    _renderScene(route, navigator) {

        return (
        <View style={{flex:1}}>

            <View style={{height:55,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'rgba(0,158,208,0.9)',borderBottomColor:'#ccc',borderTopColor:'rgba(0,158,208,1)',borderTopWidth:0.5,width:'100%',paddingLeft:15}}>
                    <Icon onPress={()=>this.props.navigation.goBack()} name="ios-arrow-round-back"   size={40}  color="#fff" />
                    <Text style={{color:"rgba(0,158,208,1)",fontSize:25,marginLeft:10}} >|</Text>
                    <Text style={{color:"#fff",fontSize:17,marginLeft:5}} >相册</Text>
                    {this.renderAdd()}
                    {this.renderGe()}
                    {this.renderDel()}
                </View>
            
                
            <PhotoBrowser
            ref="photos"
            alwaysShowControls={true}
            mediaList={this.state.images}
            enableGrid={false}
           />

        

        </View>
        );
  }

    render() {
        return (
            <Navigator
            ref="nav"
            initialRoute={{ index: 0 }}
            renderScene={this._renderScene} />
         

        
        
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // marginLeft:20,
    marginTop:5
  },
  drawerText: {
    fontSize: 16,
    marginLeft: 15,
    textAlign: 'center',
    color: '#333'
  } 
})
