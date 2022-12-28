import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spinner, Button, ButtonGroup, Alert } from '@blueprintjs/core'

import { contactService } from '../services/contact.service'
import TransferFund from '../components/TransferFund'
import { transferCoins } from '../store/actions/user.actions'
import MoveList from '../components/MoveList'

class ContactDetails extends Component {
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

  handleTransferCoins = (coins) => {
    this.props.transferCoins(this.state.contact, coins)
  }

  render() {
    const { contact, isAlertOpen, isLoading } = this.state
    if (!contact) return <Spinner intent='primary' />
    const { coins: maxCoins, moves } = this.props.loggedInUser

    const contactMoves = moves.filter(move => move.contact._id === contact._id)

    return (
      <section style={{ maxWidth: 650, marginInline: 'auto' }}>
        <div>
          <pre>
            <h4>Name: {contact.name}</h4>
            <p>E-Mail: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
          </pre>

          <TransferFund maxCoins={maxCoins} onTransferCoins={this.handleTransferCoins} />
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

        <MoveList title='Transfer history' moves={contactMoves} />

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

const mapStateToProps = ({ userModule }) => ({
  loggedInUser: userModule.loggedInUser
})

const mapDispatchToProps = {
  transferCoins
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails)