import { Navigation } from 'react-native-navigation'

import Landing from './Landing'
import Onboarding from './Onboarding';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('app.Landing', () => Landing, store, Provider)
  Navigation.registerComponent('app.Onboarding', () => Onboarding, store, Provider)
}