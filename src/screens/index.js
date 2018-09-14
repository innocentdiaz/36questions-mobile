import { Navigation } from 'react-native-navigation'

import Landing from './Landing'
import Onboarding from './Onboarding';

export function registerScreens() {
  Navigation.registerComponent('app.Landing', () => Landing)
  Navigation.registerComponent('app.Onboarding', () => Onboarding)
}