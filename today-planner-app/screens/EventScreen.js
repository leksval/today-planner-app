import React from 'react';
import { StyleSheet, Text,Image, TouchableHighlight} from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';



export default class EventScreen extends React.Component {
  constructor(props) {
    super(props)

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
            <Text>Event screen</Text><Text>{"\n"}</Text>
            <Button title="FilesButton" onPress={() => this.props.navigation.navigate('Files')}><Text>Files screen</Text></Button>
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