import React, { Component } from 'react'
import { FormGroup, InputGroup, Button } from '@blueprintjs/core'

export default class TransferFund extends Component {
  state = {
    ammount: 0,
    isSubmitted: false
  }

  handleChange = ({ target }) => {
    this.setState({ ammount: +target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ isSubmitted: true })
    this.props.onTransferCoins(this.state.ammount)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='transfer-fund'>
        <FormGroup label='Enter ammount to transfer'>
          <InputGroup
            fill
            type='number'
            intent='warning'
            name='ammount'
            min={1}
            max={this.props.maxCoins}
            placeholder='Ammount'
            value={this.state.ammount}
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
