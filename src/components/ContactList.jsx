import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ContactPreview from './ContactPreview'

export default function ContactList({ contacts, children, onRemove }) {
  const contactList = contacts.map(contact => (
    <CSSTransition classNames='slide-in' key={contact._id} timeout={500}>
      <li><ContactPreview contact={contact} onRemove={onRemove} /></li>
    </CSSTransition>
  ))
  return (
    <ul className='clean-list'>
      {children}
      <TransitionGroup>
        {contactList}
      </TransitionGroup>
    </ul>
  )
}
