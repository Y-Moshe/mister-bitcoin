import React from 'react'
import ContactPreview from './ContactPreview'

export default function ContactList({ contacts, children, onRemove }) {
  const contactList = contacts.map(contact => (
    <li key={contact._id}>
      <ContactPreview contact={contact} onRemove={onRemove} />
    </li>
  ))
  return (
    <ul className='clean-list'>
      { children }
      { contactList }
    </ul>
  )
}
