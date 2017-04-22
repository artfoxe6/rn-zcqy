

import React, { Component } from 'react';
import { TextInput,View, Text,TouchableOpacity,Image,StyleSheet,Platform,StatusBar,ToastAndroid,AsyncStorage,BackAndroid,Dimensions,Alert} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import BackgroundTimer from 'react-native-background-timer';
import Grid from 'react-native-grid-component';




export default class Tab_1 extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            recommend:[]
        }
    }
    fresh() {
        AsyncStorage.getItem('token').then((value) => {
            if( value ) {
                fetch('http://192.168.1.121/api/wap/getrecommendusersrand', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cache-Control': 'no-cache, must-revalidate'
                    },
                    body: 'token='+value
                })
                .then((response) => response.json())
                .then((responseJson) => {

                    var arr = new Array();
                    for(var i = 0 ; i < responseJson.length ; i++) {

                        arr.push(responseJson[i].head+'#'+responseJson[i].uid);
                    }
                    this.setState({recommend:arr});

            
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        })
        
    }

    okBack() {

        Alert.alert("提示","退出尊诚情缘 ?\n ",[
            {text: '取消'},
            {text: '退出程序',onPress: () => BackAndroid.exitApp()}
        ])
        return true;
    }
    componentWillUnmount() {

        clearTimeout(window.stl);
        BackgroundTimer.clearInterval(this.intervalId2);

        // BackAndroid.removeEventListener('hardwareBackPress', this.okBack);

    }
    componentWillMount() {
        window.stl = setTimeout(function(){
            this.fresh();
        }.bind(this),100)

        this.intervalId2 = BackgroundTimer.setInterval(() => {
            
            this.fresh();
        }, 30000);

        // BackAndroid.addEventListener('hardwareBackPress', this.okBack);
  
    }

    _renderItem(data,i) {
        var t = data.split("#");
        var head = t[0];
        var uid = t[1];
        var sty = {};
        var vty = {};
        if( i == 0 ) {
            // sty = {marginLeft:10};
            vty = {paddingRight:5,paddingLeft:10};
        }else{

            // sty = {marginRight:10};
            vty = {paddingLeft:5,paddingRight:10};
        }
        return (

            <View style={[styles.item,vty]} key={i}>
                <TouchableOpacity activeOpacity={0.6} onPress={()=>this.props.navigation.navigate("User",{'uid':uid,'head':head})} >
                        <Image style={[styles.imgbox,sty,{height:parseInt((Dimensions.get("window").height-169)/3)}]} source={{uri: 'http://192.168.1.121/Data/User/'+uid+'/'+head+'.jpg'}} >
                        </Image>
                </TouchableOpacity>

            </View>
        );
    }

    render() {
        return (

            <Grid
                style={styles.list}
                renderItem={this._renderItem.bind(this)}
                data={this.state.recommend}
                itemsPerRow={2}
            />
      
        );
    }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    paddingTop:10,
    // paddingTop:10,
    // paddingBottom:10,
    
    // paddingRight:1,
    // height: 160,
    // margin: 1,
    // backgroundColor:'#fff'
  },
  list: {
    flex: 1
  },
  imgbox2:{
    	flex:1,
    	height:null,
    	width:'100%',
    	resizeMode:'cover',
    	alignItems:'center',
        borderRadius:3,
        // padding:30
    } ,
  imgbox:{
    	flex:1,
    	// height:160,
    	width:'100%',
    	resizeMode:'cover',
    	alignItems:'center',
        borderWidth:10,
        borderRadius:3,
        // opacity:9
        // borderColor:'red'
    } 
});
