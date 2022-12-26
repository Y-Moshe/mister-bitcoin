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
      const contacts = await contactService.getContacts(this.state.filterBy)
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

  render() {
    const { contacts, filterBy, isLoading } = this.state

    return (
      <div>
        <ContactFilter
          filterBy={filterBy}
          onChange={this.handleSearchChange}
          loading={isLoading}
        />
        <ContactList contacts={contacts}>
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