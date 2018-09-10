import React, { Component} from 'react';
import { 
    AsyncStorage, 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    Alert,
    LayoutAnimation
} from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { 
    Icon,
    Card,
    ListItem,
    Button,
    Input,
} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

class GroupCreateScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: '-1',
            group_name: '',
            checked: true,
            isLoading: false,
            isNameValid: true,
        };
    }

    async componentWillMount() {
        AsyncStorage.getItem('user_id').then((value) => this.setState({user_id: value}));
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

    createGroup() {
        const { isNameValid, checked, isLoading, group_name } = this.state;
        this.setState({ isLoading: true });
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            this.setState({
              isLoading: false,
              isNameValid: group_name.length > 0 || this.groupNameInput.shake(),
            });
            if(group_name.length > 0) {
                let requestObject = {
                    group_name: group_name,
                    group_type: checked ? 1 : 0,
                    backpacker_id: this.state.user_id
                }
                var params = this.formEncode(requestObject);
                var request = new XMLHttpRequest();
                request.onreadystatechange = (e) => {
                    if(request.readyState !== 4)
                        return;
                    if(request.status === 200) {
                        if(Number(request.responseText) > 0) {
                            Alert.alert(
                                'Success',
                                'You have successfuly created a new group',
                                [
                                  {text: 'Ok', onPress: () => this.props.navigation.replace('GroupManageDiscover') },
                                ],
                                { cancelable: false }
                              )
                        }
                    }
                    else 
                        console.warn('error');
                };
                let url = 'http://192.168.254.200/capstone/group_create.php';
                request.open('POST', url, true);
                request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                request.send(params);
            }
          }, 1500);
    }

    render() {
       return (
           <View>
               <Card>
                    <Input
                        label='Group Name'
                        onChangeText= {(group_name) => this.setState({group_name})}
                        ref={input => this.groupNameInput = input}
                        errorMessage={this.state.isNameValid ? null : "Please don't leave this blank"}
                    />
                    <Text style={{
                            marginTop: 15, 
                            fontWeight: 'bold',
                            color: '#86939e',
                            fontSize: 16
                    }}>Group Type</Text>
                    <ListItem
                        title='Closed'
                        subtitle="Anycone can find the group and see who's in it. Only members can see its contents."
                        checkBox={{
                            checked: this.state.checked,
                            checkedIcon: <Icon name='check' type='feather'/>,
                            onPress: ()=> this.setState({checked: !this.state.checked})
                        }}
                    />
                    <ListItem
                        title='Private'
                        subtitle='Only members can see the group and its contents'
                        checkBox={{
                            checked: !this.state.checked,
                            checkedIcon: <Icon name='check' type='feather'/>,
                            onPress: ()=> this.setState({checked: !this.state.checked})
                        }}
                    />
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Button
                      buttonStyle={styles.loginButton}
                      containerStyle={{marginTop: 16, flex: 0}}
                      activeOpacity={0.8}
                      title='Create Group'
                      onPress={ () => this.createGroup() }
                      titleStyle={styles.loginTextButton}
                      loading={this.state.isLoading}
                      disabled={this.state.isLoading}
                    />
                    </View>
                </Card>
            </View>
       )
   }

}

const styles = StyleSheet.create({
    loginTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
      },
      loginButton: {
        backgroundColor: 'rgba(232, 147, 142, 1)',
        borderRadius: 10,
        height: 50,
        width: 200,
    },
});

export default GroupCreateScreen;

