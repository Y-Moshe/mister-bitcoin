import React, { useState, useEffect } from 'react'
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

function Contact(props) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadContacts = async () => {
    setIsLoading(true)
    try {
      await props.loadContacts()
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchChange = utilService.debounce((filterBy) => {
    props.setFilterBy(filterBy)
    loadContacts()
  }, 500)

  const handleContactRemove = async (contactId) => {
    props.setContactLoading(contactId, true)
    try {
      await props.removeContact(contactId)
    } catch (err) {
      console.log(err)
      props.setContactLoading(contactId, false)
    }
  }

  const { contacts, filterBy } = props

  return (
    <div>
      <ContactFilter
        filterBy={filterBy}
        onChange={handleSearchChange}
        loading={isLoading}
      />
      <ContactList contacts={contacts} onRemove={handleContactRemove}>
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