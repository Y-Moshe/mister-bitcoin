import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon, Button } from '@blueprintjs/core'

import { utilService } from '../services/util.service'
import ContactList from '../components/ContactList'
import ContactFilter from '../components/ContactFilter'
import {
  loadContacts as loadContactsFromStore, removeContact,
  setFilterBy, setContactLoading
} from '../store/actions/contact.actions'

export default function Contact() {
  const [isLoading, setIsLoading] = useState(true)

  const { contacts, filterBy } = useSelector(({ contactModule }) => contactModule)
  const dispatch = useDispatch()

  useEffect(() => {
    loadContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadContacts = async () => {
    setIsLoading(true)
    try {
      await dispatch(loadContactsFromStore())
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchChange = utilService.debounce((filterBy) => {
    dispatch(setFilterBy(filterBy))
    loadContacts()
  }, 500)

  const handleContactRemove = async (contactId) => {
    dispatch(setContactLoading(contactId, true))
    try {
      await dispatch(removeContact(contactId))
    } catch (err) {
      console.log(err)
      dispatch(setContactLoading(contactId, false))
    }
  }

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