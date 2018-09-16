import React, { Component } from 'react'
import Fonts from '../utils/Fonts';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Login from './forms/Login';
import Signup from './forms/Signup';

class Onboarding extends Component {
  handleMainHeaderRef = ref => this.mainHeaderRef = ref

  async showLogin() {
    this.mainHeaderRef.transitionTo({
      fontSize: 44
    })
    this.setState({
      currentScreen: 'login'
    })
  }
  async showSignup() {
    this.mainHeaderRef.transitionTo({
      fontSize: 44
    })
    this.setState({
      currentScreen: 'signup'
    })
  }
  async backToDefault() {
    this.mainHeaderRef.transitionTo({
      fontSize: 54
    })
    this.setState({
      currentScreen: 'default'
    })
  }
  constructor(props){
    super(props);
    this.state = {
      currentScreen: 'default'
    };

    this.showLogin = this.showLogin.bind(this);
    this.showSignup = this.showSignup.bind(this);
    this.backToDefault = this.backToDefault.bind(this);
  };
  render(){
    let { currentScreen } = this.state

    return(
      <Animatable.View
        animation="fadeIn"
        style={styles.mainContainer}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Animatable.Text
            ref={this.handleMainHeaderRef}
            animation="fadeInUp"
            style={{
              ...styles.mainText,
              fontSize: 54
            }}>36Questions</Animatable.Text>
        </View>
        {
          currentScreen === 'login' ? <Login loginCb={this.props.loginCb}/> :
          currentScreen === 'signup' ? <Signup/> :
          (
            <Animatable.View
              style={{flex: 1}}
            >
              <Animatable.View
                ref={this.handleLoginButtonRef}
                animation="fadeInUp"
                delay={100}
              >
                <TouchableOpacity 
                  style={{ ...styles.buttonStyle, marginBottom: 10 }}
                  onPress={this.showLogin}
                >
                  <Text style={{ ...styles.mainText, fontSize: 25 }}>LOGIN</Text>
                </TouchableOpacity>
              </Animatable.View>
              <Animatable.View
                ref={this.handleSignupButtonRef}
                animation="fadeInUp"
                delay={250}
              >
                <TouchableOpacity 
                  style={{ ...styles.buttonStyle, marginTop: 10 }}
                  onPress={this.showSignup}
                >
                  <Text style={{ ...styles.mainText, fontSize: 25 }}>SIGNUP</Text>
                </TouchableOpacity>
              </Animatable.View>
            </Animatable.View>
          )
        }
        {currentScreen !== 'default' ? 
          (<TouchableOpacity
            style={{
              ...styles.buttonStyle,
              paddingTop: 5,
              paddingBottom: 5,
              borderColor: 'transparent',
              alignSelf: 'flex-start'
            }}
            onPress={this.backToDefault}
          >
            <Text style={{
              ...styles.mainText,
              fontSize: 28
            }}>Back</Text>
          </TouchableOpacity>) : null
        }
      </Animatable.View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  mainText: {
    color: 'white',
    fontFamily: Fonts.Playfair
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
  }
})

export default Onboarding;