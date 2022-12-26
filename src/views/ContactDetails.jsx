import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Spinner, Button, ButtonGroup, Alert } from '@blueprintjs/core'

import { contactService } from '../services/contact.service'

export default class ContactDetails extends Component {
  state = {
    contact: null,
    isAlertOpen: false,
    isLoading: false
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
    this.setState({ isLoading: true })
    try {
      await contactService.deleteContact(this.state.contact._id)
      this.props.history.replace('/contact') // so going back is not an option!
    } catch (err) {
      console.log(err)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { contact, isAlertOpen, isLoading } = this.state
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
            <Button icon='trash' intent='danger' onClick={() => this.setState({ isAlertOpen: true })}>Delete</Button>
            <Link to={`/contact/edit/${contact._id}`}>
              <Button icon='edit' intent='warning'>Edit</Button>
            </Link>
          </ButtonGroup>
        </section>

        <Alert
          isOpen={isAlertOpen}
          loading={isLoading}
          intent='danger'
          icon='trash'
          onConfirm={this.handleContactRemove}
          confirmButtonText='Yes'
          cancelButtonText='No'
          onCancel={() => this.setState({ isAlertOpen: false })}
          canOutsideClickCancel
        >
          <p>Are you sure to delete this?</p>
        </Alert>
      </section>
    )
  }
}
