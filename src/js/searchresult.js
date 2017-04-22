

import React, { Component } from 'react';
import { View, Text,TextInput,TouchableOpacity,TouchableHighlight,Image,AsyncStorage,ToastAndroid} from 'react-native';

import GiftedListView from 'react-native-gifted-listview';

import Icon from 'react-native-vector-icons/Ionicons';

import { Actions } from 'react-native-router-flux';
import {i_error} from "./fun.js";

export default class Searchresult extends Component {
  	constructor(props) {
      	super(props);

  	}

  ages(str) {
    var   r   =   str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);    
    if(r==null)return   false;    
    var   d=   new   Date(r[1],   r[3]-1,   r[4]);    
    if   (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])  
    {  
      var Y = new Date().getFullYear();  
      return (Y-r[1]);
    }   
  }

  date2age(date)
	{
		return (new Date()).getFullYear() - parseInt(date.split("-")[0]);
	}

  jiequ(str) {
    if( str.length >=7 ) {
      return str.substring(0,7)+'...';
    }else{
      return str;
    }
  }
  intro(str) {
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    if( !reg.test(str) ) {
      return "这个人很聪明，什么都没有留下";
    } 

    if( str.length >=38 ) {
      return str.substring(0,38)+'...';
    }else{
      return str;
    }
  }

  _onFetch(page = 1, callback, options) {
  		AsyncStorage.getItem('myinfo').then((value) => {
            window.searchsex = "";
            if(value !== null){
                var jdata = JSON.parse(value);
                if( jdata.sex != '' ) {
                    if( jdata.sex == '女' ) {
                        window.searchsex = "男";
                    }else{
                        window.searchsex = "女";
                    }
                }
            }
        }).then(function(){
            AsyncStorage.getItem('condition').then((svalue) => {
                svalue = JSON.parse(svalue);
                window.sql = "salary=&uidname=&addr=&mryst=&height=&age=&edu=&sex="+window.searchsex+"&page="+page;
                if( svalue != null ) {
                    window.sql = 'salary='+svalue.salary+'&addr='+svalue.addr+'&uidname='+svalue.uidname+'&mryst='+svalue.mryst+'&height='+svalue.height+'&age='+svalue.age+'&edu='+svalue.edu+'&sex='+window.searchsex+"&page="+page;
                }
                window.sql = window.sql.replace(/undefined/ig,"");
            }).then(function(){
                fetch('http://www.zcqy520.com/api/wap/search', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Cache-Control': 'no-cache, must-revalidate'
                    },
                    body: window.sql
                })
                .then((responseJson) => {
                    var jdata = responseJson._bodyText;
                    if( i_error(jdata) ) {
                        callback(JSON.parse(jdata));
                    }else{
                        callback( [],{
                            allLoaded: true, // the end of the list is reached
                        });
                        // alert("请更换条件在搜索");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            })
        });

          

  	}


  _onPress(rowData) {
    // console.log(rowData+' pressed');
  }

  _renderRowView(rowData) {
    // console.log('http://www.zcqy520.com/Data/User/'+rowData['uid']+'/'+rowData['head']+'.jpg');
    return (
        <TouchableOpacity  onPress={()=>this.props.navigation.navigate("User",{'uid':rowData['uid'],'head':rowData['head']})} >
		<View style={{backgroundColor:'#fff',alignItems: 'center',flex:0,flexDirection: 'row',height:110,width:'100%',marginTop:20,justifyContent: 'space-between',borderWidth:1,borderColor:"#EEE"}}>
                <Image style={{height:90,width:90,marginLeft:20,borderRadius:1}} source={{uri: 'http://www.zcqy520.com/Data/User/'+rowData['uid']+'/'+rowData['head']+'.jpg'}} />
                <View style={{flex:1,justifyContent: 'space-around',flexDirection: 'column',alignItems:'flex-start',marginLeft:20,paddingRight:15}}>
                    <Text style={{fontSize:16,color:"#666",marginTop:-10}}>{rowData['name']} <Text style={{fontSize:12,color:"#666",marginLeft:15}}>ID:{rowData['uid']}</Text></Text>
                    
                    <Text style={{fontSize:12,color:"#666",marginTop:5}}>{rowData['sex']}、{this.date2age(rowData['age'])}岁，{rowData['height']}cm、{rowData['mryst']}、{rowData['salary']}/月、{rowData['edu']}、{rowData['addr']}</Text>

                </View>
        </View>
        </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height:55,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'rgba(0,158,208,0.9)',borderBottomColor:'#ccc',borderBottomWidth:0.5,borderTopColor:'rgba(0,158,208,1)',borderTopWidth:0.5,width:'100%',paddingLeft:15}}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                          <Icon onPress={()=>this.props.navigation.goBack()} name="ios-arrow-round-back"   size={40}  color="#fff" />
                          <Text style={{color:"rgba(0,158,208,1)",fontSize:25,marginLeft:10}} >|</Text>
                          <Text style={{color:"#fff",fontSize:17,marginLeft:5}} >搜索结果</Text>
                        </View>

                    </View>
        <GiftedListView
          rowView={this._renderRowView.bind(this)}
          onFetch={this._onFetch}
          firstLoader={true} // display a loader for the first fetching
          pagination={true} // enable infinite scrolling using touch to load more
          refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          // withSections={false} // enable sections
          enableEmptySections={true}
          customStyles={{
            paginationView: {
              backgroundColor: '#EEE',
            },
          }}

          refreshableTintColor="blue"
        />
      </View>
    );
  }
}

var styles = {
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  }
};


