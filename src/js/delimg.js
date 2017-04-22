/**
 * @flow
 */

import React, { Component } from 'react';
import { TextInput,View, Text,TouchableOpacity,Image,StyleSheet,Platform,StatusBar,ToastAndroid,AsyncStorage,BackAndroid,Dimensions,Alert,ScrollView,DataSource,ListView} from 'react-native';
import EasyListView from 'react-native-easy-listview-gridview'

import {i_error} from './fun.js';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Simple extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {

    this.getuserphotos();
  }

  getuserphotos() {
        AsyncStorage.getItem('token').then((value) => {

            fetch('http://www.zcqy520.com/api/wap/userphoto', {
                method: 'POST',
                //cache  强制最新的数据
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache, must-revalidate'
                },
                body: 'userid=1&token='+value
            })
            .then((responseJson) => {
                var jdata = responseJson._bodyText;

                if( i_error(jdata) ) {
                    var o = JSON.parse(jdata);
                    var arr = [];
                    for(var i = 0; i<o.length; i++ ){

                        arr.push({photo:'http://www.zcqy520.com/Data/User/'+o[i].uid+'/'+o[i].imgurl+'.jpg'});
                    }
                    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        dataSource:ds.cloneWithRows(arr.reverse())
                    })
                    

                } 	
            })
        })
        
        
    }


  _renderGridItem(rowData) {
    return (
      <Image onStartShouldSetResponderCapture={()=>this.delit(rowData.photo)} style={styles.item}  source={{uri: rowData.photo}} />
    )
  }

  delit(img) {
        Alert.alert("提示","删除选中照片?",[
            {text: '删除',onPress: () => {

                AsyncStorage.getItem('token').then((value) => {
                  var t = img.split("/").pop();
                  var id = t.split(".")[0];
                  // console.log(id+"++++++++++++++++++++");
                  if( id ) {

                      fetch('http://www.zcqy520.com/api/wap/delimg', {
                          method: 'POST',
                          //cache  强制最新的数据
                          headers: {
                              'Content-Type': 'application/x-www-form-urlencoded',
                              'Cache-Control': 'no-cache, must-revalidate'
                          },
                          body: 'token='+value+'&id='+id
                      })
                      .then((responseJson) => {
                          var jdata = responseJson._bodyText;
                          // console.log(jdata+"+++++++++++++++++++++++++++++++");
                          if( i_error(jdata) ) {
                              this.getuserphotos();
                              // alert(jdata);

                          } 	
                      })
                  }
                  
              })
            }},
            {text: '取消'}
        ])
        
        
    }

  render() {
    return (
      <View style={{flex:1}} >
      <View style={{height:55,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'rgba(0,158,208,0.9)',borderBottomColor:'#ccc',borderBottomWidth:0.5,borderTopColor:'rgba(0,158,208,1)',borderTopWidth:0.5,width:'100%',paddingLeft:15}}>
          <Icon onPress={()=>this.props.navigation.goBack()} name="ios-arrow-round-back"   size={40}  color="#fff" />
          <Text style={{color:"rgba(0,158,208,1)",fontSize:25,marginLeft:10}} >|</Text>
          <Text style={{color:"#fff",fontSize:17,marginLeft:5}} >照片删除</Text>
      </View>

      <ListView contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this._renderGridItem(rowData)}
        enableEmptySections={true}
      />


      </View>
    );
  }
}

var styles = StyleSheet.create({
    list: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: '#CCC',
        margin: 10,
        width: 100,
        height: 100
    }
});