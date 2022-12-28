import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FormGroup, InputGroup, Button } from '@blueprintjs/core'

import { signupUser } from '../store/actions/user.actions'

function SignupPage(props) {
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = ({ target }) => setUserName(target.value)

  const handleSubmit = (event) => {
    event.preventDefault()

    setIsLoading(true)
    try {
      props.signupUser(userName)
      props.history.push('/')
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

const mapDispatchToProps = {
  signupUser
}

export default connect(null, mapDispatchToProps)(SignupPage)