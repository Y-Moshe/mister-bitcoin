import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FormGroup, InputGroup, Button } from '@blueprintjs/core'

import { signupUser } from '../store/actions/user.actions'

export default function SignupPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = ({ target }) => setUserName(target.value)
  const handleSubmit = (event) => {
    event.preventDefault()

    setIsLoading(true)
    try {
      dispatch(signupUser(userName))
      navigate('/')
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='signup-page'>
      <form onSubmit={handleSubmit}>
        <FormGroup label='Name'>
          <InputGroup
            intent='primary'
            disabled={isLoading}
            name='name'
            placeholder='Type your name..'
            value={userName}
            onChange={handleChange}
          />
        </FormGroup>

        <section className='flex flex-end'>
          <Button
            style={{ width: 200 }}
            type='submit'
            intent='primary'
            disabled={isLoading}
            loading={isLoading}>Signup</Button>
        </section>
      </form>
    </section>
  )
}