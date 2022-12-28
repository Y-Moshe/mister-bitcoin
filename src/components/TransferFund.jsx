import React, { Component } from 'react'
import { FormGroup, InputGroup, Button } from '@blueprintjs/core'

export default class TransferFund extends Component {
  state = {
    amount: 0,
    isLoading: false
  }

  handleChange = ({ target }) => {
    this.setState({ amount: +target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.props.onTransferCoins(this.state.amount)
      this.setState({ isLoading: false })
    }, 1000)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='transfer-fund'>
        <FormGroup label='Enter amount to transfer'>
          <InputGroup
            fill
            type='number'
            intent='warning'
            name='amount'
            min={1}
            max={this.props.maxCoins}
            placeholder='Amount'
            value={this.state.amount}
            onChange={this.handleChange}
          />

          <div className="flex flex-end">
            <Button type='submit' intent='warning' loading={this.state.isLoading} outlined>Transfer</Button>
          </div>
        </FormGroup>
      </form>
    )
  }
}
