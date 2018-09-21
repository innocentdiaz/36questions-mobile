import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';

class SignUpPreview extends Component {
  render(){
    return(
      <View>

      </View>
    );
  }
};

const mapStateToProps = state => ({
  data: state.signUp
});

export default connect(
  mapStateToProps
)(SignUpPreview)