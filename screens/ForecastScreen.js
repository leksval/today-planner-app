import React, { Component } from 'react';
import { FlatList, Text, Button, View, StyleSheet, Animated} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ForecastCard from '../components/ForecastCard';
export default class ForecastScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastData: this.props.navigation.state.params.forecast,
    };
  }
  render() {
    return (
      <View>
         <FlatList
          data={this.state.forecastData.list}
          style={{ marginTop: 20 }}
          keyExtractor={item => item.dt_txt}
          renderItem={({ item }) => (
            <ForecastCard
              detail={item}
              location={this.state.forecastData.city.name}
            />
          )}
        />
        <Button onPress={() => this.props.navigation.navigate('HomeScreen')} title="Home"/>
      </View>
    )
  }
}