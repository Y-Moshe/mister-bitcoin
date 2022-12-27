import { utilService } from './util.service'

const STORAGE_KEY = 'loggedInUser'
const DEFAULT_USER_COINS = 100

function signup(name) {
  const user = {
    _id: utilService.makeId(),
    name,
    coins: DEFAULT_USER_COINS,
    moves: [],
    settings: {
      theme: 'light'
    }
  }

  saveUser(user)
  return user
}

function getLoggedInUser() {
  return utilService.loadFromStorage(STORAGE_KEY)
}

function logout() {
  return localStorage.removeItem(STORAGE_KEY)
}

function addMove(contact, amount) {
  const user = getLoggedInUser()
  if (user) {
    user.moves.push({
      contact,
      amount,
      at: Date.now()
    })
    saveUser(user)
  }
}

function saveUser(user) {
  utilService.saveToStorage(STORAGE_KEY, user)
}

export const userService = {
  signup,
  getLoggedInUser,
  logout,
  addMove
}