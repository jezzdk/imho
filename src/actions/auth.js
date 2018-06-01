import { firebaseApp, facebookProvider, googleProvider } from '../firebase'

export const fetchAuthInfo = () => {
  return function(dispatch) {
    dispatch(userLoading(true))

    firebaseApp.auth().onAuthStateChanged((user) => {
      dispatch(userLoading(false))

      if (user) {
        dispatch(userLoggedIn(user))

        // this.setState({
        //   authenticated: true,
        //   user: user,
        //   loading: false
        // })
      }
      else {
        dispatch(userLoggedOut())

        // this.setState({
        //   authenticated: false,
        //   user: null,
        //   loading: false
        // })
      }
    })
  }
}

export const loginWithEmailAndPassword = (email, password) => {
  return function(dispatch) {
    dispatch(authenticating(true))

    firebaseApp.auth().fetchProvidersForEmail(email).then((providers) => {
      dispatch(authenticating(false))

      if (providers.length === 0) {
        dispatch(loginError('User not found'))
      }
      else if (providers.indexOf('password') === -1) {
        // they used social login
        dispatch(loginError('Try alternative login method'))
      }
      else {
        // sign user in
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
      }
    }).catch((error) => {
      dispatch(authenticating(false))
      dispatch(loginError(error.message))
    })
  }
}

export const loginWithFacebook = () => {
  return function(dispatch) {
    dispatch(authenticating(true))

    firebaseApp.auth().signInWithPopup(facebookProvider).then(() => {
      dispatch(authenticating(false))
    }).catch((error) => {
      dispatch(authenticating(false))
      dispatch(loginError(error.message))
    })
  }
}

export const loginWithGoogle = () => {
  return function(dispatch) {
    dispatch(authenticating(true))

    firebaseApp.auth().signInWithPopup(googleProvider).then(() => {
      dispatch(authenticating(false))
    }).catch((error) => {
      dispatch(authenticating(false))
      dispatch(loginError(error.message))
    })
  }
}

export const signupWithEmailAndPassword = (name, email, password) => {
  return function(dispatch) {
    dispatch(authenticating(true))

    firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(() => {
      dispatch(authenticating(false))
    }).catch((error) => {
      dispatch(authenticating(false))
      dispatch(loginError(error.message))
    })
  }
}

export const logout = () => {
  return function(dispatch) {
    firebaseApp.auth().signOut();
  }
}

export const loginError = (message) => {
  return {
    type: 'LOGIN_ERROR',
    payload: message
  }
}

export const authenticating = (status) => {
  return {
    type: 'AUTHENTICATING',
    payload: status
  }
}

export const userLoading = (status) => {
  return {
    type: 'USER_LOADING',
    payload: status
  }
}

export const userLoggedIn = (user) => {
  return {
    type: 'USER_LOGGED_IN',
    payload: user
  }
}

export const userLoggedOut = (user) => {
  return {
    type: 'USER_LOGGED_OUT'
  }
}