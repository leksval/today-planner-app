import React from 'react';
import { StyleSheet, Text,Image, TouchableHighlight} from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';



export default class PlanScreen extends React.Component {
  constructor(props) {
    super(props)

}
static navigateToHome=() => {
    this.props.navigation.navigate('Home')
}

static navigationOptions = () => ({ 
    headerTintColor: '#ae0578',
    headerStyle: {
      backgroundColor: '#032e5e'
    },
  
  headerRight:
  <Image 
      style={{flex:1, height: 100, width: 100, marginRight: 10}}
      source={require('../assets/iconToday.png')} 
      resizeMode="contain" />
  });


render() {
    return (
        <Container style={styles.container}>
            <Text>Plan screen</Text><Text>{"\n"}</Text>
            <Button title="NewEventButton (przerobić na floating '+' button)" onPress={() => this.props.navigation.navigate('NewEvent')}><Text>Event Calendar screen</Text></Button><Text>{"\n"}</Text>
            <Button title="EventButton" onPress={() => this.props.navigation.navigate('Event')}><Text>Event screen</Text></Button><Text>{"\n"}</Text>
            <Button title="CreateEventButton" onPress={() => this.props.navigation.navigate("CreateEvent")}><Text>Create an Event</Text></Button>
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