import React from 'react'
import ContactPreview from './ContactPreview'

export default function ContactList({ contacts, children }) {
  const contactList = contacts.map(contact => (
    <li key={contact._id}>
      <ContactPreview contact={contact} />
    </li>
  ))
  return (
    <ul className='clean-list'>
      { children }
      { contactList }
    </ul>
  )
}
