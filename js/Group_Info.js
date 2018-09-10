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
    SearchBar,
    ListItem,
    Button,
    Divider
} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

class GroupInfoScreen extends React.Component {

    static navigationOptions = {
        title: 'Group Info'
    };

    constructor(props) {
        super(props);
        this.state = {
            group_name: this.props.navigation.getParam('title', 'Some Group')
        };
    }


    render() {
       return (
           <ScrollView>
               <Card containerStyle={{margin: 0}}>
                    <ListItem
                        containerStyle={{padding: 0}}
                        titleStyle={{fontWeight: 'bold', fontSize: 24}}
                        key='group_info_title'
                        title={this.state.group_name}
                        subtitle='Closed Group'
                        leftAvatar={{size:'medium', rounded:true, source: require('../assets/images/group_icon.png') }}
                    />
               </Card>
               <Divider style={{ height: 10, backgroundColor: '#e9e9ef' }} />
               <Card containerStyle={{margin: 0}}>
               </Card>
            </ScrollView>
       )
   }

}

export default GroupInfoScreen;

