import React from 'react';
import { StyleSheet, Text,Image, TouchableHighlight, HeaderBarItem} from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';



export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

}
static navigateToHome=() => {
    this.props.navigation.navigate('Home')
}
static navigationOptions = () => ({
    title: 'TO-DAY',  
    headerTintColor: '#ae0578',
    headerStyle: {
      backgroundColor: '#032e5e'
    },
    headerLeft:
    <TouchableHighlight onPress={this.navigateToHome}>
    <Image 
        style={{flex:1, height: 100, width: 100}}
        source={require('../assets/icon.png')} 
        resizeMode="contain" />
 </TouchableHighlight>

  //  headerRight:

     // <HeaderBarItem to='Home' title='Feedback' />
      
  });


render() {
    return (
        <Container style={styles.container}>
            <Text>Home screen</Text>
            <Button title="PlanButton" onPress={() => this.props.navigation.navigate('Plan')}><Text>Plan screen</Text></Button><Text>{"\n"}</Text>
            <Button title="ForecastButton" onPress={() => this.props.navigation.navigate('Forecast')}><Text>Forecast screen</Text></Button>
        </Container>
    );
}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
},
});