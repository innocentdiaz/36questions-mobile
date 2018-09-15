import api from '../../api';

export const fetchUser = authToken => dispatch => {
  if (!authToken) throw 'No authToken provided to fetchUser action'
  dispatch({
    type: 'SET_AUTH_TOKEN',
    payload: authToken
  });

  api.get(`/auth/${authToken}`)
  .then(res => {
    if (res.ok) {
      dispatch({
        type: 'SET_USER',
        payload: res.data
      })
    } else {
      dispatch({
        type: 'SET_USER_DEFAULT'
      })
    }
  })
}