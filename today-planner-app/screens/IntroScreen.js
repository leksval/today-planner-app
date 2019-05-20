import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Image, TextInput} from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item,  Label } from 'native-base';



export default class IntroScreen extends React.Component {
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
      <View style={styles.container}>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
          <Item floatingLabel>
                    <Label>email</Label>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{color:'white'}}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />
            </Item>
            <Item floatingLabel>
                    <Label>password</Label>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        style={{color:'white'}}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />
            </Item>
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#032e5e'
  }
})