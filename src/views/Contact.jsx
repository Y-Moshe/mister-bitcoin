import React, { Component } from 'react'

import { contactService } from '../services/contact.service'
import ContactList from '../components/ContactList'

export default class Contact extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    this.loadContacts()
  }

  loadContacts = async () => {
    const contacts = await contactService.getContacts()
    this.setState({ contacts })
  }

  render() {
    return (
      <div>
        <ContactList contacts={this.state.contacts} />
      </div>
    )
  }
}