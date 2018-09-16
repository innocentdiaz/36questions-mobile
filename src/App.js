import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import store from './redux';
import { fetchUser } from './redux/actions/userActions';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';

registerScreens(Provider, store)

export const startApplication = () => {
  AsyncStorage.getItem('@TSQ:auth_token')
  .then(val => {
    store.dispatch(fetchUser(val))
    loggedInView()
  })
  .catch(err => {
    AsyncStorage.removeItem('@TSQ:auth_token')
    Onboarding()
  })
}

const Onboarding = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'app.Onboarding',
            passProps: {
              loginCb: authToken => {
                AsyncStorage.setItem('@TSQ:auth_token', authToken);
                loggedInView()
              }
            }
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

const loggedInView = () => {
  console.log('HERE')
  Navigation.setRoot({
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

export const matchingView = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'app.Matching'
          }
        }]
      }
    }
  })
}

export const roomView = roomID => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'app.Room',
            passProps: {
              roomID
            }
          }
        }]
      }
    }
  })
}