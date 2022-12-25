import React from 'react'
import ContactPreview from './ContactPreview'

export default function ContactList(props) {
  const contactList = props.contacts.map(contact => (
    <li key={contact._id}>
      <ContactPreview contact={contact} />
    </li>
  ))
  return (
    <ul className='clean-list'>
      { contactList }
    </ul>
  )
}
