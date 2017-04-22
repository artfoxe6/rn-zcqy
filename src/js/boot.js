import React ,{ Component } from 'react';
import { AppRegistry,BackAndroid } from 'react-native';

import { StackNavigator } from 'react-navigation';


import Main from './main.js';
import Login from './login.js';
import Register from './register.js';
import Web from './web.js';
import User from './user.js';
import Chat from './chat.js';
import Setting from './setting.js';
import Charge from './charge.js';          
import Searchresult from './searchresult.js';          
import Xiangce from './xiangce.js';          
import Userdetail from './userdetail.js';   
import Forget from './forget.js';   
import Delimg from './delimg.js';   



const App = StackNavigator({
  
  
  Main: { screen: Main },
  Delimg: { screen: Delimg },
  Forget: { screen: Forget },
  
  Login: { screen: Login },
  User: { screen: User },
  Charge: { screen: Charge },
  Xiangce: { screen: Xiangce },
  Setting: { screen: Setting },
  Userdetail: { screen: Userdetail },
  Web: { screen: Web },
  Searchresult: { screen: Searchresult },
  Chat: { screen: Chat },
  Register: { screen: Register }
},{ headerMode: 'none'});


AppRegistry.registerComponent('zcqy', () => App);
