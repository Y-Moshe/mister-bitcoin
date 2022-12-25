import React, { Component } from 'react'
import { Spinner } from '@blueprintjs/core'

import { withRouter } from '../router'
import { contactService } from '../services/contact.service'

class ContactDetails extends Component {
  state = {
    contact: null
  }

  componentDidMount() {
    this.loadContact()
  }
  
  loadContact = async () => {
    const id = this.props.router.params.id
    const contact = await contactService.getContactById(id)
    this.setState({ contact })
  }

  render() {
    const { contact } = this.state
    if (!contact) return <Spinner intent='primary' />

    return (
      <section>
        <h4>Name: {contact.name}</h4>
        <p>E-Mail: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
      </section>
    )
  }
}

export default withRouter(ContactDetails)