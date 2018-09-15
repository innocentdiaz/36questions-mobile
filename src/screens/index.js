import { Navigation } from 'react-native-navigation'

import Landing from './Landing'
import Onboarding from './Onboarding'

export function registerScreens(Provider, store) {
  Navigation.registerComponentWithRedux('app.Landing', () => Landing, Provider, store)
  Navigation.registerComponentWithRedux('app.Onboarding', () => Onboarding, Provider, store)
}