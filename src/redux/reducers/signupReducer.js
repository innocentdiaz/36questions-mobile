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
    case 'TOGGLE_INTEREST':
      let gender = action.payload
      let oldInterests = state.interests
      let newInterests = oldInterests.includes(gender) ? oldInterests.filter(g => g !== gender) : [ ...oldInterests, gender ];

      return {
        ...state,
        interests: newInterests
      }
    default:
      return state
  }
}