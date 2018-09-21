import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { setField } from '../../../redux/actions/signupActions';
import Fonts from '../../../utils/Fonts';
import { Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';

class SignUpGender extends Component {
  transitionToInterests() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'app.signUp.interests',
        options: {
          layout: {
            backgroundColor: 'white'
          }
        }
      }
    });
  }
  constructor(props){
    super(props);
    this.state = {};

    this.transitionToInterests = this.transitionToInterests.bind(this);
  };
  render(){
    return(
      <View
        style={styles.mainContainer}
      >
        <View
          style={styles.topBar}
        >
          <Icon
            name="chevron-left"
            size={48}
            color='#f56f68'
            onPress={() => Navigation.pop(this.props.componentId)}
          />
        </View>
        <Animatable.View
          animation="fadeInUp"
          style={styles.body}
        >
          <View
            style={{
              flex: 3,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={styles.mainText}
            >
              - Choose your gender -
            </Text>
          </View>
          <Animatable.View
            animation="fadeInUp"
            delay={650}
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
          >
            <Icon
              size={40}
              type='ionicon'
              name='ios-male'  
              reverse
              reverseColor='#f56f68'
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: '#f56f68',
                borderWidth: 1
              }}
              onPress={() => {
                this.props.setField({ gender: 'male' });
                this.transitionToInterests()
              }}
            />
          </Animatable.View>
          <Animatable.View
            animation="fadeInUp"
            delay={900}
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingBottom: 50
            }}
            onPress={() => {
              this.props.setField({ gender: 'female' });
              this.transitionToInterests()
            }}
          >
            <Icon
              size={40}
              type='ionicon'
              name='ios-female'
              reverse
              reverseColor='#f56f68'  
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: '#f56f68',
                borderWidth: 1
              }}
              onPress={() => {
                this.props.setField({ gender: 'female' });
                this.transitionToInterests()
              }}
            />
          </Animatable.View>
          <View style={{flex: 1}}></View>
        </Animatable.View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 5,
    backgroundColor: 'white'
  },
  mainText: {
    color: '#6b6b6b',
    fontSize: 22
  },
  topBar: {
    padding: 10,
    alignItems: 'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 15
  },
  body: {
    flex: 1,
    alignItems: 'stretch'
  }
});

const mapStateToProps = state => ({
  data: state.signUp
});
const mapDispatchToProps = {
  setField
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpGender)