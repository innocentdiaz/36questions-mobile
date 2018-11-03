import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Fonts from '../utils/Fonts';
import * as Animatable from 'react-native-animatable';
import ActivityIndicator from 'react-native-activity-indicator';

class LoadingScreen extends Component {
  render(){
    return(
      <View style={styles.mainContainer}>
        <View style={{
          justifyContent: 'center',
          flex: 1
        }}>
          <Animatable.Text
            animation='bounce'
            style={styles.mainText}
          >
            LOADING
          </Animatable.Text>

          <ActivityIndicator
            color='white'
            size='large'
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f9c296',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainText: {
    color: 'white',
    fontSize: 28,
    fontFamily: Fonts.Playfair
  }
});

export default LoadingScreen
