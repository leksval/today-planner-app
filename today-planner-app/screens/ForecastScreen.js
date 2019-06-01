import React from 'react';
import { StyleSheet, Text,Image, TouchableHighlight, FlatList, View, Animated} from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import ForecastCard from '../components/ForecastCard';


export default class ForecastScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastData: this.props.navigation.state.params.forecast,
    };

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
         <FlatList
          data={this.state.forecastData.list}
          style={{ marginTop: 20}}
          keyExtractor={item => item.dt_txt}
          renderItem={({ item }) => (
            <ForecastCard
              detail={item}
              location={this.state.forecastData.city.name}
            />
          )}
        />
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