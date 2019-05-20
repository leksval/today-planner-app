import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import * as firebase from 'firebase';

import SignInScreen from './screens/SignInScreen'

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

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Loadnig"
          onPress={() => this.props.navigation.navigate('SignIn')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}



const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    SignIn: SignInScreen,
  },
  {
    initialRouteName: 'Home',
  }
);





const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
