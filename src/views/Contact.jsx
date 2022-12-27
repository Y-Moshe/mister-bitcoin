import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon, Button } from '@blueprintjs/core'

import { utilService } from '../services/util.service'
import ContactList from '../components/ContactList'
import ContactFilter from '../components/ContactFilter'
import {
  loadContacts, removeContact,
  setFilterBy, saveContact, setContactLoading
} from '../store/actions/contact.actions'

class Contact extends Component {
  state = {
    isLoading: true
  }

  componentDidMount() {
    this.loadContacts()
  }

  loadContacts = async () => {
    this.setState({ isLoading: true })
    try {
      await this.props.loadContacts()
    } catch (err) {
      console.log(err)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  handleSearchChange = utilService.debounce((filterBy) => {
    this.props.setFilterBy(filterBy)
    this.loadContacts()
  }, 500)

  handleContactRemove = async (contactId) => {
    this.props.setContactLoading(contactId, true)
    try {
      await this.props.removeContact(contactId)
    } catch (err) {
      console.log(err)
      this.props.setContactLoading(contactId, false)
    }
  }

  render() {
    const { contacts, filterBy } = this.props
    const { isLoading } = this.state

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

const mapStateToProps = ({ contactModule }) => ({
  contacts: contactModule.contacts,
  filterBy: contactModule.filterBy
})

const mapDispatchToProps = {
  loadContacts,
  saveContact,
  removeContact,
  setFilterBy,
  setContactLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)