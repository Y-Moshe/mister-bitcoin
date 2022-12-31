import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FormGroup, InputGroup, Button } from '@blueprintjs/core'

import { contactService } from '../services/contact.service'

export default function ContactEdit() {
  const [contact, setContact] = useState(contactService.getEmptyContact())
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const contactId = params.id
    contactId && loadContact(contactId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const loadContact = async (contactId) => {
    setIsLoading(true)
    try {
      const contact = await contactService.getContactById(contactId)
      setContact(contact)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (event) => {
    const { value, name } = event.target
    setContact(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsLoading(true)
    try {
      await contactService.saveContact(contact)
      navigate('/contact')
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <FormGroup label='Name'>
          <InputGroup
            intent='primary'
            disabled={isLoading}
            name='name'
            placeholder='Type a name'
            value={contact.name}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label='E-Mail'>
          <InputGroup
            intent='primary'
            type='email'
            disabled={isLoading}
            name='email'
            placeholder='Type email'
            value={contact.email}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label='Phone'>
          <InputGroup
            intent='primary'
            disabled={isLoading}
            name='phone'
            placeholder='Type phone number'
            value={contact.phone}
            onChange={handleChange}
          />
        </FormGroup>

        <section className='flex justify-between'>
          <Link to={'/contact'} replace>
            <Button icon='arrow-left' intent='primary' disabled={isLoading} />
          </Link>
          <Button
            style={{ width: 200 }}
            type='submit'
            intent='success'
            disabled={isLoading}
            loading={isLoading}>Save</Button>
        </section>
      </form>
    </section>
  )
}
