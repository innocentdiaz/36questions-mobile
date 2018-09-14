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
        ...action.payload,
        loading: false,
        authenticated: true
      }
    case "SET_USER_DEFAULT":
      return {...defaultUser, loading: false}
    default:
      return state
  }
}