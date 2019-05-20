
import React, {Component} from 'react';
import { FlatList, Text, Button, View, Header } from 'react-native';
import ForecastCard from './components/ForecastCard';

export default class App extends React.Component  {

	constructor(props){
		super(props);
		this.state = {
			latitude: 0,
			longitude: 0,
			forecast: [],
      aqiData: {},
			error:'',
      loaded: false,
		};
	}
	componentDidMount(){
		this.getLocation();
    this.getAirQ();
  }
	getLocation(){
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState(
					(prevState) => ({
					latitude: position.coords.latitude, 
					longitude: position.coords.longitude
					}), () => { this.getWeather(); }
				);
			},
			(error) => this.setState({ forecast: error.message }),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
		);
	}
	getWeather(){
		let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=c6123982940d7b0a7f2e210ce3b0dd95';
		fetch(url)
		.then(response => response.json())
		.then(data => {
			this.setState((prevState, props) => ({
				forecast: data
			}));
		})
	}
 getAirQ() {
    this.setState({ loaded: false });
    fetch("https://api.airvisual.com/v2/nearest_city?key=XmM3xQQDkokdEJfLh")
      .then(response => response.json())
      .then(data => {
        this.setState({
          aqiData: data.data,
          loaded: true
        });
        console.log(this.state.aqiData);
      });
  }
  airQualityStatus(aqiVal) {
    let answer;
    if (aqiVal <= 60) {
      answer = "Get outside and breathe that fresh air!";
    } else if (aqiVal > 60 && aqiVal < 130) {
      answer = "Take it easy, the air qaulity is less than ideal!";
    } else if (aqiVal > 130 && aqiVal < 200) {
      answer = "It is getting bad, stay inside!";
    } else {
      answer = "Don't even bother breathing...";
    }
    return answer;
  }
	render() {
		return (
    <React.Fragment>
    <View>
      <Text> "Jakosc powietrza:"+
      </Text>
    </View>
     <FlatList data={this.state.forecast.list} style={{marginTop:20}} keyExtractor={item => item.dt_txt} renderItem={({item}) => <ForecastCard detail={item} location={this.state.forecast.city.name} />} /> 
    </React.Fragment> 
  	);
	}
}