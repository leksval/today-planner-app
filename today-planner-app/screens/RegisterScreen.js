import React from 'react';
import { Text, View, Image} from 'react-native';
import { Form, Input, Item, Button, Label } from 'native-base';



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
            alert("Please enter at least 6 characters")
            return;
        }
        if (this.state.password != this.state.confirmedPass) {
            alert("Passwords does not match")
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
         
          flexGrow: 2,
          paddingHorizontal: 20               
        }} >
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
          
          <Form>
                <Item floatingLabel>
                    <Label style={{color:'#ae0578'}}>email</Label>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{ color: '#032e5e' }}
                        onChangeText={(email) => this.setState({ email })}
                    />

                </Item>

                <Item floatingLabel>
                    <Label style={{color:'#ae0578'}}>password</Label>
                    <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{ color: '#032e5e' }}
                        onChangeText={(password) => this.setState({ password })}
                    />
                </Item>
                <Item floatingLabel>
                    <Label style={{color:'#ae0578'}}>confirm password</Label>
                    <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{ color: '#032e5e' }}
                        onChangeText={(confirmedPass) => this.setState({ confirmedPass })}
                    />
                </Item>           
                <Button 
                    style={{ marginTop: 60,
                             backgroundColor:'#032e5e'}}
                    full
                    primary
                    onPress={ () => this.signUpUser(this.state.email, this.state.password)}>
                    <Text style={{ color: '#d41998', fontWeight: 'bold', fontSize: 15}}> SIGN UP </Text>
                </Button>           
            </Form>
            
            <Button 
            style={{ marginTop: 30, 
                     backgroundColor:'#032e5e'}}
             full
             primary
             onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text style={{ color: '#d41998', fontWeight: 'bold', fontSize: 15}}>ALREADY HAVE AN ACCOUNT? SIGN IN </Text>       
          </Button>
          
        </View>
      </View>

    );
}
}
