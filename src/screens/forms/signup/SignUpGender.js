import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { setField } from '../../../redux/actions/signupActions';

class SignUpGender extends Component {
  render(){
    return(
      <View>
        <Text>Hey!</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({

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