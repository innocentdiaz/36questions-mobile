import api from '../../api';

// We want this to be async so we can wait for a request for a user is fulfilled before moving on
export const fetchUser = authToken => async dispatch => {
  if (!authToken) {
    return dispatch({
      type: 'SET_USER_DEFAULT'
    })
  }

  dispatch(setAuthToken(authToken))

  let res = await api.get(`/auth/${authToken}`);

  if (res.ok) {
    dispatch(
      setUser(res.data)
    )
  } else {
    dispatch({
      type: 'SET_USER_DEFAULT'
    })
  }
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