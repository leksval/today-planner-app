import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';

export default class PollData extends Component {
  	render() {
		return (
			<Card containerStyle={styles.card}>
				<Text style={styles.notes}>Poll Id: {this.props.id}</Text>
				<View style={{flexDirection:'row', alignItems:'center'}}>
				</View>			
				<View style={{flexDirection:'row', justifyContent:'space-between'}}>
					<Text style={styles.notes}>Title: {this.props.title}</Text>
          <Text style={styles.notes}>Answers: {this.props.options}</Text>
          <Text style={styles.notes}>Votes: {this.props.votes}</Text>
				</View>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	card:{
		backgroundColor:'rgba(56, 172, 236, 1)',
		borderWidth:1,
		borderRadius:1
	},
	notes: {
		fontSize: 20,
		color:'#fff',
		textTransform:'capitalize'
	}
});