import React from 'react';
import { StyleSheet, Text,Image, TouchableHighlight} from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label, TextInput } from 'native-base';


export default class PlanScreen extends React.Component {
  constructor(props) {
    super(props)
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
        <Container style={styles.container}>
            <Text>Plan screen</Text><Text>{"\n"}</Text>
            <Button title="NewEventButton (przerobić na floating '+' button)" onPress={() => this.props.navigation.navigate('NewEvent')}><Text>NewEvent screen</Text></Button><Text>{"\n"}</Text>
            <Button title="EventButton" onPress={() => this.props.navigation.navigate('Event')}><Text>Event screen</Text></Button>
        </Container>
    );
}
}

// render(){
//     return (
//         <Container style={styles.container}>
//           <CalendarList
//           // Initially visible month. Default = Date()
//           current={Date()}
//           // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
//           minDate={Date()}
//           // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
//           maxDate={'2030-05-30'}
//           // Handler which gets executed on day press. Default = undefined
//           onDayPress={(day) => {console.log('selected day', day)}}
//           // Handler which gets executed on day long press. Default = undefined
//           onDayLongPress={(day) => {console.log('selected day', day)}}
//           // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
//           monthFormat={'MMMM yyyy'}
//           // Handler which gets executed when visible month changes in calendar. Default = undefined
//           onMonthChange={(month) => {console.log('month changed', month)}}
//           // Hide month navigation arrows. Default = false
//           hideArrows={true}
//           // Replace default arrows with custom ones (direction can be 'left' or 'right')
//           renderArrow={(direction) => (<Arrow />)}
//           // Do not show days of other months in month page. Default = false
//           hideExtraDays={true}
//           // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
//           // day from another month that is visible in calendar page. Default = false
//           disableMonthChange={true}
//           // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
//           firstDay={1}
//           // Hide day names. Default = false
//           hideDayNames={true}
//           // Show week numbers to the left. Default = false
//           showWeekNumbers={true}
//           horizontal={true}
//           pagingEnabled={true}
//           theme={{
//             arrowColor: 'white',
//             'stylesheet.calendar.header': {
//               week: {
//                 marginTop: 5,
//                 flexDirection: 'row',
//                 justifyContent: 'space-between'
//               }
//             }
//           }}
//         />
//         </Container> 
//     )
// }
// }

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
},
});