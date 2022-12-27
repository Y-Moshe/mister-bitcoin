import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, InputGroup, Button } from '@blueprintjs/core'

import { signupUser } from '../store/actions/user.actions'

class SignupPage extends Component {
  state = {
    userName: '',
    isLoading: false
  }

  handleChange = (event) => {
    const { value } = event.target
    this.setState({ userName: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.setState({ isLoading: true })
    try {
      this.props.signupUser(this.state.userName)
      this.props.history.push('/')
    } catch (err) {
      console.log(err)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { userName, isLoading } = this.state
    return (
      <section className='signup-page'>
        <form onSubmit={this.handleSubmit}>
          <FormGroup label='Name'>
            <InputGroup
              intent='primary'
              disabled={isLoading}
              name='name'
              placeholder='Type your name..'
              value={userName}
              onChange={this.handleChange}
            />
          </FormGroup>

          <section className='flex flex-end'>
            <Button
              style={{ width: 200 }}
              type='submit'
              intent='primary'
              disabled={isLoading}
              loading={isLoading}>Signup
            </Button>
          </section>
        </form>
      </section>
    )
  }
}

const mapDispatchToProps = {
  signupUser
}

export default connect(null, mapDispatchToProps)(SignupPage)