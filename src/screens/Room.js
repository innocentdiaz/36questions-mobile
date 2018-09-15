import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Room extends Component {
  render(){
    return(
      <View>
        <Text>Room #{this.props.roomID}</Text>
      </View>
    );
  }
};

export default Room