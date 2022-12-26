import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Button } from '@blueprintjs/core'

import { contactService } from '../services/contact.service'
import { utilService } from '../services/util.service'
import ContactList from '../components/ContactList'
import ContactFilter from '../components/ContactFilter'

export default class Contact extends Component {
  state = {
    contacts: [],
    filterBy: {
      text: ''
    },
    isLoading: true
  }

  componentDidMount() {
    this.loadContacts()
  }

  loadContacts = async () => {
    this.setState({ isLoading: true })
    try {
      const data = await contactService.getContacts(this.state.filterBy)
      const contacts = data.map(_ => ({ ..._, isLoading: false })) // add isLoading state to delete case
      this.setState({ contacts })
    } catch (err) {
      console.log(err)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  handleSearchChange = utilService.debounce((filterBy) => {
    this.setState(prev => ({
      filterBy: {
        ...prev.filterBy,
        ...filterBy
      },
      isLoading: true
    }), () => this.loadContacts())
  }, 500)

  removeContact = (contactId) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ _id }) => _id !== contactId)
    }))
  }

  setContactLoading = (contactId, loadingState) => {
    const idx = this.state.contacts.findIndex(({ _id }) => _id === contactId)
    const contacts = [...this.state.contacts]
    contacts[idx] = { ...contacts[idx], isLoading: loadingState }
    this.setState(({ contacts }))
  }

  handleContactRemove = async (contactId) => {
    this.setContactLoading(contactId, true)
    try {
      await contactService.deleteContact(contactId)
      this.removeContact(contactId)
    } catch (err) {
      console.log(err)
      this.setContactLoading(contactId, false)
    }
  }

  render() {
    const { contacts, filterBy, isLoading } = this.state

    return (
      <div>
        <ContactFilter
          filterBy={filterBy}
          onChange={this.handleSearchChange}
          loading={isLoading}
        />
        <ContactList contacts={contacts} onRemove={this.handleContactRemove}>
          <li>
            <Link to={'/contact/edit'}>
              <section className='contact-preview'>
                <span></span>
                <Button intent='success' large fill minimal>
                  <Icon icon='id-number' size={28} />
                  <Icon icon='plus' size={28} />
                </Button>
              </section>
            </Link>
          </li>
        </ContactList>
      </div>
    )
  }
}