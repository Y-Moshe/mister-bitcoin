import { ACTIONS } from '../actions/user.actions'

const INITIAL_STATE = {
  loggedInUser: null
}

export function userReducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case ACTIONS.SET_USER:
    case ACTIONS.SIGNUP_USER:
      return {
        ...state,
        loggedInUser: { ...action.user }
      }
    case ACTIONS.LOGOUT_USER:
      return {
        ...state,
        loggedInUser: null
      }

    default:
      return state;
  }
}