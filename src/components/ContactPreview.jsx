import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { ButtonGroup, Button } from '@blueprintjs/core'

import profileImg from '../assets/img/profile.png'

function ContactPreview({ contact, onRemove, history }) {
  console.log(contact.isLoading);

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
        <img src={profileImg} alt="profile img" className='img-size-56' />
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

export default withRouter(ContactPreview)