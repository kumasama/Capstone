import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  AsyncStorage,
  ScrollView,
  Alert
} from 'react-native';
import { Font } from 'expo';
import { CheckBox, Input, Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { createSwitchNavigator } from 'react-navigation';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../assets/images/bg_screen4.jpg');

class SignUpScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
	  username: '',
      password: '',
	  first_name: '',
	  last_name: '',
      fontLoaded: false,
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
	  isUsernameValid: true,
	  isFnameVaid: true,
	  isLnameValid: true,
	  checked1: true,
	  checked2: false,
	  gender: 1,
    };
	
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'georgia': require('../assets/fonts/Georgia.ttf'),
      'regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      'light': require('../assets/fonts/Montserrat-Light.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }
  
  validateUsername(username) {
	var re = /^[a-z0-9_-]{3,15}$/;
	return re.test(username);
  }

  login() {
    const {
      email,
      password,
    } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
      });
    }, 1500);
  }

  signUp() {
    const {
      email,
	  username,
      password,
      passwordConfirmation,
	  first_name,
	  last_name
    } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
		isUsernameValid: this.validateUsername(username) || this.usernameInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
        isConfirmationValid: password == passwordConfirmation || this.confirmationInput.shake(),
		isFnameVaid: first_name.length >= 2 || this.fnameInput.shake(),
		isLnameValid: last_name.length >= 2 || this.lnameInput.shake(),
      });
		if(this.state.isEmailValid && this.state.isUsernameValid && this.state.isPasswordValid && 
			this.state.isConfirmationValid && this.state.isFnameVaid && this.state.isLnameValid) {
			this.register();
			Alert.alert(
			  'Success!',
			  'You have beeen successfully registered',
			  [
				{text: 'Login now', onPress: () => this.props.navigation.navigate('Login') },
			  ],
			  { cancelable: false }
			)
		}
    }, 1500);
  }
  
	formEncode(obj) {
		let str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
	}

	
	setUserId() {
		let requestObject = {
			username: this.state.username,
			password: this.state.password,
		}
		var params = this.formEncode(requestObject);
		var request = new XMLHttpRequest();
		request.onreadystatechange = (e) => {
			if(request.readyState !== 4)
				return;
			if(request.status === 200) {
				//this.setState({user_id: request.responseText});
			}
			else 
				console.warn('error');
		};
		let url = 'http://192.168.254.200/capstone/login.php';
		request.open('POST', url, true);
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.send(params);
	}
  
	register() {
		var requestObject = {
			email: this.state.email,
			username: this.state.username,
			password: this.state.password,
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			gender: this.state.gender,
		};
		var params = this.formEncode(requestObject);
		var request = new XMLHttpRequest();
		request.onreadystatechange = (e) => {
			if(request.readyState !== 4) 
				return;
			if(request.status === 200) {
				this.setUserId();
			} else {
				console.warn('error');
			}
		};
		let url = 'http://192.168.254.200/capstone/register.php';
		request.open('POST', url, true);
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.send(params);
	}
  
  changeToMale() {
	this.setState({checked1: true, checked2: false});
	this.setState({gender: 1});
  }
  
  changeToFemale() {
	this.setState({checked1: false, checked2: true});
	this.setState({gender: 0});
  }

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
	  isUsernameValid,
	  isFnameVaid,
	  isLnameValid,
      email,
	  username,
	  first_name,
	  last_name,
      password,
      passwordConfirmation,
    } = this.state;
    const isLoginPage = false;
    const isSignUpPage = true;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BG_IMAGE}
          style={styles.bgImage}
        >
          {this.state.fontLoaded ?
            <ScrollView contentContainerStyle={styles.loginContainer}>
                <View style={styles.titleContainer2}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.titleText}>BACK2PACK</Text>
                  </View>
                </View>
                <View style={styles.formContainer2}>
                  <Input
                    leftIcon={
                      <Icon
                        name='envelope-o'
                        color='rgba(0, 0, 0, 0.38)'
                        size={25}
                        style={{backgroundColor: 'transparent', width:25}}
                      />
                    }
                    value={email}
                    keyboardAppearance='light'
                    autoFocus={false}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType='next'
                    inputStyle={{marginLeft: 10}}
                    placeholder={'Email'}
                    containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                    ref={input => this.emailInput = input}
                    onSubmitEditing={() => this.usernameInput.focus()}
                    onChangeText={email => this.setState({ email })}
                    errorMessage={isEmailValid ? null : 'Please enter a valid email address'}
                  />
				  <Input
                    leftIcon={
                      <Icon
                        name='user-o'
                        color='rgba(0, 0, 0, 0.38)'
                        size={25}
                        style={{backgroundColor: 'transparent', width:25}}
                      />
                    }
                    value={username}
                    keyboardAppearance='light'
                    autoFocus={false}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType='next'
                    inputStyle={{marginLeft: 10}}
                    placeholder={'Username'}
                    containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                    ref={input => this.usernameInput = input}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={username => this.setState({ username })}
                    errorMessage={isUsernameValid ? null : 'Please enter a valid username'}
                  />
                  <Input
                    leftIcon={
                      <SimpleIcon
                        name='lock'
                        color='rgba(0, 0, 0, 0.38)'
                        size={25}
                        style={{backgroundColor: 'transparent', width:25}}
                      />
                    }
                    value={password}
                    keyboardAppearance='light'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType='next'
                    blurOnSubmit={true}
                    containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                    inputStyle={{marginLeft: 10}}
                    placeholder={'Password'}
                    ref={input => this.passwordInput = input}
                    onSubmitEditing={() => this.confirmationInput.focus()}
                    onChangeText={(password) => this.setState({password})}
                    errorMessage={isPasswordValid ? null : 'Please enter at least 8 characters'}
                  />
				  <Input
                      leftIcon={
                        <SimpleIcon
                          name='lock'
                          color='rgba(0, 0, 0, 0.38)'
                          size={25}
                          style={{backgroundColor: 'transparent', width:25}}
                        />
                      }
                      value={passwordConfirmation}
                      secureTextEntry={true}
                      keyboardAppearance='light'
                      autoCapitalize='none'
                      autoCorrect={false}
                      returnKeyType={'next'}
                      blurOnSubmit={true}
                      containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                      inputStyle={{marginLeft: 10}}
                      placeholder={'Confirm password'}
                      ref={input => this.confirmationInput = input}
                      onSubmitEditing={ () => this.fnameInput.focus()}
                      onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
                      errorMessage={isConfirmationValid ? null : 'Please enter the same password'}
                    />
					<Input
                      leftIcon={
                        <SimpleIcon
                          name='info'
                          color='rgba(0, 0, 0, 0.38)'
                          size={25}
                          style={{backgroundColor: 'transparent', width:25}}
                        />
                      }
                      value={first_name}
                      secureTextEntry={false}
                      keyboardAppearance='light'
                      autoCapitalize='words'
                      autoCorrect={false}
                      keyboardType='email-address'
                      returnKeyType={'next'}
                      blurOnSubmit={true}
                      containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                      inputStyle={{marginLeft: 10}}
                      placeholder={'First Name'}
                      ref={input => this.fnameInput = input}
                      onSubmitEditing={ () => this.lnameInput.focus()}
                      onChangeText={first_name => this.setState({ first_name })}
                      errorMessage={isFnameVaid ? null : "Please don't leave this blank"}
                    />
					<Input
                      leftIcon={
                        <SimpleIcon
                          name='info'
                          color='rgba(0, 0, 0, 0.38)'
                          size={25}
                          style={{backgroundColor: 'transparent', width:25}}
                        />
                      }
                      value={last_name}
                      secureTextEntry={false}
                      keyboardAppearance='light'
                      autoCapitalize='words'
                      autoCorrect={false}
                      keyboardType='email-address'
                      returnKeyType={'done'}
                      blurOnSubmit={true}
                      containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                      inputStyle={{marginLeft: 10}}
                      placeholder={'Last Name'}
                      ref={input => this.lnameInput = input}
                      onSubmitEditing={this.signUp}
                      onChangeText={last_name => this.setState({ last_name })}
                      errorMessage={isLnameValid ? null : "Please don't leave this blank"}
                    />
					<View style={{flexDirection: 'row'}}>
						<CheckBox
						  center
						  title='Male'
						  checked={this.state.checked1}
						  checkedIcon='mars'
						  uncheckedIcon='mars'
						  checkedColor="rgba(232, 147, 142, 1)"
						  onPress={() => !this.state.checked1 ? this.changeToMale() : null}
						  textStyle = {{fontSize: 16}}
						/>
						<CheckBox
						  center
						  title='Female'
						  checked={this.state.checked2}
						  checkedIcon='venus'
						  uncheckedIcon='venus'
						  checkedColor="rgba(232, 147, 142, 1)"
						  onPress={() => !this.state.checked2 ? this.changeToFemale() : null}
						  textStyle = {{fontSize: 16}}
						/>
					</View>
                    <Button
                      buttonStyle={styles.loginButton}
                      containerStyle={{marginTop: 8, flex: 0}}
                      activeOpacity={0.8}
                      title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                      onPress={isLoginPage ? this.login : this.signUp}
                      titleStyle={styles.loginTextButton}
                      loading={isLoading}
                      disabled={isLoading}
                    />
					<View style={{marginTop: 15, flexDirection: 'row'}}>
						<Text>Already have an account?</Text>
						<Text onPress={() => this.props.navigation.navigate('Login') }style={{marginLeft: 5, fontWeight: "bold", color: "rgba(232, 147, 142, 1)"}}>
							Login now
						</Text>
					</View>
                </View>
            </ScrollView>
          :
          <Text>Loading...</Text>
        }
        </ImageBackground>
      </View>
    );
  }
}

class LoginScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      fontLoaded: false,
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
	  user_id: "-1",
    };
	
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }
  
  async componentWillMount() {
	AsyncStorage.getItem('user_id').then((value) => Number(value) > 0 ? this.setUserId(value) : null);
  }
  
  setUserId(id) {
	if(id !== null) {
		AsyncStorage.setItem('user_id', id.toString());
		this.setState({user_id: id});
	}
	else
		AsyncStorage.setItem('user_id', "-1");
  }

  async componentDidMount() {
    await Font.loadAsync({
      'georgia': require('../assets/fonts/Georgia.ttf'),
      'regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      'light': require('../assets/fonts/Montserrat-Light.ttf'),
    });
    this.setState({ fontLoaded: true });
	if(Number(this.state.user_id)>0) {
		this.props.navigation.navigate("App");
	}
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
	formEncode(obj) {
		let str = [];
		for(var p in obj)
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		return str.join("&");
	}

  login() {
    const {
      email,
      password,
    } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: email.length > 0 || this.emailInput.shake(),
        isPasswordValid: password.length > 0 || this.passwordInput.shake(),
      });
	  if(this.state.isEmailValid && this.state.isPasswordValid) {
		let requestObject = {
			username: email,
			password: password,
		}
		var params = this.formEncode(requestObject);
		var request = new XMLHttpRequest();
		request.onreadystatechange = (e) => {
			if(request.readyState !== 4)
				return;
			if(request.status === 200) {
				if(Number(request.responseText) > 0) {
					this.setUserId(request.responseText);
					this.props.navigation.navigate('App');
				} else {
					Alert.alert(
					  'Login failed',
					  'Please try again by entering your correct username and password.',
					  [
						{text: 'Ok', onPress: null },
					  ],
					  { cancelable: false }
					)
				}
			}
			else 
				console.warn('error');
		};
		let url = 'http://192.168.254.200/capstone/login.php';
		request.open('POST', url, true);
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.send(params);
	  }
    }, 1500);
  }

  signUp() {
    const {
      email,
      password,
      passwordConfirmation,
    } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: email.length > 0 || this.emailInput.shake(),
        isPasswordValid: password.length >= 0 || this.passwordInput.shake(),
      });
    }, 1500);
  }

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      email,
      password,
      passwordConfirmation,
    } = this.state;
    const isLoginPage = true;
    const isSignUpPage = false;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BG_IMAGE}
          style={styles.bgImage}
        >
          {this.state.fontLoaded ?
            <View>
              <KeyboardAvoidingView contentContainerStyle={styles.loginContainer} behavior='position'>
                <View style={styles.titleContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.titleText}>BACK2PACK</Text>
                  </View>
                </View>
                <View style={styles.formContainer}>
                  <Input
                    leftIcon={
                      <Icon
                        name='user-o'
                        color='rgba(0, 0, 0, 0.38)'
                        size={25}
                        style={{backgroundColor: 'transparent', width:25}}
                      />
                    }
                    value={email}
                    keyboardAppearance='light'
                    autoFocus={false}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType='next'
                    inputStyle={{marginLeft: 10}}
                    placeholder={'Email or username'}
                    containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                    ref={input => this.emailInput = input}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={email => this.setState({ email })}
                    errorMessage={isEmailValid ? null : "Please don't forget this field."}
                  />
                  <Input
                    leftIcon={
                      <SimpleIcon
                        name='lock'
                        color='rgba(0, 0, 0, 0.38)'
                        size={25}
                        style={{backgroundColor: 'transparent', width:25}}
                      />
                    }
                    value={password}
                    keyboardAppearance='light'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType={isSignUpPage ? 'next' : 'done'}
                    blurOnSubmit={true}
                    containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                    inputStyle={{marginLeft: 10}}
                    placeholder={'Password'}
                    ref={input => this.passwordInput = input}
                    onSubmitEditing={() => isSignUpPage ? this.confirmationInput.focus() : this.login()}
                    onChangeText={(password) => this.setState({password})}
                    errorMessage={isPasswordValid ? null : "Please don't forget this field."}
                  />
                    <Button
                      buttonStyle={styles.loginButton}
                      containerStyle={{marginTop: 32, flex: 0}}
                      activeOpacity={0.8}
                      title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                      onPress={isLoginPage ? this.login : this.signUp}
                      titleStyle={styles.loginTextButton}
                      loading={isLoading}
                      disabled={isLoading}
                    />
					<View style={{marginTop: 15, flexDirection: 'row'}}>
						<Text>Don't have an account?</Text>
						<Text onPress={() => this.props.navigation.navigate("Signup")}style={{marginLeft: 5, fontWeight: "bold", color: "rgba(232, 147, 142, 1)"}}>
							Sign up now
						</Text>
					</View>
                </View>
              </KeyboardAvoidingView>
            </View>
          :
          <Text>Loading...</Text>
        }
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  titleContainer2: {
	marginTop: 20,
    height: 75,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems:'center',
  },
  formContainer2: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 32,
    alignItems:'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText2: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'light',
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  categoryText2: {
    textAlign: 'center',
    color: 'black',
    fontSize: 24,
    fontFamily: 'light',
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
  },
  helpContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AuthNav = createSwitchNavigator({
	Login: LoginScreen,
	Signup: SignUpScreen
});

export default AuthNav;
