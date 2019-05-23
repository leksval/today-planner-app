import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Image, TextInput} from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item,  Label } from 'native-base';



export default class SignInScreen extends React.Component {
  static navigationOptions = { title: 'Welcome', header: null};
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (


<View style={{
        flex: 1,
        width: 360,
        height: 640,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          flex: 1,
          width: 360,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',         
          flexGrow: 1,
          backgroundColor : '#032e5e'
        }} >
          <Image source={require('../assets/iconToday.png')} />
        </View>
        <View style={{
          flex: 1,
          width: 360,
          height: 100,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexGrow: 2,
          paddingHorizontal: 20               
        }} >
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
            <Item floatingLabel>
                    <Label style={{color:'#032e5e'}}>email</Label>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{color:'#032e5e'}}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />
            </Item>
            <Item floatingLabel>
                    <Label style={{color:'#032e5e'}}>password</Label>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        style={{color:'#032e5e'}}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />
            </Item>
        <Item>
        <Button color='#032e5e' title="Login" onPress={this.handleLogin} />
        </Item>
        <Item>
        <Button color='#032e5e' title="Don't have an account? Sign Up" 
        onPress={() => this.props.navigation.navigate('Register')}></Button>
        </Item>
        </View>
      </View>
    )
  }
}

