export const ACTIONS = {
  SET_USER: 'SET_USER'
}

export function setUser(user) {

  return async (dispatch) => {
    dispatch({ type: ACTIONS.SET_USER, user })
  }
}

// export function loginUser(username, password) {

//   return async (dispatch) => {
//     dispatch({ type: 'LOGIN_USER', user })
//   }
// }

// export function signupUser(user) {

//   return async (dispatch) => {
//     dispatch({ type: 'SIGNUP_USER', user })
//   }
// }