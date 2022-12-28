import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { Icon } from '@blueprintjs/core'

import { bitcoinService } from '../services/bitcoin.service'
import profileImg from '../assets/img/profile.png'
import MoveList from '../components/MoveList'
import Chart from '../components/Chart'

class HomePage extends Component {
  state = {
    BTCRate: 0
  }

  componentDidMount() {
    if (this.props.loggedInUser) {
      const { coins } = this.props.loggedInUser
      this.setBTCRate(coins)
    }
  }

  setBTCRate = async (coins) => {
    const rate = await bitcoinService.getRate(coins)
    this.setState({ BTCRate: rate })
  }

  getTransfersChartData = () => {
    return this.props.loggedInUser.moves.map(({ amount, at, contact }) => {
      return {
        month: moment(new Date(at)).format('DD/MM hh:mm'),
        coins: amount,
        contactName: contact.name
      }
    })
  }

  render() {
    const user = this.props.loggedInUser
    const { BTCRate } = this.state
    if (!user) return <Redirect to='/signup' />

    const last3Moves = user.moves.slice(0, 3)

    return (
      <div className='home-page'>
        <article className='text-center'>
          <img src={profileImg} alt='profile img' className='img-size-256' />
          <h1>Hello {user.name}</h1>
          <p><Icon icon='dollar' /> {user.coins}</p>
          <p>BTC: {BTCRate}</p>
        </article>
        <MoveList title='Your last 3 transfers' moves={last3Moves} renderTo />
        <Chart
          title='Your transfers'
          type='transfers'
          data={this.getTransfersChartData()}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ userModule }) => ({
  loggedInUser: userModule.loggedInUser
})

export default connect(mapStateToProps)(HomePage)