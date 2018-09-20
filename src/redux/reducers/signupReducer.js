const defaultState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  avatar: null,
  gender: null,
  interests: []
}

export default signupReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        ...action.payload
      }
    case 'SET_DEFAULT':
      return defaultState
    default:
      return state
  }
}