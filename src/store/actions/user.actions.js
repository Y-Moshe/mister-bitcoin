import { userService } from '../../services/user.service'

export const ACTIONS = {
  SET_USER: 'SET_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  SIGNUP_USER: 'SIGNUP_USER'
}

export function setUser(user) {

  return (dispatch) => {
    dispatch({ type: ACTIONS.SET_USER, user })
  }
}
export function logoutUser() {

  return (dispatch) => {
    userService.logout()
    dispatch({ type: ACTIONS.LOGOUT_USER, user: null })
  }
}
export function signupUser(name) {

  return (dispatch) => {
    const user = userService.signup(name)
    dispatch({ type: ACTIONS.SIGNUP_USER, user })
  }
}