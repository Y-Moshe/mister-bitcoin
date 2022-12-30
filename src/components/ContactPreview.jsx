import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ButtonGroup, Button } from '@blueprintjs/core'

import contactImg from '../assets/img/contact.png'

export default function ContactPreview({ contact, onRemove }) {
  const history = useHistory()

  const handleDelete = (event) => {
    event.preventDefault()
    onRemove(contact._id)
  }
  
  const goToEdit = (event) => {
    event.preventDefault()
    history.push(`/contact/edit/${contact._id}`)
  }

  return (
    <Link to={'/contact/' + contact._id}>
      <article className='contact-preview'>
        <img src={contactImg} alt="contact img" className='img-size-56' />
        <p>{contact.name}</p>

        <ButtonGroup>
          <Button
            icon='trash'
            intent='danger'
            onClick={handleDelete}
            loading={contact.isLoading}
            disabled={contact.isLoading}>Delete</Button>
          <Button
            icon='edit'
            intent='warning'
            onClick={goToEdit}
            disabled={contact.isLoading}>Edit</Button>
        </ButtonGroup>
      </article>
    </Link>
  )
}