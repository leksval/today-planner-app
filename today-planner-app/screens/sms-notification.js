import React, {Component} from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
 
import Communications from 'react-native-communications';
 
export default class App extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headingStyle}>Today Planner powiadomienia</Text>
        

        {/*To send the text message function(phoneNumber = null, body = null)*/}
        <TouchableOpacity 
          style = {styles.button}
          //numer zostawiony pusty, mozna ustalic staly, staly tekst wyswietlany w wiadomosci ale modyfikowalny 
          onPress={() => Communications.text('', 'Twój znajomy bierze udział w zbliżającym się wydarzeniu')}>
            <Text style={styles.text}>
              Wyślij wiadomość
            </Text>
        </TouchableOpacity>
 

      </View>
    );
  }
}
 
var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(253,253,253)',
    padding: 16,
  },
  headingStyle: {
    fontSize: 25,
    textAlign: 'center',
    padding: 30,
  },
  button: {
    justifyContent: 'center',
    width : 300,
    backgroundColor:"#307cae",
    marginTop : 20,
  },
  text: {
    fontSize: 18,
    textAlign : 'center',
    padding : 10,
    color : '#ffffff',
  },
});
