import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Spinner, Button, ButtonGroup } from '@blueprintjs/core'

import { contactService } from '../services/contact.service'

export default class ContactDetails extends Component {
  state = {
    contact: null
  }

  componentDidMount() {
    this.loadContact()
  }
  
  loadContact = async () => {
    const id = this.props.match.params.id
    const contact = await contactService.getContactById(id)
    this.setState({ contact })
  }

  handleContactRemove = async () => {
    await contactService.deleteContact(this.state.contact._id)
    this.props.history.replace('/contact') // so going back is not an option!
  }

  render() {
    const { contact } = this.state
    if (!contact) return <Spinner intent='primary' />

    return (
      <section>
        <div>
          <h4>Name: {contact.name}</h4>
          <p>E-Mail: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
        </div>

        <section className='flex justify-between'>
          <Link to={'/contact'} replace>
            <Button icon='arrow-left' intent='primary' />
          </Link>

          <ButtonGroup>
            <Button icon='trash' intent='danger' onClick={this.handleContactRemove} />
            <Link to={`/contact/edit/${contact._id}`}>
              <Button icon='edit' intent='warning' />
            </Link>
          </ButtonGroup>
        </section>
      </section>
    )
  }
}
