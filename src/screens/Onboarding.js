import React, { Component } from 'react'
import Fonts from '../utils/Fonts';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, View } from 'react-native'
import { Text, Button } from 'react-native-elements'

class Onboarding extends Component {
  render(){
    return(
      <View style={styles.mainContainer}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Animatable.Text
            animation="fadeInUp"
            style={{
              ...styles.mainText,
              fontSize: 54
            }}>36Questions</Animatable.Text>
        </View>
        <View style={{flex: 1}}>
          <Animatable.View
            animation="fadeInUp"
            delay={500}
          >
            <Button 
              title="LOGIN"
              buttonStyle={{ ...styles.buttonStyle, marginBottom: 10 }}
              textStyle={{ ...styles.mainText, fontSize: 25 }}
            />
          </Animatable.View>
          <Animatable.View
            animation="fadeInUp"
            delay={750}
          >
            <Button 
              title="SIGNUP"
              buttonStyle={{ ...styles.buttonStyle, marginTop: 10 }}
              textStyle={{ ...styles.mainText, fontSize: 25 }}
            />
          </Animatable.View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f9c296',
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
    width: '100%',
    borderColor: 'white',
    borderWidth: 1
  }
})

export default Onboarding;