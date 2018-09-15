const defaultUser = {
  firstName: 'Anon',
  lastName: 'User',
  interests: [],
  gender: null,
  authToken: null,
  authenticated: false,
  loading: true
}

export default userReducer = (state = defaultUser, action) => {
  switch(action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
        loading: false,
        authenticated: true
      }
    case "SET_USER_DEFAULT":
      return {...defaultUser, loading: false}
    case "SET_AUTH_TOKEN":
      return {
        ...state,
        authToken: action.payload
      }
    default:
      return state
  }
}