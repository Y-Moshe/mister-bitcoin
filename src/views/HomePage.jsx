import React, { Component } from 'react'
import { Icon, Spinner } from '@blueprintjs/core'

import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'
import profileImg from '../assets/img/profile.png'

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
      <div className='flex'>
        <article className='m-auto'>
          <img src={profileImg} alt='profile img' className='img-size-256' />
          <h1>Hello {user.name}</h1>
          <p><Icon icon='dollar' /> {user.coins}</p>
          <p>BTC: {BTCRate}</p>
        </article>
      </div>
    )
  }
}