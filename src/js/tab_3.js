
import React, { Component } from 'react';
import { View, Text,TextInput,TouchableOpacity,Image,StyleSheet,Platform,Picker,AsyncStorage,ToastAndroid,ScrollView,ListView} from 'react-native';

import Icon2 from 'react-native-vector-icons/Ionicons';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';


export default class SearchCondition extends Component {
	constructor(props) {
		super(props);
	    this.state = {
	    	addr:'',
	    	age:'',
	    	height:'',
	    	edu:'',
	    	mryst:'',
	    	salary:'',
	    	uidname:''
	    };

			// console.log(this.props);

	}

	saveSearchCondition() {
		
		var condition = JSON.stringify(this.state);
		// alert(condition);return ;
		AsyncStorage.setItem('condition',condition);
		this.props.navigation.navigate("Searchresult",{search:condition});
	}

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#eee'}}>

        

        <ScrollView style={{padding:10}}>
        	
				{/*<View>
	        	<Text style={{color:'#FF536A',paddingLeft:5,paddingTop:5,fontSize:16,paddingBottom:5}} >条件筛选 </Text>
	        </View>*/}
			<Picker
				style={{color:'#666',backgroundColor:'#fff',marginTop:5,height:40}}
			  selectedValue={this.state.age}
			  onValueChange={(value) => this.setState({age: value})}>
			  <Picker.Item label="年龄：不限" value="" />
			  <Picker.Item label="年龄：18-22" value="18-22" />
			  <Picker.Item label="年龄：23-27" value="23-27" />
			  <Picker.Item label="年龄：28-32" value="28-32" />
			  <Picker.Item label="年龄：33-37" value="33-37" />
			  <Picker.Item label="年龄：38-42" value="38-42" />
			  <Picker.Item label="年龄：43-47" value="43-47" />
			  <Picker.Item label="年龄：48-52" value="48-52" />
			  <Picker.Item label="年龄：53-57" value="53-57" />
			  <Picker.Item label="年龄：58-62" value="58-62" />
			  <Picker.Item label="年龄：63-70" value="63-70" />
			  <Picker.Item label="年龄：70以上" value="71-99" />
			</Picker>
			<Picker
			style={{color:'#666',backgroundColor:'#fff',marginTop:5,height:40}}
			  selectedValue={this.state.height}
			  onValueChange={(value) => this.setState({height: value})}>
			  <Picker.Item label="身高：不限" value="" />
			  <Picker.Item label="身高：150以下" value="60-150" />
			  <Picker.Item label="身高：150-160" value="150-160" />
			  <Picker.Item label="身高：160-170" value="160-170" />
			  <Picker.Item label="身高：170-180" value="170-180" />
			  <Picker.Item label="身高：180-190" value="180-190" />
			  <Picker.Item label="身高：190以上" value="191-250" />
			</Picker>
	        <Picker
	        style={{color:'#666',backgroundColor:'#fff',marginTop:5,height:40}}
			  selectedValue={this.state.edu}
			  onValueChange={(value) => this.setState({edu: value})}>
			  <Picker.Item label="学历：不限" value="" />
			  <Picker.Item label="最低学历：高中" value="高中" />
			  <Picker.Item label="最低学历：专科" value="专科" />
			  <Picker.Item label="最低学历：本科" value="本科" />
			  <Picker.Item label="最低学历：硕士" value="硕士" />
			  <Picker.Item label="最低学历：博士" value="博士及以上" />
			</Picker>

	        <Picker
	        style={{color:'#666',backgroundColor:'#fff',marginTop:5,height:40}}
			  selectedValue={this.state.mryst}
			  onValueChange={(value) => this.setState({mryst: value})}>
			  <Picker.Item label="婚况：不限" value="" />
			  <Picker.Item label="婚姻状况：未婚" value="未婚" />
			  <Picker.Item label="婚姻状况：离异" value="离异" />
			  <Picker.Item label="婚姻状况：丧偶" value="丧偶" />
			</Picker>

	        <Picker
	        style={{color:'#666',backgroundColor:'#fff',marginTop:5,height:40}}
			  selectedValue={this.state.salary}
			  onValueChange={(value) => this.setState({salary: value})}>
			  <Picker.Item label="薪资：不限" value="" />
			  <Picker.Item label="薪资：2000以下" value="1-2000" />
			  <Picker.Item label="薪资：2000-4000" value="2000-4000" />
			  <Picker.Item label="薪资：4000-6000" value="4000-6000" />
			  <Picker.Item label="薪资：6000-8000" value="6000-8000" />
			  <Picker.Item label="薪资：8000-10000" value="8000-10000" />
			  <Picker.Item label="薪资：10000以上" value="10000-10000000" />
			</Picker>
			
			<View>

			<TextInput underlineColorAndroid='transparent' onChangeText={(text) => { this.setState({addr:text}) }} editable={true} placeholderTextColor="#AAA" placeholder={"地区：比如　四川，北京，上海，成都，湖北"} value={this.state.addr} style={{color:'#20C58E',height: 40,backgroundColor:"#fff",marginTop:10,margin:0,padding:0,paddingLeft:20}} />
			</View>
        	<View>
	        	<Text style={{color:'#FF536A',paddingLeft:5,paddingTop:20,fontSize:16}} >精确查找 ( 昵称 或 编号 ) </Text>
	        </View>
	        <TextInput underlineColorAndroid='transparent' onChangeText={(text) => { this.setState({uidname:text}) }} editable={true} placeholderTextColor="#AAA" placeholder={"昵称或编号（B2312，42242189）"} value={this.state.uidname} style={{color:'#20C58E',height: 40,backgroundColor:"#fff",marginTop:10,padding:0,paddingLeft:20}} />

            <Button onPress={()=>this.saveSearchCondition()}  containerStyle={{height:40,width:'100%',backgroundColor:'#FF536A', overflow:'hidden',marginTop:10,justifyContent: 'center',borderRadius:3}} style={{fontSize: 20, color: '#fff',fontWeight:'normal'}}>立即搜索</Button>

	        {/*<Button onPress={()=>this.saveSearchCondition()} containerStyle={{padding:7,height:40, overflow:'hidden', borderRadius:3, backgroundColor: '#FF536A',margin:5}} style={{fontSize: 16, color: 'white'}}> 完成</Button>*/}
        </ScrollView>


      </View>
      
    );
  }
}


