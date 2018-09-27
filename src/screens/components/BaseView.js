import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import LoadingScreen from '../LoadingScreen';
import { Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';

class BaseView extends Component {
  render(){
    if (this.props.loading) {
      return <LoadingScreen/>
    }

    return(
      <View
        style={styles.mainContainer}
      >
        <View style={styles.topBar}>
          <Icon
            name='close'
            type='evilicons'
            color='white'
            size={40}
            onPress={() => {
              console.log('opening drwer')
              Navigation.mergeOptions('leftSideDrawer', {
                sideMenu: {
                  left: {
                    visible: true
                  }
                }
              });
            }}
          />
        </View>
        { this.props.children }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  topBar: {
    position: 'absolute',
    zIndex: 15,
    top: 18,
    left: 10,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})

export default BaseView