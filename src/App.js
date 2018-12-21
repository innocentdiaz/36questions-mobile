import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import store from './redux';
import { fetchUser } from './redux/actions/userActions';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';

registerScreens(Provider, store)

export const startApplication = async () => {
  let authToken = await AsyncStorage.getItem('@TSQ:auth_token')
  
  if (authToken) {
    store.dispatch(fetchUser(authToken))
    loggedInView()
  } else {
    AsyncStorage.removeItem('@TSQ:auth_token')
    Onboarding()
  }
}

export const Onboarding = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'app.Onboarding'
          }
        }]
      },
    }
  })
}

export const loggedInView = () => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'leftSideDrawer',
            name: 'app.sideMenu',
          }
        },
        center: {
          stack: {
            options: {
              visible: true
            },
            children: [{
              component: {
                name: 'app.Landing'
              }
            }]
          }
        }
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

export const signupView = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'app.signUp'
          }
        }]
      }
    }
  })
}
