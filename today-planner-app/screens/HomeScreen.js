import React from 'react';
import { StyleSheet, Text} from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';



export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

}



render() {
    return (
        <Container style={styles.container}>
            <Text>Home screen</Text>
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