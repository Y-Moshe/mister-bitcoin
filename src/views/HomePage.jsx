import React, { useState, useEffect, useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Icon } from '@blueprintjs/core'

import { bitcoinService } from '../services/bitcoin.service'
import profileImg from '../assets/img/profile.png'
import MoveList from '../components/MoveList'
import Chart from '../components/Chart'
import { useSettings } from '../hooks'

export default function HomePage() {
  const [BTCRate, setBTCRate] = useState(0)
  const [settings] = useSettings()

  const chartColor = useMemo(() => {
    return settings?.isDark ? '#E5E8EB' : '#404854'
  }, [settings])

  const { loggedInUser } = useSelector(({ userModule }) => userModule)

  useEffect(() => {
    if (loggedInUser) {
      const { coins } = loggedInUser
      loadBTCRate(coins)
    }
  }, [loggedInUser])

  const loadBTCRate = async (coins) => {
    const rate = await bitcoinService.getRate(coins)
    setBTCRate(rate)
  }

  const getTransfersChartData = () => {
    return loggedInUser.moves.map(({ amount, at, contact }) => {
      return {
        month: moment(new Date(at)).format('DD/MM hh:mm'),
        coins: amount,
        contactName: contact.name
      }
    })
  }

  if (!loggedInUser) return <Navigate to='/signup' />

  const last3Moves = loggedInUser.moves.slice(0, 3)

  return (
    <div className='home-page'>
      <article className='text-center'>
        <img src={profileImg} alt='profile img' className='img-size-256' />
        <h1>Hello {loggedInUser.name}</h1>
        <p><Icon icon='dollar' /> {loggedInUser.coins}</p>
        <p>BTC: {BTCRate}</p>
      </article>
      <MoveList title='Your last 3 transfers' moves={last3Moves} renderTo />
      <Chart
        title='Your transfers'
        type='transfers'
        color={chartColor}
        data={getTransfersChartData()}
      />
    </div>
  )
}