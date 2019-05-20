import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Image} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import * as firebase from 'firebase';

import SignInScreen from './screens/SignInScreen'
import HomeScreen from './screens/HomeScreen'

const firebaseConfig = {
  apiKey: "AIzaSyDhpJspUGaxOSNO8Vr6H3a6L8zyRC9UGUw",
  authDomain: "todayplannersm-9880d.firebaseapp.com",
  databaseURL: "https://todayplannersm-9880d.firebaseio.com",
  projectId: "todayplannersm-9880d",
  storageBucket: "todayplannersm-9880d.appspot.com",
  messagingSenderId: "749997580651",
  appId: "1:749997580651:web:9feccf4875cd0cf2"
};
firebase.initializeApp(firebaseConfig);

class MainScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'App ',  
    headerTintColor: '#ae0578',
    headerStyle: {
      backgroundColor: '#032e5e'
    },
 /*   headerLeft:
      <HeaderBarItem to='InfoScreen' title='App info' />,
    headerRight:
      <HeaderBarItem to='FeedbackScreen' title='Feedback' />
      */
  });
  render() {
    return (
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#032e5e'}}>
        
        <TouchableHighlight onPress={() => this.props.navigation.navigate('SignIn')}>
          <Image  source={require('./assets/icon.png')} />
        </TouchableHighlight>
      </View>
    );
  }
}





const RootStack = createStackNavigator(
  {
    Main: MainScreen,
    SignIn: SignInScreen,
    Home: HomeScreen
  },
  {
    initialRouteName: 'Main',
  }
  
);





const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
