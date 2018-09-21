import React, { Component } from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { toggleInterest } from '../../../redux/actions/signupActions';
import { Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';

class SignUpInterests extends Component {
  handleSubmit() {
    let { data } = this.props

    if (data.interests.length == 0) {
      this.setState({ message: 'Please choose atleast one interest' })
    } else {
      Navigation.push(this.props.componentId, {
        component: {
          name: 'app.signUp.preview'
        }
      })
    }
  }
  constructor(props){
    super(props);
    this.state = {
      message: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this)
  };
  render(){
    console.log(this.state)
    let { interests } = this.props.data;
    let selectedMale = interests.includes('male')
    let selectedFemale = interests.includes('female')
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
              - Choose your interests -
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
              reverseColor={selectedMale ? 'white' : '#f56f68'}  
              containerStyle={
                selectedMale ? {
                  backgroundColor: '#f56f68'
                } :
                {
                  backgroundColor: 'transparent',
                  borderColor: '#f56f68',
                  borderWidth: 1
                }
              }
              onPress={() => {
                this.props.toggleInterest('male')
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
              this.props.toggleInterest('male')
            }}
          >
            <Icon
              size={40}
              type='ionicon'
              name='ios-female'
              reverse
              reverseColor={selectedFemale ? 'white' : '#f56f68'}  
              containerStyle={
                selectedFemale ? {
                  backgroundColor: '#f56f68'
                } :
                {
                  backgroundColor: 'transparent',
                  borderColor: '#f56f68',
                  borderWidth: 1
                }
              }
              onPress={() => {
                this.props.toggleInterest('female')
              }}
            />
          </Animatable.View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{
                ...styles.mainButton
              }}
              onPress={this.handleSubmit}
            >
              <Text style={{
                ...styles.mainText,
                color: 'white',
                fontSize: 25
              }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: '#f56f68',
                marginLeft: 10,
                fontSize: 18
              }}
            >
              { this.state.message }
            </Text>
          </View>
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
  mainButton: {
    backgroundColor: '#f56f68',
    padding: 7,
    alignItems: 'center',
    borderRadius: 7,
    borderColor: '#f56f68',
    borderWidth: 1,
    margin: 10
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
  toggleInterest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpInterests)