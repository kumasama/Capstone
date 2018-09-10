import React, { Component} from 'react';
import { 
    AsyncStorage, 
    StyleSheet, 
    Text, 
    View,
    ScrollView
} from 'react-native';
import { HeaderBackButton, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { 
    Avatar,
    Icon,
    Card,
    SearchBar,
    ListItem,
    Button,
    Divider,
} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    groupTitleContainer: {
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    memberAvatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        flexDirection: 'row'
    },
    avatarContainerStyle: {
        marginRight: 3
    },
    groupTitle: {
        color: 'black',
        fontSize: 30,
        textAlign: 'center'
    },
    groupSubtitle: {
        color: 'grey',
        fontSize: 12
    },
    cardLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8
    }
});


class GroupAboutScreen extends React.Component {

    
    static navigationOptions = ({navigation}) => {
        let g = navigation.getParam('group_info');
        return {
            title: g.name,
            headerLeft: (<HeaderBackButton  tintColor='#ffffff' onPress={()=>{navigation.popToTop()}} />),
            headerRight: (<Icon  
                    color='#ffffff' 
                    containerStyle={{marginRight: 10}} 
                    name='info' 
                    type='simple-line-icon' 
                    onPress={ () => navigation.push('GroupInfo', {group_info: navigation.getParam('group_info')})} 
                />)
        }
    }  

    constructor(props) {
        super(props);
        this.state = {
            group: this.props.navigation.getParam('group_info', null),
        };
    }

    render() {
        const { group } = this.state;
        return (
            <ScrollView>
                <Card containerStyle={{margin: 0}}>
                    <View style={styles.groupTitleContainer}>
                        <Text style={styles.groupTitle}>{group.name}</Text>
                    </View>
                    <View style={styles.groupTitleContainer}>
                        <Text style={styles.groupSubtitle}>{group.about1 + " - " + group.about_members}</Text>
                    </View>
                    <View style={styles.memberAvatarContainer}>
                    <Avatar
                        size={30}
                        rounded
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                        activeOpacity={0.7}
                        containerStyle={styles.avatarContainerStyle}
                    />
                     <Avatar
                        size={30}
                        rounded
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                        activeOpacity={0.7}
                        containerStyle={styles.avatarContainerStyle}
                    />
                    <Avatar
                        size={30}
                        rounded
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                        activeOpacity={0.7}
                        containerStyle={styles.avatarContainerStyle}
                    />
                    <Avatar
                        size={30}
                        rounded
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                        activeOpacity={0.7}
                        containerStyle={styles.avatarContainerStyle}
                    />
                    <Avatar
                        size={30}
                        rounded
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                        activeOpacity={0.7}
                        containerStyle={styles.avatarContainerStyle}
                    />
                    </View>
                </Card>

                <Divider style={{ height: 10, backgroundColor: '#e9e9ef' }} />

                <Card containerStyle={{margin: 0}}>
                    <Text style={styles.cardLabel}>About this group</Text>
                    <ListItem
                        title={group.about1}
                        subtitle={group.about2}
                        leftIcon={<Icon size={48} name='unlock' type='evilicon'/>}
                        containerStyle={{margin:0, padding:0}}
                    />
                </Card>


            </ScrollView>
        )
    }

}

export default GroupAboutScreen;

