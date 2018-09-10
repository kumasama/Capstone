import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AsyncStorage, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Button, Icon, ListItem} from 'react-native-elements';
import { Input, Card} from 'react-native-elements';
import Styles from './Styles';

class EstablishmentProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return(
			<View>
				<Text>This is the screen for establsihment profile</Text>
			</View>
		);
	}
}



export default EstablishmentProfileScreen;


