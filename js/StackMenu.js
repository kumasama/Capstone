import React from 'react';
import { 
	Alert,
	AsyncStorage,
	ScrollView, 
	StyleSheet, 
	Text, 
	View, 
	FlatList,
	TouchableHighlight,
	Picker
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { 
	Badge,
	Button,
	Card,
	CheckBox ,
	Input,
	Icon, 
	ListItem
} from 'react-native-elements';
import { Font } from 'expo';
import DatePicker from 'react-native-datepicker';
import EstablishmentProfileScreen from './Establishment_Profile';
import EstablishmentSearchScreen from './Establishment_Search';

const menuList = [
{
	name: 'Appointments',
	route: 'Home'
},
{
	name: 'Test Forms',
	route: 'TestForm'
}, 
{
	name: 'Async Storage Example',
	route: 'AsyncStorage'
},
{
	name: 'Business Establishments',
	route: 'EstablishmentSearch'
}
];

const suggestList = [
	{
		name: 'Shared Itineraries',
		route: '',
		key: 'sList1',
		icon: {
			name: 'archive',
			type: 'evilicon',
		}
	},
	{
		name: 'Business Establishments',
		route: 'EstablishmentSearch',
		key: 'sList2',
		icon: {
			name: 'shop',
			type: 'materialicons',
		}
	},
	{
		name: 'Itinerary',
		route: '',
		key: 'flist1',
		icon: {
			name: 'calendar-range' ,
			type: 'material-community'
		}
	},
	{
		name: 'Trip Plans',
		route: '',
		key: 'flist2',
		icon: {
			name: 'calendar' ,
			type: 'feather'
		}
	},
	{
		name: 'Groups',
		route: 'Group',
		key: 'group_nav2',
		icon: {
			name: 'users',
			type: 'feather'
		}
	}
];

const settingList = [
{
	name: 'Help Center',
	route: '',
	key : 'help_center',
	icon: {
		name: 'help-circle' ,
		type: 'feather'
	}
},
{
	name: 'Account Settings',
	route: '',
	key : 'account_settings',
	icon: {
		name: 'settings' ,
		type: 'feather'
	}
}
,
{
	name: 'Terms & Policies',
	route: '',
	key : 'terms_policies',
	icon: {
		name: 'clipboard' ,
		type: 'feather'
	}
}
,
{
	name: 'Report a Problem',
	route: '',
	key : 'problem_report',
	icon: {
		name: 'bug' ,
		type: 'font-awesome'
	}
}
];

class SubMenu1Screen extends React.Component {

	static navigationOptions = {
		header: null,
		title: 'NO TITLE'
	}

	constructor(props) {
		super(props);
		this.state = {
			fontLoaded: false,
			user_id: '-1'
		}
	}

	logout() {
		AsyncStorage.setItem('user_id', '-1');
		this.props.navigation.navigate('Auth');
	}

	componentWillMount() {
		AsyncStorage.getItem('user_id').then((value) => this.setUserId(value) );
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
			<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
				<View>
				{
					menuList.map((l) => (
						<ListItem
							key={l.name}
							title={l.name}
							onPress = {() => this.props.navigation.navigate(l.route)}
							rightIcon = {<Icon name='chevron-small-right' type="entypo" color="grey"/>}
						/>
					))
				}
				</View>
				<View style={{marginBottom: 10}}>
					<ListItem
						key={'my_profile'}
						title={'Myles Jobette Empacis'}
						leftAvatar={{source: {uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}}
						subtitle={'username'}
						onPress={null}
						containerStyle={{borderStyle:'solid', borderBottomColor:'grey', borderBottomWidth: 1}}
						rightIcon = {<Icon name='settings' type='feather' color='grey' />}
					/>
				</View>
				<View style={styles.sListContainer}>
				{
					suggestList.map((l) => (
						<ListItem
							key={l.key}
							title={l.name}
							onPress = {() => this.props.navigation.navigate(l.route)}
							leftIcon = {<Icon name={l.icon.name} type={l.icon.type} color="black"/>}
							rightIcon = {<Icon name='chevron-small-right' type="entypo" color="grey"/>}
						/>
					))
				}
				</View>
				<View style={styles.sListContainer}>
					<View style={styles.menuLabelContainer}>
						<Text style={styles.menuLabel}>HELP & SETTINGS</Text>
					</View>
				{
					settingList.map((l) => (
						<ListItem
							key={l.key}
							title={l.name}
							onPress = {() => this.props.navigation.navigate(l.route)}
							leftIcon = {<Icon name={l.icon.name} type={l.icon.type} color="black"/>}
							rightIcon = {<Icon name='chevron-small-right' type="entypo" color="grey"/>}
						/>
					))
				}
						<ListItem
							key='logout'
							title='Logout'
							onPress = { () => this.logout()}
							leftIcon = {<Icon name='log-out' type='feather' color="black"/>}
							rightIcon = {<Icon name='chevron-small-right' type="entypo" color="grey"/>}
						/>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 25, 
	},
	sListContainer: {
		marginBottom: 10
	},
	menuLabel: {
		marginLeft: 5,
		color: 'grey',
	},
	menuLabelContainer: {
		backgroundColor: '#ffffff',
	},
	iconStyle: {
		width: 30,
	}
});



class SubMenu2Screen extends React.Component {

	static navigationOptions = {
		title: 'Subscene 2'
	}

	render() {
		return(
			<View styles={{marginTop: 25}}>
				<Text>You are on SubMenu 2</Text>
			</View>
		);
	}
}


class SubMenu3Screen extends React.Component {
	render() {
		return(
			<Text>You are on SubMenu 3</Text>
		);
	}
}

class TestFormScreen extends React.Component {

	static navigationOptions = {
		title: "Forms Test"
	}

	constructor(props) {
		super(props);
		this.state = { 
			errMsg: "" ,
			name: "",
			affinity: "",
			names: [],
			tname: "",
			date: '',
			time: '',
			language: '',
		};
	}

	formEncode(obj) {
		let str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
	}

	addName() {
		
		let names = this.state.names;
		names.push({name:this.state.sampleText});
		this.setState({names: names});
	}

	componentDidMount(){
		AsyncStorage.getItem('name').then( (value) => this.setState({tname: value}));
		this.updateList();
	}

	updateList() {
		fetch("http://192.168.254.200/capstone/user_fetch.php")
		.then(response => response.text())
		.then((text) => {
			let obj = JSON.parse(text);
			this.setState({names: obj.result});
		}).catch(error => console.error(error));
	}

	addUser() {
		let requestObject = {
			name: this.state.name,
			affinity: this.state.affinity
		}
		this.setState({name: '', affinity: '',});
		fetch('http://192.168.254.200/capstone/user_add.php', {
			method: 'POST',
			headers: { "Content-type": "application/x-www-form-urlencoded"},
			body: this.formEncode(requestObject)
		}).then(response => response.text())
		.then((text) => {
			this.updateList();
		}).catch(error => console.error(error));

		//this.updateList();
	}

	confirmDelete(id) {
		Alert.alert(
			'Confirmation',
			'Are you sure you want to delete item ' + id,
			[
			  {text: 'Cancel'},
			  {text: 'OK', onPress: () => this.deleteItem(id)},
			],
			{ cancelable: false }
		  )
	}

	deleteItem(id) {
		let requestObject = {
			id: id
		}
		fetch('http://192.168.254.200/capstone/user_delete.php', {
			method: 'POST',
			headers: { "Content-type": "application/x-www-form-urlencoded"},
			body: this.formEncode(requestObject)
		}).then(response => response.text())
		.then((text) => {
			this.updateList();
		}).catch(error => console.error(error));
	}

	render() {
		return(
			<View>
				<Card>
					<Text>Select Day</Text>
					<Picker
						selectedValue={this.state.language}
						style={{ borderColor: 'grey',borderWidth: 1, height: 50, width: 300 }}
						onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
					>
						<Picker.Item label="Java" value="java" />
						<Picker.Item label="JavaScript" value="js" />
					</Picker>
				</Card>
				<Card>
				<Input 
						placeholder="Name"
						value={this.state.name}
						ref = { input => this.input = input }
						onChangeText={ (name) => this.setState({name})}
						containerStyle={{marginBottom: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
					/>
					<Input 
						placeholder="Affinity"
						value={this.state.affinity}
						ref = { input => this.input2 = input }
						onChangeText={ (affinity) => this.setState({affinity})}
						containerStyle={{marginBottom: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
					/>
					<Button
						small
						icon={{name: 'squirrel', type: 'octicon'}}
						title='Add'
						onPress = {() => this.addUser()} 
					/>
				</Card>
				<Card>
						{
							this.state.names.map((l) => (
								<ListItem
									key={l.id}
									title={l.name}
									subtitle={l.affinity}
									onPress = {() => this.confirmDelete(l.id)}
									badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { backgroundColor: 'transparent', marginTop: -20 } }}
								/>
							))
						}
				</Card>
			</View>
		);
	}
}

class AsyncStorageExample extends React.Component {
	
	static navigationOptions = {
		title: "Async Storage Example"
	}
	
	constructor(props) {
		super(props);
		this.state = {
			name: ""
		}
	}

	componentDidMount() {
		AsyncStorage.getItem('name').then((value) => this.setState({ 'name': value }));
	}

	setName(name) {
		this.setState({name});
		AsyncStorage.setItem('name', name);
	}

	render() {
		return(
			<View>
				<Card>
					<Input 
						onChangeText={ (name) => this.setName(name)}
					/>
					<Text style={{marginTop: 50}}>{this.state.name}</Text>
				</Card>
			</View>
		);
	}
}

const StackMenu = createStackNavigator(
{
	SubMenu1: SubMenu1Screen,
	SubMenu2: SubMenu2Screen,
	SubMenu3: SubMenu3Screen,
	TestForm: TestFormScreen,
	AsyncStorage: AsyncStorageExample,
	EstablishmentSearch: EstablishmentSearchScreen,
	EstablishmentProfile: EstablishmentProfileScreen,
},
{
	swipeEnabled : false,
	navigationOptions: {
		headerStyle: {
		  backgroundColor: '#e57373',
		},
		headerTintColor: '#fff',
   		headerTitleStyle: {
      		fontWeight: 'bold',
		},
	}
}
);

export default StackMenu;


