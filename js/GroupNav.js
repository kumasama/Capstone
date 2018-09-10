import React, { Component} from 'react';
import { 
    AsyncStorage, 
    StyleSheet, 
    Text, 
    View,
    ScrollView
} from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { 
    Icon,
    Card,
    Divider,
    SearchBar,
    ListItem,
    Button,
} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GroupCreateScreen from './Group_Create';
import GroupAboutScreen from './Group_About';
import GroupInfoScreen from './Group_Info';
import Styles from './Styles';

class GroupManageScreen extends React.Component {
    
    static navigationOptions = {
        tabBarLabel: 'Manage',
    }

    constructor(props) {
        super(props);
        this.state = {
            user_id: '-1',
            groups: [],
            manage: []
        };
    }

    async componentWillMount() {
        AsyncStorage.getItem('user_id').then((value) => this.setUserId(value));
    }

    setUserId(user_id) {
        //this.setState({user_id}, ()=>{ console.log("setState completed", this.state) });
        this.setState({user_id}, ()=>{ this.getData() });
    }

    async componentDidMount() {
        if(!Number(this.state.user_id)>0) {
            this.props.navigation.navigate("Auth");
        }
    }

    formEncode(obj) {
		let str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
	}

    getData() {
		let requestObject = {
			backpacker_id: this.state.user_id,
        };
		fetch('http://192.168.254.200/capstone/group_fetch.php', {
			method: 'POST',
			headers: { "Content-type": "application/x-www-form-urlencoded"},
			body: this.formEncode(requestObject)
		}).then(response => response.text())
		.then((text) => {
            let obj = JSON.parse(text);
            //console.log(obj);
            this.setState({manage: obj.manage, groups: obj.groups});
		}).catch(error => console.error(error));
    }

    render() {
        return(
            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#e9e9ef'}}>
                <Card containerStyle={styles.cardContainer}>
                    <ListItem
                        containerStyle={styles.listItemStyle}
                        key='create_group'
                        title='Create Group'
                        rightIcon = {<Icon name='chevron-small-right' type="entypo" color="grey"/>}
                        leftIcon ={<Icon name='plus-square' type="feather" />}
                        onPress = {() => this.props.navigation.navigate('GroupCreate')}
                    />
                </Card>
                {this.state.manage.length > 0 && 
                <Card containerStyle={styles.cardContainer}>
                    <View style={{margin: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>GROUPS YOU MANAGE</Text>
                    </View>
                    <Divider style={{ height: 3, backgroundColor: '#e9e9ef' }} />
                    {
                        this.state.manage.map((l) => (
                            <ListItem
                                containerStyle={styles.listItemStyle}
                                key={l.id}
                                title={l.name}
                                subtitle={l.about_members}
                                leftAvatar={{size:'medium', rounded:true, source: require('../assets/images/group_icon.png') }}
                                onPress={() => this.props.navigation.navigate('GroupAbout', {group_info: l})}
                            />
                        ))
                    }
                </Card>
                }
                {this.state.groups.length > 0 && 
                <Card containerStyle={styles.cardContainer}>
                    <View style={{margin: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>GROUPS YOU MANAGE</Text>
                    </View>
                    <Divider style={{ height: 3, backgroundColor: '#e9e9ef' }} />
                    {
                        this.state.groups.map((l) => (
                            <ListItem
                                containerStyle={styles.listItemStyle}
                                key={l.id}
                                title={l.name}
                                subtitle={l.about_members}
                                leftAvatar={{size:'medium', rounded:true, source: require('../assets/images/group_icon.png') }}
                                onPress={() => this.props.navigation.navigate('GroupAbout', {group_info: l})}
                            />
                        ))
                    }
                </Card>
                }
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10
    },
    listItemStyle: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10
    }
});

class GroupDiscoverScreen extends React.Component {

    static navigationOptions = {
        tabBarLabel: 'Discover',
    }
    
    render() {
        return(
            <View style={Styles.container}>
                <Text>Welcome to Group Discover Screen</Text>
            </View>
        );
    }
}


const GroupTopNav = createMaterialTopTabNavigator({
    GroupManage: GroupManageScreen,
    GroupDiscover: GroupDiscoverScreen,
},
{  
    swipeEnabled : false,
    tabBarOptions: {
        labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
        },
        style: {
            backgroundColor: '#e57373',
            marginTop: 25,
        },
        indicatorStyle: {
			backgroundColor: '#ffffff'
		}
    }
}
);

const GroupNav = createStackNavigator({
    GroupManageDiscover:  {
        screen: GroupTopNav,
        navigationOptions: {
            header: null,
            title: 'No title'
        }
    },
    GroupCreate: { 
        screen: GroupCreateScreen,
        navigationOptions: {
            title: 'Create New Group'
        }
    },
    GroupAbout: GroupAboutScreen,
    GroupInfo: GroupInfoScreen
},
{
	navigationOptions: {
		headerStyle: {
		  backgroundColor: '#e57373',
		},
		headerTintColor: '#fff',
   		headerTitleStyle: {
      		fontWeight: 'bold',
		},
	}
})

export default GroupNav;

