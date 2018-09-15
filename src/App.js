import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import store from './redux';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';

registerScreens(Provider, store)

const startApplication = () => {
  AsyncStorage.getItem('@TSQ_TOKEN')
  .then(val => {
    store.dispatch(fetchUser(val))
    loggedInView()
  })
  .catch(err => {
    AsyncStorage.removeItem('@TSQ_TOKEN')
    Onboarding()
  })
}

const Onboarding = () => {
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
        },
        passProps: {
          loginCb: authToken => {
            AsyncStorage.setItem('@TSQ_TOKEN', authToken);
            loggedInView()
          }
        }
      },
    }
  })
}

const loggedInView = () => {
  Navifation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'app.Landing'
          }
        }]
      }
    }
  })
}

export default startApplication