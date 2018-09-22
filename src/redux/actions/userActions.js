import api from '../../api';

export const fetchUser = authToken => dispatch => {
  if (!authToken) throw 'No authToken provided to fetchUser action'
  dispatch(
    setAuthToken(authToken)
  );

  console.log('will fetch using', authToken)
  api.get(`/auth/${authToken}`)
  .then(res => {
    if (res.ok) {
      console.log('just set the user')
      dispatch(
        setUser(res.data)
      )
    } else {
      console.log('could not fetch user', res)
      dispatch({
        type: 'SET_USER_DEFAULT'
      })
    }
  })
}

export const setUser = user => {
  return {
    type: 'SET_USER',
    payload: user
  }
}

export const setAuthToken = authToken => {
  return {
    type: 'SET_AUTH_TOKEN',
    payload: authToken
  }
}