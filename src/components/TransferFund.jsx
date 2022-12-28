import React, { Component } from 'react'
import { FormGroup, InputGroup, Button } from '@blueprintjs/core'

export default class TransferFund extends Component {
  state = {
    amount: 0,
    isLoading: false,
    transferError: ''
  }

  handleChange = ({ target }) => {
    this.setState({ amount: +target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { maxCoins } = this.props
    const { amount } = this.state
    if (maxCoins < amount) return this.setState({ transferError: `Can't make transfer (You own ${maxCoins}) coins!` })


    this.setState({ isLoading: true })
    setTimeout(() => {
      this.props.onTransferCoins(amount)
      this.setState({
        isLoading: false,
        transferError: ''
      })
    }, 1000)
  }

  render() {
    const { transferError } = this.state
    return (
      <form onSubmit={this.handleSubmit} className='transfer-fund'>
        <FormGroup label='Enter amount to transfer' intent={transferError ? 'danger' : 'warning'} helperText={transferError}>
          <InputGroup
            fill
            type='number'
            intent={transferError ? 'danger' : 'warning'}
            name='amount'
            min={1}
            // max={this.props.maxCoins} // error is displayed instead
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
