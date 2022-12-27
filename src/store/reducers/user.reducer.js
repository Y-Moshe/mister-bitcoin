import { ACTIONS } from '../actions/user.actions'

const INITIAL_STATE = {
  loggedInUser: {
    name: "Ochoa Hyde",
    coins: 100,
    moves: []
  }
}

export function userReducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case ACTIONS.SET_USER:
      const { loggedInUser } = state
      return {
        ...state,
        loggedInUser: {
          ...loggedInUser,
          ...action.user
        }
      }

    default:
      return state;
  }
}