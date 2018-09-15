import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Fonts from '../utils/Fonts';

class Matching extends Component {
  subscribeToSearch() {
    this.setState({
      message: 'Joined matching',
      matching: true
    })
  }
  constructor(props){
    super(props);
    this.state = {
      message: '',
      matching: false
    };

    this.subscribeToSearch = this.subscribeToSearch.bind(this);
  };
  render(){
    let { message, matching } = this.state

    return(
      <View style={styles.mainContainer}>
        <Animatable.View
          animation='fadeIn'
        >
          <Text
            style={styles.mainText}
          >
            MATCHING
          </Text>
          <Text
            style={{
              ...styles.mainText,
              fontSize: 21
            }}
          >
            { message }
          </Text>
          {
            matching ?
            null : (
              <TouchableOpacity
                style={styles.mainButton}
                onPress={this.subscribeToSearch}
              >
                <Text
                  style={{
                    ...styles.mainText,
                    fontSize: 28
                  }}
                >
                  Search for a match 
                </Text>
              </TouchableOpacity>
            )
          }
        </Animatable.View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#c56748',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10
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
  },
})

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps
)(Matching)