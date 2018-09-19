import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Text, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Fonts from '../../utils/Fonts';

class SignUp extends Component {
  render(){
    return(
      <Animatable.View
        animation="fadeIn"
        style={styles.mainContainer}
      >
        <View
          style={styles.topBar}
        >
          <Icon
            name="chevron-left"
            size={48}
            color='white'
          />
        </View>
        <View
          style={styles.head}
        >
          <Text
            style={{
              ...styles.mainText,
              fontSize: 48
            }}
          >
            36
          </Text>

        </View>
        <Animatable.View
          style={styles.body}
          animation='slideInUp'
        >
          <Image
            source={require('../../images/clouds.png')}
            style={{
              width: '100%',
              height: 60,
              resizeMode: 'cover'
            }}
            />
          <View
            style={styles.form}
          >
            <Text
              style={{fontSize: 25}}
            >
              TESTINGTESTINGTESTING
              TESTINGTESTINGTESTING
              TESTINGTESTINGTESTING
              TESTINGTESTINGTESTING
              TESTINGTESTINGTESTING
              TESTINGTESTINGTESTING
              TESTINGTESTINGTESTING
              TESTINGTESTINGTESTING
              TESTINGTESTINGTESTING
              TESTINGTESTINGTESTING
              TESTINGTESTINGTESTING
              TESTINGTESTINGTESTING
            </Text>
          </View>

        </Animatable.View>
      </Animatable.View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 5,
    backgroundColor: '#f56f68'
  },
  mainText: {
    color: 'white',
    fontFamily: Fonts.Playfair
  },
  topBar: {
    padding: 10,
    alignItems: 'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  head: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '45%',
    left: 0,
    right: 0
  },
  body: {
    flex: 1
  },
  form: {
    backgroundColor: 'white',
    flex: 1
  }
});

export default SignUp