import React from 'react';
import { StyleSheet, Text} from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';



export default class SignInScreen extends React.Component {
  static navigationOptions = { title: 'Welcome', header: null};
  constructor(props) {
    super(props)
    this.state = ({
        email: '',
        password: '',
        confirmedPass: ''
    })    
}

signUpUser = (email, password) => {
    try {

        if (this.state.password.length < 6) {
            alert("Please enter atleast 6 characters")
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch (error) {
        console.log(error.toString())
    }
}

render() {
    return (
        <Container style={styles.container}>
            <Form>
                <Item floatingLabel>
                    <Label style={{color:'white'}}>Email</Label>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{ color: 'white' }}
                        onChangeText={(email) => this.setState({ email })}
                    />

                </Item>

                <Item floatingLabel>
                    <Label style={{color:'white'}}>Password</Label>
                    <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{ color: 'white' }}
                        onChangeText={(password) => this.setState({ password })}
                    />
                </Item>
                <Item floatingLabel>
                    <Label style={{color:'white'}}>Confirm Password</Label>
                    <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{ color: 'white' }}
                        onChangeText={(confirmedPass) => this.setState({ confirmedPass })}
                    />
                </Item>

                <Button style={{ marginTop: 10 }}
                    full
                    rounded
                    primary
                    onPress={
                      (this.state.password == this.state.confirmedPass)?
                      console.log("poszlo"):
                      //() => this.signUpUser(this.state.email, this.state.password):
                      alert("password must be the same in both fields")
                      
                      }
                      
                >
                    <Text style={{ color: 'white' }}> Sign Up</Text>
                </Button>
            </Form>
            <Button onPress={() => this.props.navigation.navigate('SignIn')}>
          <Text>Already have an account? Sign In</Text>       
          </Button>
        </Container>
    );
}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#032e5e',
    justifyContent: 'center',
    padding: 10
},
});