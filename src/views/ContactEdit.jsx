import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormGroup, InputGroup, Button } from '@blueprintjs/core'

import { contactService } from '../services/contact.service'

export default class ContactEdit extends Component {
  state = {
    contact: contactService.getEmptyContact(),
    isLoading: false
  }
  contactId = null

  componentDidMount() {
    this.contactId = this.props.match.params.id
    this.contactId && this.loadContact()
  }

  loadContact = async () => {
    this.setState({ isLoading: true })
    try {
      const contact = await contactService.getContactById(this.contactId)
      this.setState({ contact })
    } catch (err) {
      console.log(err)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  handleChange = (event) => {
    const { value, name } = event.target
    this.setState(prev => ({
      contact: {
        ...prev.contact,
        [name]: value
      }
    }))
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    this.setState({ isLoading: true })
    try {
      await contactService.saveContact(this.state.contact)
      this.props.history.push('/contact')
    } catch (err) {
      console.log(err)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { contact, isLoading } = this.state
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <FormGroup label='Name'>
            <InputGroup
              intent='primary'
              disabled={isLoading}
              name='name'
              placeholder='Type a name'
              value={contact.name}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup label='Phone'>
            <InputGroup
              intent='primary'
              disabled={isLoading}
              name='phone'
              placeholder='Type phone number'
              value={contact.phone}
              onChange={this.handleChange}
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
              loading={isLoading}>Save
            </Button>
          </section>
        </form>
      </section>
    )
  }
}
