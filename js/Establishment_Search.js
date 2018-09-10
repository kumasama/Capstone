import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AsyncStorage, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Button, Icon, ListItem} from 'react-native-elements';
import { SearchBar, Input, Card} from 'react-native-elements';
import Styles from './Styles';

class EstablishmentSearchScreen extends React.Component {

	static navigationOptions = {
		title: "Business Establishments",
	}

	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	render() {
		return(
			<ScrollView>
				<SearchBar
					platform='android'
					placeholder='Search' 
					onChangeText={(search) => console.log("You search for: " + search)}
					onClear={() => console.log("You cleared the text")}
					placeholder='Type Here...'
					cancelButtonTitle={null}
				/>
				<Card
					image={{ uri: 'http://192.168.254.200/capstone/images/sample.jpg'}}
				>
					<Text style={{marginBottom: 10}}>
						The idea with React Native Elements is more about component structure than actual design.
					</Text>
				</Card>
				<Text>This is the establishment discover screen</Text>
				<Button 
					title="Go to establishment profile"
					onPress = {() => this.props.navigation.navigate('EstablishmentProfile')}
				/>
			</ScrollView>
		);
	}
}

export default EstablishmentSearchScreen;


