import { ACTIONS } from '../actions/contact.actions'

const INITIAL_STATE = {
  contacts: [],
  filterBy: {
    text: ''
  }
}

export function contactReducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case ACTIONS.SET_CONTACTS:
      return {
        ...state,
        contacts: action.contacts
      }
    case ACTIONS.SAVE_CONTACT:
      let contactsToSave = [action.contact, ...state.contacts]
      if (action.contact._id) {
        contactsToSave = state.contacts.map(contact => {
          return contact._id === action.contact._id ? action.contact : contact
        })
      }
      return { ...state, contacts: contactsToSave }
    case ACTIONS.REMOVE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(({ _id }) => _id !== action.contactId)
      }
    case ACTIONS.SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...action.filterBy }
      }

    default:
      return state
  }
}