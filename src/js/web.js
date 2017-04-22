import React,{Component} from 'react';
import {WebView,StyleSheet,View,TouchableOpacity,Text,StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Web extends Component{

    constructor(props) {

        super(props);
    }

    componentDidMount() {

    }

    render() {
        
        return(
            <View style={{flex:1}} >
                
                <View style={{height:55,flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor:'rgba(0,158,208,0.9)',borderBottomColor:'#ccc',borderBottomWidth:0.5,borderTopColor:'rgba(0,158,208,1)',borderTopWidth:0.5,width:'100%',paddingLeft:15}}>
                    <Icon onPress={()=>this.props.navigation.goBack()} name="ios-arrow-round-back"   size={40}  color="#fff" />
                    <Text style={{color:"rgba(0,158,208,1)",fontSize:25,marginLeft:10}} >|</Text>
                    <Text style={{color:"#fff",fontSize:17,marginLeft:5}} >{this.props.navigation.state.params.title}</Text>
                </View>
                <WebView
                    style={styles.web}
                    source={{uri: this.props.navigation.state.params.url}}
                />
                {/*<TouchableOpacity  style={{position:'absolute',right:20,bottom:100}} > 
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',height:50,width:50,borderRadius:25,backgroundColor:'#20C58F',opacity:0.8}}>
                        <Icon  name="md-add"  size={30}  color="#fff" />
                    </View>
                </TouchableOpacity>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    web:{
        
    }
});