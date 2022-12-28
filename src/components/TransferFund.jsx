import React, { Component } from 'react'
import { FormGroup, InputGroup, Button } from '@blueprintjs/core'

export default class TransferFund extends Component {
  state = {
    amount: 0,
    isSubmitted: false
  }

  handleChange = ({ target }) => {
    this.setState({ amount: +target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ isSubmitted: true })
    this.props.onTransferCoins(this.state.amount)
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
            <Button type='submit' intent='warning' disabled={this.state.isSubmitted} outlined>Transfer</Button>
          </div>
        </FormGroup>
      </form>
    )
  }
}
