const auth = (state = {
  fetching: false,
  authenticating: false,
  loggedIn: false,
  user: null,
  loginError: null
}, action) => {
  switch (action.type) {
    case 'USER_LOADING':
      return {
        ...state,
        fetching: action.payload
      }
    case 'USER_LOGGED_IN':
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      }
    case 'USER_LOGGED_OUT':
      return {
        ...state,
        loggedIn: false,
        user: null
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        loginError: action.payload
      }
    case 'AUTHENTICATING':
      return {
        ...state,
        authenticating: action.payload
      }
    default:
      return state
  }
}

export default auth