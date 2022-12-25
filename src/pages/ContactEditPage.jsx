import React, { Component } from 'react'
import { Spinner, FormGroup, InputGroup, Button } from '@blueprintjs/core'

import { withRouter } from '../router'
import { contactService } from '../services/contact.service'

class ContactDetails extends Component {
  state = {
    contact: null
  }
  contactId = null

  componentDidMount() {
    this.contactId = this.props.router.params.id
    this.loadContact()
  }

  loadContact = async () => {
    const contact = await contactService.getContactById(this.contactId)
    this.setState({ contact })
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

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.contact)
  }

  render() {
    const { contact } = this.state
    if (!contact) return <Spinner intent='primary' />

    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <FormGroup label='Name'>
            <InputGroup
              name='name'
              placeholder='Type a name'
              value={contact.name}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup label='E-Mail'>
            <InputGroup
              name='email'
              placeholder='Type email'
              value={contact.email}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup label='Phone'>
            <InputGroup
              name='phone'
              placeholder='Type phone number'
              value={contact.phone}
              onChange={this.handleChange}
            />
          </FormGroup>

          <Button type='submit' intent='success'>Save</Button>
        </form>
      </section>
    )
  }
}

export default withRouter(ContactDetails)