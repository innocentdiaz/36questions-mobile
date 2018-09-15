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
import io from 'socket.io-client';
import api from '../api';

const socket = io(api.getBaseURL() + '/matching');

class Matching extends Component {
  subscribeToSearch() {
    let { user } = this.props;

    socket.emit('subscribeToQue', user.authToken);
    socket.on('subscribe success', () => {
      this.setState({
        matching: true
      });
    });
    socket.on('que length', (que_length) => {
      let message = que_length > 1 ? `There are ${que_length-1} other users in the que.` : 'Waiting for users to join...'
      this.setState({ message })
    });
    socket.on('subscribe disconnect', () => {
      this.setState({
        message: 'Disconnected from matching',
        matching: false
      });
    });
    socket.on('match success', ({name, roomID}) => {
      alert('You have been matched with ' + name + '. Joining room.');
      window.location = '/room/' + roomID;
    });
    socket.on('disconnect', () => {
      this.setState({
        message: 'Disconnected from the matching',
        matching: false
      });
    });
    socket.on('invalid information', () => {
      this.setState({
        message: 'You have provided invalid information to the server',
        matching: false
      });
    });
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