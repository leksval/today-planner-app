import _ from 'lodash';
import React, {Component} from 'react';
import {
  Platform,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  Loading,
  ActivityIndicator,
  AppRegistry,

} from 'react-native';
import XDate from 'xdate';
import {ExpandableCalendar, AgendaList, CalendarProvider} from 'react-native-calendars';
import firebase from 'firebase';
import { FAB } from 'react-native-paper';

const START_DATE = XDate().toString('yyyy-MM-dd');
var items = []
// var items = [
//   {title: '2019-06-01', data: [{hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'}, {hour: '2pm', duration: '1h', title: 'Deep Streches'}, {hour: '3pm', duration: '1h', title: 'Private Yoga'}]},
//   {title: '2019-06-02', data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}]},
//   {title: '2019-06-03', data: [{}]},
// ];


// // items.push({title: "2019-06-04", data: [{hour: "3", duration: "6", title: "lole" + " lole2"}]})

export default class ExpandableCalendarScreen extends Component {
  state = {
    userId: firebase.auth().currentUser.uid, 
    items: [],
    loaded: false
};

constructor() {
    super();
    this.database = firebase.database().ref(`${this.state.userId}`);
    this.database.once('value', function (snapshot) {
  })
}

  getDataFromDatabase() {
    this.database = firebase.database().ref(`${this.state.userId}`);
    this.database.on('value', function (snapshot) {
        let ele = snapshot.val()
        if (ele == null){
          return
        }
        let products = Object.values(ele)
        items = []
        products.forEach(products => {
            items.push({
                title: products.date,
                data: [{
                  hour: products.hour,
                  duration: products.length,
                  title: products.title
                }]
            })
        });
        loaded = true
    })
  
  }
  
  componentDidMount() {
    this.getDataFromDatabase();
}

onDateChanged = (/**date, updateSource*/) => {
  // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
  // fetch and set data for date + week ahead
}
getSections() {
  const sections = _.compact(_.map(items, (item) => {
    return {title: item.title, data: item.data};
  }));
  return sections;

}

renderEmptyItem() {
  return (
    <View style={styles.emptyItem}>
      <Text style={styles.emptyItemText}>No Events Planned</Text>
    </View>
  );
}
  renderItem = ({item}) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    const id = item.title;
    const props = {
      hour: item.hour,
      duration: item.duration,
      title: item.title,
      button: {label: 'info', onPress: () => Alert.alert('show more')},
      onPress: () => Alert.alert(id)
    };

    return (
      <TouchableOpacity 
        onPress={props.onPress} 
        style={styles.item}
      >
        <View>
          <Text style={styles.itemHourText}>{props.hour}</Text>
          <Text style={styles.itemDurationText}>{props.duration} h</Text>
        </View>
        <Text style={styles.itemTitleText}>{props.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button color='#032e5e' title={props.button.label} onPress={props.button.onPress}/>
        </View>
      </TouchableOpacity>
    );
  }

  getMarkedDates = () => {
    const marked = {};
    items.forEach(item => {
      marked[item.title] = {marked: true};
    });
    return marked;
  }

  getTheme = () => {
    const themeColor = '#032e5e';
    const lightThemeColor = '#d41998';
    const disabledColor = '#a6acb1';
    const black = '#20303c';
    const white = '#ffffff';
    
    
    return {
      // arrows
      arrowColor: black,
      arrowStyle: {padding: 0},
      // month
      monthTextColor: black,
      textMonthFontSize: 16,
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: black,
      textDayHeaderFontSize: 12,
      textDayHeaderFontWeight: 'normal',
      // today
      todayBackgroundColor: lightThemeColor,
      todayTextColor: themeColor,
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontWeight: '500',
      textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: white,
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: white,
      disabledDotColor: disabledColor,
      dotStyle: {marginTop: -2},
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
    const style = {paddingLeft: 20, paddingRight: 20};
    if (!this.state.loaded){
      setTimeout(() => {this.setState({loaded: true})}, 15000)}
    return (
      <CalendarProvider date={START_DATE} onDateChanged={this.onDateChanged}>
        <ExpandableCalendar 
          firstDay={1}
          markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
          calendarStyle={style}
          theme={this.getTheme()}
          headerStyle={style}

        />
        <AgendaList
          minDate={'2012-05-10'}
          maxDate={'3019-05-30'}
          pastScrollRange={50}
          futureScrollRange={50}
          renderItem={this.renderItem}
          sections={this.getSections()}
        />
        <FAB
        style={styles.fab}
        icon="add"
        color ='white'
        onPress={() => this.props.navigation.navigate('CreateEvent')}
        />          
      </CalendarProvider>
      
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor:'#ae0578',
  },
  item: {
    padding: 20, 
    backgroundColor: 'white', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e8ecf0', 
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey', 
    fontSize: 12, 
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black', 
    marginLeft: 16, 
    fontWeight: 'bold', 
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1, 
    alignItems: 'flex-end',
    
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52, 
    justifyContent: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: '#e8ecf0' 
  },
  emptyItemText: {
    color: '#79838a',
    fontSize: 14
  }
})
