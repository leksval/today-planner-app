import React from 'react';
import {  Text, View, Image} from 'react-native';
import * as firebase from 'firebase';
import { Input, Item,  Label, Button } from 'native-base';
import { PROVIDER_GOOGLE } from 'react-native-maps';

export const provider = new firebase.auth.FacebookAuthProvider()

export default class SignInScreen extends React.Component {

  static navigationOptions = { title: 'Welcome', header: null};
  state = { email: '', password: '', errorMessage: null }




/*


  loginFB = () => {
    firebase.auth()
      .signInWithRedirect(provider)
      .then(({ user }) => {
        this.setState({ user: user });
        console.log(this.state.user.displayName);
        firebase
          .firestore()
          .collection("users")
          .add({
            username: this.state.user.displayName,
            isAdmin: false
          });
      });
};







  onSubmitFb = event => {
    this.props.firebase.auth
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: "todayplannersm@gmail.com",
          //email: socialAuthUser.additionalUserInfo.profile.email,
          roles: []
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch((error) => {
        console.log(error)
      })
 
    event.preventDefault();
  };

 
    


  onSubmitGo = () => {

  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('https://www.googleapis.com/auth/drive');
  firebase.auth().signInWithRedirect(provider);
  //add the code below to your previous lines
  firebase.auth().getRedirectResult().then(function(authData) {
      console.log(authData);
  }).catch(function(error) {
      console.log(error);
  });

  }






  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2343814272380107', { permissions: ['public_profile'] })

    if (type == 'success') {

      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => this.props.navigation.navigate('Home'))
      .catch((error) => {
        console.log(error)
      })
    }
  }

*/

  
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
                    <Label style={{color:'#ae0578'}}><Text color='#ae0578'>email</Text></Label>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{color:'#032e5e'}}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />
            </Item>
            <Item floatingLabel>
                    <Label style={{color:'#ae0578'}}>password</Label>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        style={{color:'#032e5e'}}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />
            </Item>
            
                <Button 
                    style={{ marginTop: 40,
                             backgroundColor:'#032e5e'}}
                    full
                    primary
                    onPress={this.handleLogin}>
                    <Text style={{ color: '#d41998', fontWeight: 'bold', fontSize: 15}}> SIGN IN </Text>
                </Button>          
                <Button 
                    style={{ 
                             backgroundColor:'#032e5e'}}
                    full
                    primary
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{ color: '#d41998', fontWeight: 'bold', fontSize: 15}}> DON'T HAVE AN ACCOUNT? SIGN UP </Text>
                </Button> 
                <Button 
                    style={{ 
                             backgroundColor:'#032e5e'}}
                    full
                    primary
                    onPress={this.loginFB}>
                    <Text style={{ color: '#d41998', fontWeight: 'bold', fontSize: 15}}> CONTINUE WITH FACEBOOK </Text>
                </Button> 
                <Button 
                    style={{ 
                             backgroundColor:'#032e5e'}}
                    full
                    primary
                    onPress={ this.onSubmitGo}>
                    <Text style={{ color: '#d41998', fontWeight: 'bold', fontSize: 15}}> CONTINUE WITH GOOLGE </Text>
                </Button> 
            
        </View>
      </View>
    )
  }
}

