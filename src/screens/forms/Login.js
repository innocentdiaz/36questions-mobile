import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import Fonts from '../../utils/Fonts';
import api from '../../api';

class Login extends Component {
  handleMainContainerRef = ref => this.mainContainerRef = ref
  handleErrorTextRef = ref => this.errorTextRef = ref

  submit() {
    let { email, password } = this.state

    if (email.trim() == '' || !email) {
      this.errorTextRef.bounce(800)
      this.setState({
        message: 'Please enter your email'
      })
    } else if (password.trim() == '' || !password) {
      this.errorTextRef.bounce(800)
      this.setState({
        message: 'Please enter your password'
      })
    } else {
      this.errorTextRef.fadeIn(800)
      this.setState({
        message: 'Logging in...'
      })

      // Log user in and exec this.props.loggedInView
      api.post('/auth', { email, password })
      .then(res => {
        let { token } = res.data
        if (res.ok) {
          this.props.fetchUser(token)
          this.props.loginCb(token)
        } else {
          this.errorTextRef.bounce(800)
          this.setState({
            message: res.data.message || 'Failed to log in!'
          })
        }
      })
    }
  }
  componentDidMount() {
    this.mainContainerRef.transition(
    {
      flex: 0,
      opacity: 0,
      width: 0
    },
    {
      flex: 2,
      opacity: 1
    }, 1000)
  }

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
    };

    this.submit = this.submit.bind(this);
  };
  render(){
    let { email, password, message } = this.state;

    return(
      <Animatable.View
        ref={this.handleMainContainerRef}
        style={styles.mainContainer}
      >
        <Text
          style={{
            ...styles.mainText,
            fontSize: 38
          }}
        >Welcome back!</Text>

        <TextInput
          style={styles.textInput}
          autoCorrect={false}
          textContentType='emailAddress'
          placeholder='Email'
          onChangeText={(email) => this.setState({email})}
          value={email}
        />
        <TextInput
          style={{
            ...styles.textInput,
            marginBottom: 0
          }}
          autoCorrect={false}
          textContentType='password'
          password
          secureTextEntry={true}
          placeholder='Password'
          onChangeText={(password) => this.setState({password})}
          value={password}
        />
        <Animatable.Text
          ref={this.handleErrorTextRef}
          style={{
            ...styles.mainText,
            fontSize: 18,
            marginBottom: 8,
            marginTop: 8
          }}
        >
          { message }
        </Animatable.Text>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.submit}
        >
          <Text
            style={{
              ...styles.mainText,
              fontSize: 22
            }}
          >LOGIN</Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'flex-start'
  },
  mainText: {
    color: 'white',
    fontFamily: Fonts.Playfair
  },
  textInput: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    fontSize: 24,
    padding: 5,
    marginTop: 5,
    marginBottom: 5
  },
  submitButton: {
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 5,
    borderRadius: 5
  }
})

const mapDispatchToProps = {
  fetchUser
}

export default connect(
  null,
  mapDispatchToProps
)(Login)