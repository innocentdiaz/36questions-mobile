import React, { Component } from 'react';
import { Text } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Login extends Component {
  handleMainContainerRef = ref => this.mainContainerRef = ref

  componentDidMount() {
    this.mainContainerRef.transition(
    {
      flex: 0,
      opacity: 0,
      width: 0
    },
    {
      flex: 1,
      opacity: 1
    }, 1000)
  }
  render(){
    return(
      <Animatable.View
        ref={this.handleMainContainerRef}
      >
        <Text h1>Login!</Text>
      </Animatable.View>
    );
  }
};

export default Login