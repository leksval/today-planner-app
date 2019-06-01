import React from 'react';
import { StyleSheet, Text,Image, TouchableHighlight, HeaderBarItem, FlatList, Button, View, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Label } from 'native-base';
import Weather from '../components/Weather';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
     this.state = {
      latitude: 0,
      longitude: 0,
      forecast: [],
      aqiData: 0,
      isLoading: true,
      temperature: 0,
      weatherCondition: null,
      error: '',
    };
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
componentDidMount() {
    this.getLocation();
    this.getAirQ();
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(prevState => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
          () => {
            this.getCurrentWeather();
            this.getForecast();
          }
        );
      },
      error => this.setState({ forecast: error.message }),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
  }
  getCurrentWeather() {
     let url =
      'http://api.openweathermap.org/data/2.5/weather?lat=' +
      this.state.latitude +
      '&lon=' +
      this.state.longitude +
      '&units=metric&appid=c6123982940d7b0a7f2e210ce3b0dd95';
    fetch(url)
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false});});
  }
  getForecast() {
    let url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
      this.state.latitude +
      '&lon=' +
      this.state.longitude +
      '&units=metric&appid=c6123982940d7b0a7f2e210ce3b0dd95';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState((prevState, props) => ({
          forecast: data,
        }));
      });
  }
  getAirQ() {
    this.setState({ loaded: false });
    fetch('https://api.airvisual.com/v2/nearest_city?key=XmM3xQQDkokdEJfLh')
      .then(response => response.json())
      .then(data => {
        this.setState({
          aqiData: data.data.current.pollution.aqius,
          loaded: true,
        });
        console.log(this.state.aqiData);
      });
  }
  airQualityStatus(aqiVal) {
    let answer;
    if (aqiVal <= 60) {
      answer = 'Get outside and breathe that fresh air!';
    } else if (aqiVal > 60 && aqiVal < 130) {
      answer = 'Take it easy, the air qaulity is less than ideal!';
    } else if (aqiVal > 130 && aqiVal < 200) {
      answer = 'It is getting bad, stay inside!';
    } else {
      answer = "Don't even bother breathing...";
    }
    return answer;
  }
render() {
  const { isLoading, weatherCondition, temperature, forecast, aqiData } = this.state;
    var smog = this.airQualityStatus(aqiData);
    return (
      <React.Fragment>
        <Container style={styles.container}>
            <Text>Home screen</Text>
            <Button title="PlanButton" onPress={() => this.props.navigation.navigate('Plan')}><Text>Plan screen</Text></Button><Text>{"\n"}</Text>
            <Button title="ForecastButton" onPress={() => this.props.navigation.navigate('Forecast')}><Text>Forecast screen</Text></Button>
            <Button title="Send Poll" onPress={() => this.props.navigation.navigate('Poll')}><Text>Forecast screen</Text></Button>
        </Container>
         <View style={styles.container}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Fetching The Weather</Text>
            </View>
          ) : (
            <Weather weather={weatherCondition} temperature={temperature} smog={smog} forecast={forecast} />
           )}
           {isLoading ? (
             <TouchableOpacity>
          <Text style={styles.buttonno}></Text>
        </TouchableOpacity>
              ) : (
          <View>
         <TouchableOpacity onPress={() => this.props.navigation.navigate('Forecast', {forecast})}>
          <Text style={styles.buttonfor}>Forecast for next 5 days</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Polls')}>
          <Text style={styles.buttonfor}>Polls</Text>
        </TouchableOpacity>
        </View>
        )}
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
loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  loadingText: {
    fontSize: 30
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
  buttonno: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  }
});