import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import { connect } from 'react-redux';
import Fonts from '../utils/Fonts';
import api from '../api';
import io from 'socket.io-client';

class Room extends Component {
  bindSocket(socket) {
    this.setState({ bindedSocket: true })

    socket.emit('join room', this.props.user); // let socket know we want to join

    socket.on('joined', ({res, message}) => {
      if (!res) {
        alert(message)
      }

      this.setState({ joined: res });
    });
    socket.on('isActive', isActive => {
      this.setState({ isActive });
    });
    socket.on('user disconnected', name => {
      this.setState({
        display: name + ' was disconnected... Waiting for users...',
        typing: { status: false }
      })
    });
    socket.on('display', (message) => {
      this.setState({display: message})
    });
    socket.on('typing', ({name, status}) => {
      this.setState({ typing: {name, status} })
    });
    socket.on('message', (message) => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, [message]),
      }))
    });
    socket.on('question index', currentQuestionIndex => {
      this.setState({
        currentQuestionIndex
      });
    });
    socket.on('disconnect', () => {
      this.setState({
        isActive: false,
        display: 'Disconnected from room',
        joined: false,
        typing: { status: null }
      });
    });
  }
  renderFooter() {
    // true because we are testing
    if (this.state.typing.status) {
      return (
        <View
          style={{
            padding: 5
          }}
        >
          <AnimatedEllipsis
            style={{
              color: 'white',
              fontSize: 36,
              letterSpacing: -1
            }}
          />
        </View>
      );
    }
    return null;
  }
  componentDidMount() {
    const { roomID } = this.props
    let socket = io(api.getBaseURL() + '/rooms?id=' + roomID)

    this.setState({ socket });
  }
  componentDidUpdate() { // wait till we get the user and socket
    let { bindedSocket, socket } = this.state;

    if (bindedSocket) return
    if (!socket) return

    this.bindSocket(socket);
  }
  sendMessage(messages = []) {
    let { socket } = this.state;

    socket.emit('message', messages[0].text);
    socket.emit('typing', false)
  }
  onInputTextChanged(text) {
    let { socket } = this.state;
    let oldMessage = this.state.message;

    this.setState({message: text});

    if (oldMessage === '' && text.length > 0) { // if the old message is empty and we started typing
      socket.emit('typing', true)
    } else if (oldMessage.length > 0 && text === '') { // else if old message is not empty and we just made it empty
      socket.emit('typing', false)
    }
  }
  constructor(props){
    super(props);
    this.state = {
      message: '',
      messages: [],
      joined: null,
      display: '',
      typing: {
        status: false
      },
      currentQuestionIndex: -1
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onInputTextChanged = this.onInputTextChanged.bind(this);
  };
  render(){
    let {
      joined,
      messages,
      display,
    } = this.state
    return(
      <View style={styles.mainContainer}>
        <View style={styles.mainHeader}>
          <View>
            <Text
              style={{
                ...styles.mainText,
                fontSize: 42
              }}
            >
              36Questions
            </Text>
            <Text
              style={{
                ...styles.mainText,
                fontSize: 18
              }}
            >
              {display}
            </Text>
          </View>
        </View>
        <GiftedChat
          text={this.state.message}
          onInputTextChanged={text => this.onInputTextChanged(text)}
          renderFooter={this.renderFooter}
          messages={messages}
          onSend={messages => this.sendMessage(messages)}
          user={{
            _id: this.props.user._id
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 10
  },
  mainHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: '#f9c296',
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  mainText: {
    color: 'white',
    fontFamily: Fonts.Playfair
  }
})

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps
)(Room)