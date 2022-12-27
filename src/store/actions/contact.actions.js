import { contactService } from '../../services/contact.service'

export const ACTIONS = {
  SET_CONTACTS: 'SET_CONTACTS',
  REMOVE_CONTACT: 'REMOVE_CONTACT',
  SAVE_CONTACT: 'SAVE_CONTACT',
  SET_CONTACT_LOADING: 'SET_CONTACT_LOADING',
  SET_FILTER_BY: 'SET_FILTER_BY'
}

export function loadContacts() {

  return async (dispatch, getState) => {
    try {
      const { filterBy } = getState().contactModule
      let contacts = await contactService.getContacts(filterBy)
      contacts = contacts.map(_ => ({ ..._, isLoading: false })) // add isLoading state to delete case
      dispatch({ type: ACTIONS.SET_CONTACTS, contacts })
    } catch (err) {
      console.log(err)
    }
  }
}

export function setContactLoading(contactId, loadingState) {

  return (dispatch, getState) => {
    try {
      const { contacts } = getState().contactModule
      const idx = contacts.findIndex(({ _id }) => _id === contactId)
      const contactToChange = {
        ...contacts[idx],
        isLoading: loadingState
      }
      dispatch({ type: ACTIONS.SAVE_CONTACT, contact: contactToChange })
    } catch (err) {
      console.log(err)
    }
  }
}

export function saveContact(contact) {

  return async (dispatch) => {
    try {
      await contactService.saveContact(contact)
      dispatch({ type: ACTIONS.SAVE_CONTACT, contact })
    } catch (err) {
      console.log(err)
    }
  }
}

export function removeContact(contactId) {

  return async (dispatch) => {
    try {
      await contactService.deleteContact(contactId)
      dispatch({ type: ACTIONS.REMOVE_CONTACT, contactId })
    } catch (err) {
      console.log(err)
    }
  }
}

export function setFilterBy(filterBy) {

  return (dispatch) => {
    try {
      dispatch({ type: ACTIONS.SET_FILTER_BY, filterBy: { ...filterBy } })
    } catch (err) {
      console.log(err)
    }
  }
}