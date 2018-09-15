import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import LoadingScreen from './LoadingScreen';
import Fonts from '../utils/Fonts';

class Landing extends Component {
  render(){
    let { user } = this.props;

    if (user.loading) {
      return(
        <LoadingScreen />
      )
    }
    if (!user.authenticated) {
      return (
        <View>
          <Text>Failed to authenticate user!</Text>
        </View>
      )
    }
    return(
      <View style={styles.mainContainer}>
        <Animatable.Text
          animation="fadeInUp"
          delay={500}
          style={styles.mainText}
        >
          Welcome, {user.firstName}
        </Animatable.Text>
        <Animatable.View
          animation="fadeInUp"
          delay={750}
        >
          <TouchableOpacity
            style={styles.mainButton}
          >
            <Text
              style={{
                ...styles.mainText,
                fontSize: 36
              }}
            >
              GET MATCHED
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f9c296',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center'
  },
  mainText: {
    color: 'white',
    fontFamily: Fonts.Playfair,
    fontSize: 42
  },
  mainButton: {
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 4,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15
  }
})

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps
)(Landing);