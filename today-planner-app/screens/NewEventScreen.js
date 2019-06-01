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
  Image
} from 'react-native';
import XDate from 'xdate';
import {ExpandableCalendar, AgendaList, CalendarProvider} from 'react-native-calendars';
import firebase from 'firebase';

const START_DATE = XDate().toString('yyyy-MM-dd');
var items = [
  {title: '2019-06-01', data: [{hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'}, {hour: '2pm', duration: '1h', title: 'Deep Streches'}, {hour: '3pm', duration: '1h', title: 'Private Yoga'}]},
  {title: '2019-06-02', data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}]},
  {title: '2019-06-03', data: [{}]},
];


items.push({title: "2019-06-04", data: [{hour: "3", duration: "6", title: "lole" + " lole2"}]})

export default class ExpandableCalendarScreen extends Component {
//   state = {
//     userId: firebase.auth().currentUser.uid, 
//     items: [],
// };

// constructor() {
//     super();
//     this.database = firebase.database().ref(`${this.state.userId}`);
//     this.database.once('value', function (snapshot) {
//       console.log(snapshot.val())
//   })
// }


// getDataFromDatabase() {
//   console.log("are there elements?")
//   this.database = firebase.database().ref(`${this.state.userId}`);
//   this.database.once('value', function (snapshot) {
//       products = snapshot.val();
//       console.log("PLEASE FOR THE LOVE OF GOD" + products)
//       items = [];
//       if (products === null) return;
//       products.forEach(product => {
//           items.push({
//               title: product.date,
//               data: [{
//                 hour: product.hour,
//                 duration: product.duration,
//                 title: product.title + " " + product.place
//               }]
//           })
//       });
//   })

// }

// componentWillMount() {
//   this.getDataFromDatabase();
// }


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
      button: {label: 'info',  onPress: () => Alert.alert('show more')},
      onPress: () => Alert.alert(id)
    };

    return (
      <TouchableOpacity 
        onPress={props.onPress} 
        style={styles.item}
      >
        <View>
          <Text style={styles.itemHourText}>{props.hour}</Text>
          <Text style={styles.itemDurationText}>{props.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{props.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button title={props.button.label} onPress={props.button.onPress}/>
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
    const lightThemeColor = '#05468e';
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
          data={items}
          renderItem={this.renderItem}
          sections={this.getSections()}
        />
      </CalendarProvider>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 20, 
    backgroundColor: 'white', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e8ecf0', 
    flexDirection: 'row'
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
    alignItems: 'flex-end'
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
});