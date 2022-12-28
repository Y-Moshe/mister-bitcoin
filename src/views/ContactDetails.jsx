import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spinner, Button, ButtonGroup, Alert } from '@blueprintjs/core'

import { contactService } from '../services/contact.service'
import TransferFund from '../components/TransferFund'
import { transferCoins } from '../store/actions/user.actions'
import MoveList from '../components/MoveList'

export default function ContactDetails(props) {
  const [contact, setContact] = useState(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { loggedInUser } = useSelector(({ userModule }) => userModule)
  const dispatch = useDispatch()

  useEffect(() => {
    loadContact()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadContact = async () => {
    const id = props.match.params.id
    const contact = await contactService.getContactById(id)
    setContact(contact)
  }

  const handleContactRemove = async () => {
    setIsLoading(true)
    try {
      await contactService.deleteContact(contact._id)
      props.history.replace('/contact') // so going back is not an option!
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTransferCoins = (coins) => dispatch(transferCoins(contact, coins))

  if (!contact) return <Spinner intent='primary' />
  const { coins: maxCoins, moves } = loggedInUser

  const contactMoves = moves.filter(move => move.contact._id === contact._id)

  return (
    <section style={{ maxWidth: 650, marginInline: 'auto' }}>
      <div>
        <pre>
          <h4>Name: {contact.name}</h4>
          <p>E-Mail: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
        </pre>

        <TransferFund maxCoins={maxCoins} onTransferCoins={handleTransferCoins} />
      </div>

      <section className='flex justify-between'>
        <Link to={'/contact'} replace>
          <Button icon='arrow-left' intent='primary' />
        </Link>

        <ButtonGroup>
          <Button icon='trash' intent='danger' onClick={() => setIsAlertOpen(true)}>Delete</Button>
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
        onConfirm={handleContactRemove}
        confirmButtonText='Yes'
        cancelButtonText='No'
        onCancel={() => setIsAlertOpen(false)}
        canOutsideClickCancel
      >
        <p>Are you sure to delete this?</p>
      </Alert>
    </section>
  )
}