import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { Icon } from '@blueprintjs/core'

import { bitcoinService } from '../services/bitcoin.service'
import profileImg from '../assets/img/profile.png'
import MoveList from '../components/MoveList'
import Chart from '../components/Chart'

function HomePage(props) {
  const [BTCRate, setBTCRate] = useState(0)

  useEffect(() => {
    if (props.loggedInUser) {
      const { coins } = props.loggedInUser
      loadBTCRate(coins)
    }
  }, [props.loggedInUser])

  const loadBTCRate = async (coins) => {
    const rate = await bitcoinService.getRate(coins)
    setBTCRate(rate)
  }

  const getTransfersChartData = () => {
    return props.loggedInUser.moves.map(({ amount, at, contact }) => {
      return {
        month: moment(new Date(at)).format('DD/MM hh:mm'),
        coins: amount,
        contactName: contact.name
      }
    })
  }

  const user = props.loggedInUser
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
        data={getTransfersChartData()}
      />
    </div>
  )
}

const mapStateToProps = ({ userModule }) => ({
  loggedInUser: userModule.loggedInUser
})

export default connect(mapStateToProps)(HomePage)