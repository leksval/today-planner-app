import React, { Component } from 'react';
import { FlatList, Text, Button, View, StyleSheet, Animated} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Weather from './components/Weather';
import ForecastScreen from './screens/ForecastScreen';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      forecast: [],
      aqiData: {},
      isLoading: true,
      temperature: 0,
      weatherCondition: null,
      error: '',
    };
  }
  componentDidMount() {
    this.getLocation();
    this.getAirQ();
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          prevState => ({
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
          aqiData: data.data,
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
    const { isLoading, weatherCondition, temperature, forecast } = this.state;
    return (
      <React.Fragment>
         <View style={styles.container}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Fetching The Weather</Text>
             </View>
          ) : (
            <Weather weather={weatherCondition} temperature={temperature} />
           )}
<Button onPress={() => this.props.navigation.navigate('Forecast', {forecast})}      title="Forecast"/>
         </View>
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});

const TodayPlaner = createStackNavigator(
  {
    Home: HomeScreen,
    Forecast: ForecastScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(TodayPlaner);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}