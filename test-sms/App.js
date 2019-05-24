

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import SendSMS from 'react-native-sms'
 
export default class App extends React.Component {
  someFunction() {
    SendSMS.send({
        //wyswietlany proponowany text
        body: 'TodayPlanner - Twój znajomy będzie organizował spotkanie',
        //numer odbiorcy
        recipients: ['0123456789'],
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true
    }, 	 (completed, cancelled, error) => {

		console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

	
    });
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity onPress={this.someFunction.bind(this)}>
        <View>
          <Image
            //We are showing the Image from online
            source={{
              uri:
                'https://aboutreact.com/wp-content/uploads/2018/09/sms.png',
            }}
            //You can also show the image from you project directory like below
            //source={require('./Images/sms.png')}
            style={styles.ImageStyle}
          />
          <Text style={styles.text}>Send SMS</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000',
  },
  text: {
    color: 'black',
    textAlign:'center',
    fontSize: 25,
    marginTop:16,
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'stretch',
  },
});
