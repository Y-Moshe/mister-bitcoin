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
      isDark: false
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
    user.coins -= amount
    user.moves.unshift({
      _id: utilService.makeId(),
      contact,
      amount,
      at: Date.now()
    })
    saveUser(user)
  }

  return user
}

function setSettings(settings) {
  const user = getLoggedInUser()
  if (user) {
    user.settings = settings
    saveUser(user)
  }

  return user
}

function saveUser(user) {
  utilService.saveToStorage(STORAGE_KEY, user)
}

export const userService = {
  signup,
  getLoggedInUser,
  logout,
  addMove,
  setSettings
}