import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  StyleSheet
} from 'react-native';
import { setUser, setAuthToken } from '../../../redux/actions/userActions';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import api from '../../../api';
import ActivityIndicator from 'react-native-activity-indicator';
import { loggedInView } from '../../../App';

class SignUpPreview extends Component {
  handleSubmit() {
    this.setState({ loading: true })

    let properties = {
      firstName,
      lastName,
      password,
      email,
      gender,
      interests
    } = this.props.data
    
    let { avatar } = this.props.data

    var formData = new FormData();
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;'
      }
    };
    for (prop in properties) {
      formData.append(prop, properties[prop])
    }
    
    if (avatar) {
      formData.append('profilePicture', { // these 3 properties are required !!!
        uri: avatar.path,
        type: avatar.mime,
        name: avatar.filename,
      }, avatar.filename)
    }

    api.post('/users', formData, config)
    .then(res => {
      this.setState({ loading: false })
      if (res.ok) {
        let { user, token } = res.data

        this.props.setUser(user)
        this.props.setAuthToken(token)

        AsyncStorage.setItem('@TSQ:auth_token', token);

        loggedInView()
      } else {
        let message = res.data ? typeof res.data.message == 'string' && res.data.message.trim().length > 1 : 'Could not create profile... Please try again later'

        Alert.alert(message)
      }
    })
  }
  interestsToReadable() {
    interests = this.props.data.interests

    if (interests.length > 1) {
      return 'Men and women'
    } else if (interests.includes('male')) {
      return 'Men'
    } else if (interests.includes('female')) {
      return 'Women'
    }
  }
  constructor(props){
    super(props);
    this.state = {
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.interestsToReadable = this.interestsToReadable.bind(this);
  };
  render(){
    let { data } = this.props

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
            color='white'
            onPress={() => Navigation.pop(this.props.componentId)}
          />
        </View>
        <View
          style={styles.head}
        >
          <View>
            <Image
              style={{
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 10,
                width: 100,
                height: 100,
                borderRadius: 50,
                borderColor: 'white',
                borderWidth: 3
              }}
              source={data.avatar ? {uri: data.avatar.path} : require('../../../images/avatar.png')}
            />
            <Text style={{
              fontSize: 20,
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              { `${data.firstName} ${data.lastName}` }
            </Text>
          </View>
        </View>
        <Animatable.View
          animation="fadeInUp"
          style={styles.body}
        >
          <TouchableOpacity
            style={styles.mainButton}
            onPress={this.handleSubmit}
            disabled={this.state.loading}
          >
            { this.state.loading ? <ActivityIndicator/> : null }
            <Text
              style={{
                color: '#f56f68',
                letterSpacing: 2,
                fontSize: 18
              }}
            >
              SIGNUP
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View
              style={styles.box}
            >
              <Text style={styles.boxLabel}>Gender</Text>
              <Text style={styles.boxContent}>{
                data.gender&&data.gender.replace(/./,data.gender.toUpperCase()[0]) 
              }</Text>
            </View>
            <View
              style={styles.box}
            >
              <Text style={styles.boxLabel}>Interested in</Text>
              <Text style={styles.boxContent}>
                {this.interestsToReadable()}
              </Text>
            </View>
            <View
              style={{ flex: 1 }}
            ></View>
          </View>
          
          <Text
            style={{
              fontSize: 26
            }}
          >
            About
          </Text>
          <Text
            style={{
              ...styles.mainText,
              fontSize: 18
            }}
          >
            { data.bio }
          </Text>
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
    backgroundColor: '#f56f68'
  },
  mainText: {
    color: '#6b6b6b'
  },
  mainButton: {
    zIndex: 20,
    backgroundColor: 'white',
    height: 42,
    paddingLeft: 35,
    paddingRight: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 21,
    position: 'absolute',
    top: -21,
    alignSelf: 'center',
    shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 0 },
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
    height: '33%',
    marginBottom: 16
  },
  body: {
    flex: 1,
    padding: 10,
    paddingTop: 36,
    backgroundColor: 'white'
  },
  box: {
    flex: 1,
    borderLeftWidth: 4,
    borderLeftColor: '#f56f68',
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15
  },
  boxLabel: {
    color: '#f56f68',
    fontSize: 18
  },
  boxContent: {
    color: '#6b6b6b',
    fontSize: 18
  }
});

const mapStateToProps = state => ({
  data: state.signUp
});
const mapDispatchToProps = {
  setUser,
  setAuthToken
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPreview)