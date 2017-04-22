

import React, { Component } from 'react';
import { TextInput,View, Text,TouchableOpacity,Image,StyleSheet,Platform,StatusBar,ToastAndroid,AsyncStorage,BackAndroid,Dimensions,Alert} from 'react-native';

import Button from 'react-native-button';

import { Kohana } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Ionicons';
import {i_error,loginServer} from './fun.js';


export default class Login extends Component {
    
    constructor(props) {

        super(props);
        this.state = {
            message:[{}],
            myinfo:''
        };

        this.refresh = null;

        // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        // console.log(this.props);
    }


    fresh() {

        AsyncStorage.getItem('token').then((value) => {

            fetch('http://192.168.1.121/api/wap/chatlists', {
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
                    var o = JSON.parse(jdata);
                    for(var i =0 ; i< o.length ; i++ ) {
                        o[i]['stime'] = o[i]['stime'].substr(5,5).replace("-","/");
                    }
                    this.setState({
                        message:o
                    })
                }  	
            })
            .catch((error) => {
                console.error(error);
            });
        })
        
    }

    componentWillUnmount() {

        if( this.refresh ) {
            clearInterval(this.refresh);
        }
    }
    componentWillMount() {
        //从缓存中取出用户的信息  如果有
        AsyncStorage.getItem('myinfo').then((value) => {

            this.setState({
                myinfo:JSON.parse(value)
            })

            // console.log(this.state.myinfo);

            this.fresh();

            this.refresh = setInterval(function(){
                this.fresh();
            }.bind(this),3000);
        })
        
    }

    renderNoRead(d) {

        if(d.flag == 1 && d.fid!=this.state.myinfo.uid){
            return <Icon  name="md-text" style={{marginTop:10,opacity:0.8}}   size={20}  color="#F2258B" />
        }
    }


    renderMessage(data,i) {
        // console.log(data);
        return(
            <TouchableOpacity activeOpacity={0.7} key={i} onPress={()=>this.props.navigation.navigate("Chat",{'uid':data.uid,'head':data.head,"name":data.name,dishead:'123'})}>
                <View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:75,width:'100%',marginTop:0,justifyContent: 'space-between',borderBottomWidth:0.2,borderColor:"#EEE",}}>
                    <View style={{flex:1,justifyContent: 'flex-start',flexDirection: 'row',alignItems:'flex-start'}}>
                        <Image style={{height:55,width:55,marginLeft:10,borderRadius:1}} source={{uri: 'http://192.168.1.121/Data/User/'+data.uid+'/'+data.head+'.jpg'}} />
                        <View style={{flex:1,justifyContent: 'space-around',flexDirection: 'column',alignItems:'flex-start',marginLeft:20}}>
                            <Text style={{fontSize:16,color:"#666",}}>{data.name}</Text>
                            <Text style={{fontSize:12,color:"#999",marginTop:10}}>{data.content}</Text>
                        </View>
                    </View>
                    <View style={{marginRight:10}} >
                        
                        <Text style={{fontSize:12,color:'#AAA',marginTop:-10}}>{data.stime}</Text>
                        {this.renderNoRead(data)}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    

    render() {
        return (
            <View style={{flex:1,justifyContent: 'flex-start',backgroundColor:'#fff',flexDirection: 'column',alignItems:'flex-start',}} >
                    
                    {this.state.message.map((data,i)=>this.renderMessage(data,i)) }
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