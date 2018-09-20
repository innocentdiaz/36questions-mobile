import { Navigation } from 'react-native-navigation'

import Landing from './Landing'
import Onboarding from './Onboarding'
import Matching from './Matching';
import Room from './Room';
import SignUp from './forms/Signup';
import SignUpGender from './forms/signup/SignUpGender';

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false
    },
    layout: {
      backgroundColor: '#f9c296'
    }
  });
});

export function registerScreens(Provider, store) {
  Navigation.registerComponentWithRedux('app.Landing', () => Landing, Provider, store)
  Navigation.registerComponentWithRedux('app.Onboarding', () => Onboarding, Provider, store)
  Navigation.registerComponentWithRedux('app.Matching', () => Matching, Provider, store)
  Navigation.registerComponentWithRedux('app.Room', () => Room, Provider, store)
  Navigation.registerComponentWithRedux('app.signUp', () => SignUp, Provider, store)
  Navigation.registerComponentWithRedux('app.signUp.gender', () => SignUpGender, Provider, store)
}