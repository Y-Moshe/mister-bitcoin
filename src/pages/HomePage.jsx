import React, { Component } from 'react'
import { Icon, Spinner } from '@blueprintjs/core'

import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'

export default class HomePage extends Component {
  state = {
    user: null,
    BTCRate: 0
  }

  componentDidMount() {
    const user = userService.getUser()
    this.setState({ user }, () => this.setBTCRate(user.coins))
  }

  setBTCRate = async (coins) => {
    const rate = await bitcoinService.getRate(coins)
    this.setState({ BTCRate: rate })
    console.log(rate);
  }

  render() {
    const { user, BTCRate } = this.state
    if (!user) return <Spinner intent='primary' />
    return (
      <div>
        <h1>Hello {user.name}</h1>
        <p><Icon icon='dollar' /> {user.coins}</p>
        <p>BTC: {BTCRate}</p>
      </div>
    )
  }
}