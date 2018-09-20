import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import {
  setField,
  setDefault
} from '../../redux/actions/signupActions';
import { Text, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-crop-picker';
import Fonts from '../../utils/Fonts';
import { Onboarding } from '../../App';
import { Navigation } from 'react-native-navigation';

class SignUp extends Component {
  takePicture() {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      this.props.setField({
        avatar: image
      });
    }).catch(err => {
      Alert.alert(err.message)
    });
  }
  toggleCameraRoll() {
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true
    }).then(image => {
      this.props.setField({
        avatar: image
      });
    }).catch(err => {
      Alert.alert(err.message)
    });
  };
  handleSubmit() {
    let {
      email,
      password,
      firstName,
      lastName
    } = this.props.data

    if (email.trim().length == 0) {
      return this.setState({
        message: 'Email is too short'
      })
    }
    if (password.trim().length < 8) {
      return this.setState({
        message: 'Password must be atleast 8 characters long'
      })
    }
    if (firstName.trim().length == 0) {
      return this.setState({
        message: 'First name is too short'
      })
    }
    if (lastName.trim().length == 0) {
      return this.setState({
        message: 'Last name is too short'
      })
    }

    this.setState({ message: '' })
    Navigation.push(this.props.componentId, {
      component: {
        name: 'app.signUp.gender'
      }
    });
  }
  constructor(props){
    super(props);

    this.state = {
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.toggleCameraRoll = this.toggleCameraRoll.bind(this);
  };
  render(){
    let {
      email,
      password,
      firstName,
      lastName,
      avatar
    } = this.props.data

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
            onPress={() => {
              this.props.setDefault()
              Onboarding()
            }}
          />
        </View>
        <View
          style={styles.head}
        >
          <Text
            style={{
              ...styles.mainText,
              fontSize: 62
            }}
          >
            36
          </Text>
        </View>

        <KeyboardAwareScrollView
          bounces={false}
        >
          <Animatable.View
            style={styles.body}
            animation='slideInUp'
          >
            <Image
              source={require('../../images/clouds.png')}
              style={{
                width: Dimensions.get('window').width,
                height: 60,
                alignSelf: 'center'
              }}
              />
            <View
              style={styles.form}
            >
              <Image
                style={{
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                  width: 88,
                  height: 88,
                  borderRadius: 44
                }}

                source={avatar ? {uri: avatar.path} : require('../../images/avatar.png')}
              />

              <TouchableOpacity
                style={{
                  ...styles.mainButton,
                  backgroundColor: 'transparent'
                }}
                onPress={this.toggleCameraRoll}
              >
                <Text style={{
                  ...styles.mainText,
                  color: '#f56f68',
                  fontSize: 25
                }}>
                  Choose photo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mainButton}
                onPress={this.takePicture}
              >
                <Text style={{
                  ...styles.mainText,
                  fontSize: 25
                }}>
                  Take a photo
                </Text>
              </TouchableOpacity>
            
              <Text style={styles.label}>first name</Text>
              <TextInput
                style={styles.textInput}
                placeholder='John'
                onChangeText={(firstName) => this.props.setField({firstName})}
                value={firstName}
              />
              <Text style={styles.label}>last name</Text>
              <TextInput
                style={styles.textInput}
                placeholder='Smith'
                onChangeText={(lastName) => this.props.setField({lastName})}
                value={lastName}
              />
              <Text style={styles.label}>email</Text>
              <TextInput
                style={styles.textInput}
                autoCorrect={false}
                textContentType='emailAddress'
                placeholder='me@john.com'
                onChangeText={(email) => this.props.setField({email})}
                value={email}
              />
              <Text style={styles.label}>password</Text>
              <TextInput
                style={styles.textInput}
                autoCorrect={false}
                textContentType='password'
                password
                secureTextEntry={true}
                placeholder='********'
                onChangeText={(password) => this.props.setField({password})}
                value={password}
              />
              <Animatable.Text
                style={{
                  ...styles.mainText,
                  fontSize: 18,
                  color: '#f56f68',
                  marginBottom: 8,
                  marginTop: 8
                }}
              >
                { this.state.message }
              </Animatable.Text>

              <TouchableOpacity
                style={styles.mainButton}
                onPress={this.handleSubmit}
              >
                <Text style={{
                  ...styles.mainText,
                  fontSize: 25
                }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </KeyboardAwareScrollView>
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
  mainButton: {
    backgroundColor: '#f56f68',
    padding: 7,
    width: '100%',
    alignItems: 'center',
    borderRadius: 7,
    borderColor: '#f56f68',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10
  },
  textInput: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f56f68',
    width: '100%',
    height: 65,
    fontSize: 20,
    marginBottom: 20
  },
  label: {
    alignSelf: 'flex-start',
    color: '#f56f68',
    fontSize: 24,
    marginTop: 3
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
  head: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '45%',
    left: 0,
    right: 0
  },
  body: {
    flex: 1,
    marginTop: Dimensions.get('window').height / 3,
    minHeight: Dimensions.get('window').height / 1.5
  },
  form: {
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
    padding: 25
  }
});

const mapStateToProps = state => ({
  data: state.signUp
});
const mapDispatchToProps = {
  setField,
  setDefault
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);