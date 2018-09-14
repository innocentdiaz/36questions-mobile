import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation'
import { registerScreens } from './screens';

registerScreens()

const startApplication = () => {
  AsyncStorage.getItem('@TSQ_TOKEN')
  .then(val => {
    Onboarding()
  })
  .catch(err => {
    AsyncStorage.removeItem('@TSQ_TOKEN')
    Onboarding()
  })
}

const Onboarding = () => {
  console.log(Navigation)
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'app.Onboarding'
          }
        }],
        options: {
          topBar: {
            visible: false
          }
        }
      },
    }
  })
}

export default startApplication