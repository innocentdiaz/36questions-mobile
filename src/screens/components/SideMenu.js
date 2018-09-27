import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

class SideMenu extends Component {
  render(){
    return(
      <View style={styles.mainContainer}>
        <Text>Side menu!</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps
)(SideMenu)