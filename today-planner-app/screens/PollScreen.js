import React from 'react';
import { StyleSheet, Text,Image, TouchableHighlight, FlatList, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import PollData from './components/PollData';
import Communications from 'react-native-communications';



export default class PollScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        arrayHolder: [],
        title: " ",
        options: " ",
        multi: " ",
        idpoll: '',
        pollData: []
     }
}
  joinData = () => {
    this.array.push({id : this.state.idpoll}); 
    this.setState({ arrayHolder: [...this.array] })
  }
 sendPoll(title, options, multi) {
   let url ='https://www.strawpoll.me/api/v2/polls{"title": '+{title}+',options:['+{options}+'],multi:'+{multi}+'';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          idpoll: data.id,
         }),
          () => {
            this.joinData();
          }
          );
  },
      error => this.setState({}), 
      {});
  }
   FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }
  GetItem(item) {
 
    Alert.alert(item);
  }
   getPolls(idpoll) {
    let url =
      'https://www.strawpoll.me/api/v2/polls/'+{idpoll}+'';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState((prevState, props) => ({
          polldata: data,
        }));
      });
  }
static navigationOptions = () => ({
    title: 'TO-DAY',  
    headerTintColor: '#ae0578',
    headerStyle: {
      backgroundColor: '#032e5e'
    },
    headerLeft:
    <TouchableHighlight onPress={() => this.props.navigation.navigate('Home')}>
    <Image 
        style={{flex:1, height: 100, width: 100}}
        source={require('../assets/icon.png')} 
        resizeMode="contain" />
 </TouchableHighlight>
  //  headerRight:
  //    <HeaderBarItem to='FeedbackScreen' title='Feedback' />
      
  });


render() {
    return (
         <React.Fragment>
         <View style={styles.container}>
          <Text style={styles.buttonfor}>Fill all and press "Create poll"</Text>
           <TextInput
          style={{height: 40}}
          placeholder="Type the question"
          onChangeText={(title) => this.setState({title})}
        />
          <TextInput
          style={{height: 40}}
          placeholder="Type answers like shown below"
          onChangeText={(options) => this.setState({options})}
        />
         <Text>"answer1","answer2"</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type true or false - multi choice"
          onChangeText={(multi) => this.setState({multi})}
        />
        <TouchableOpacity onPress={this.sendPoll(this.state.title, this.state.options, this.state.multi)} activeOpacity={0.7} style={styles.button} >
        <Text style={styles.buttonfor}> Create Poll </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress= {() => Communications.text('', 'Cześć,'+' prosze oddaj swój głos tutaj: https://www.strawpoll.me/'+this.props.idpoll)} style={styles.button} > 
        <Text style={styles.buttonfor}>Send invite</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getPolls()} activeOpacity={0.7} style={styles.button} > 
        <Text style={styles.buttonfor}> Get My Polls Data </Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.pollData.list}
          extraData={this.state.pollData}
          style={{ marginTop: 20 }}
          keyExtractor={item => item.dt_txt}
          renderItem={({ item }) => (
            <PollData
              detail={item}
              location={this.state.pollData.id}
            />
          )}
        />
        </View>
      </React.Fragment>
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
 buttonfor: {
    backgroundColor: 'purple',
    borderColor: 'black',
    borderWidth: 0,
    borderRadius: 0,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  },
});