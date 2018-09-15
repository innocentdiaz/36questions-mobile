import { Navigation } from 'react-native-navigation'

import Landing from './Landing'
import Onboarding from './Onboarding'
import Matching from './Matching';
import Room from './Room';

export function registerScreens(Provider, store) {
  Navigation.registerComponentWithRedux('app.Landing', () => Landing, Provider, store)
  Navigation.registerComponentWithRedux('app.Onboarding', () => Onboarding, Provider, store)
  Navigation.registerComponentWithRedux('app.Matching', () => Matching, Provider, store)
  Navigation.registerComponentWithRedux('app.Room', () => Room, Provider, store)
}