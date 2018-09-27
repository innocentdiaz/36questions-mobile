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
import { matchingView, Onboarding } from '../App';
import { Navigation } from 'react-native-navigation';
import BaseView from './components/BaseView';

class Landing extends Component {
  handleTransitionBubble = ref => this.transitionBubble = ref
  handleFrameRef = ref => this.frameRef = ref
  getMatched () {
    this.transitionBubble.transitionTo({
      backgroundColor: 'rgb(197, 103, 72)',
      height: 10,
      width: 10,
      borderRadius: 5,
      scale: 100
    }, 600);

    this.frameRef.fadeOut(600)
    .then(() => matchingView());

  }
  constructor(props){
    super(props);
    this.state = {};

    this.getMatched = this.getMatched.bind(this)
  };
  render(){
    let { user } = this.props;

    if (!user.authenticated) {
      Onboarding()
      return null
    }

    return(
      <BaseView
        loading={user.loading}
      >
        <Animatable.View
          style={styles.mainContainer}
        >
          <Animatable.View
            ref={this.handleTransitionBubble}
            style={styles.transitionBubble}
          ></Animatable.View>

          <Animatable.View
            ref={this.handleFrameRef}
          >
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
              <Animatable.View
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                delay={2000}
                duration={4500}
              >
                <TouchableOpacity
                  style={styles.mainButton}
                  onPress={this.getMatched}
                >
                  <Text
                    style={{
                      ...styles.mainText,
                      fontSize: 30
                    }}
                  >
                    GET MATCHED
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            </Animatable.View>
          </Animatable.View>
        </Animatable.View>
      </BaseView>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
  },
  transitionBubble: {
    backgroundColor: 'rgb(249, 194, 150)',
    position: 'absolute',
    top: '50%',
    height: 0,
    width: 0
  }
})

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps
)(Landing);