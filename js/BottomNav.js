import React, { Component} from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackMenu from './StackMenu';
import Styles from './Styles';

import GroupNav from './GroupNav';
import NotificationScreen from'./Notification';

class HomeScreen extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			user_id: ''
		};
		
	}
	
	componentWillMount() {
		AsyncStorage.getItem('user_id').then((value) => this.setUserId(value) );
	}
	
	componentDidMount() {
		
	}
	
	setUserId(id) {
		if(id !== null) {
			AsyncStorage.setItem('user_id', id.toString());
			this.setState({user_id: id});
		}
		else
			AsyncStorage.setItem('user_id', "-1");
	}
	
	render() {
		return(
			<View style={Styles.container}>
				<View>
					<Text>You are now in home screen</Text>
					<Text>Your id is: {this.state.user_id}</Text>
					<Button
						title= "Go to SubScreen2"
						onPress= {() => this.props.navigation.navigate("SubMenu2")} 
					/>
				</View>
			</View>
		);
	}
}

class GroupScreen extends React.Component {
	render() {
		return(
			<View style={Styles.container}>
			<Text>You are now in group screen</Text>
			<Icon name='rowing' />
			</View>
		);
	}
}

const BottomNav = createBottomTabNavigator(
{
	Home: HomeScreen,
	Group: GroupNav,
	Notification: NotificationScreen,
	Menu: StackMenu,
},
{
	navigationOptions: ({ navigation }) => ({
		tabBarIcon: ({ focused, tintColor }) => {
			const { routeName } = navigation.state;
			let iconName;
			if(routeName == 'Home') {
				iconName = `ios-home${focused ? '' : '-outline'}`;
			} else if (routeName === 'Group') {
				iconName = `ios-people${focused ? '' : '-outline'}`;
			} else if (routeName === 'Menu') {
				iconName = `ios-menu${focused ? '' : '-outline'}`;
			} else if (routeName === 'Notification') {
				iconName = `ios-notifications${focused ? '' : '-outline'}`;
			}
			
			return <Ionicons name={iconName} size={25} color={tintColor} />;
		},
	}),
	tabBarOptions: {
		activeTintColor: 'tomato',
		inactiveTintColor: 'gray',
		showLabel: false,
	}
}
);

export default BottomNav;
