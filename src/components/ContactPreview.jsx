import React from 'react'
import { Link } from 'react-router-dom'
import profileImg from '../assets/img/profile.png'

export default function ContactPreview({ contact }) {
  return (
    <Link to={'/contact/' + contact._id}>
      <article className='contact-preview'>
        <img src={profileImg} alt="profile img" className='img-size-56' />
        {contact.name}
      </article>
    </Link>
  )
}
