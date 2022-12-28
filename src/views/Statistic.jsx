import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { bitcoinService } from '../services/bitcoin.service'
import Chart from '../components/Chart'

export default function Statistic() {
  const [marketChartData, setMarketChartData] = useState(null)
  const [transactionsChartData, setTransactionsChartData] = useState(null)

  useEffect(() => {
    loadMarketChart()
    loadTransactionsChart()
  }, [])

  const loadMarketChart = async () => {
    const data = await bitcoinService.getMarketPrice()
    data.values = data.values.map(({ x, y }) => {
      return {
        month: moment(new Date(x * 1000)).format('MMM DD'),
        USD: y
      }
    }).slice(0, 10)

    setMarketChartData(data)
  }

  const loadTransactionsChart = async () => {
    const data = await bitcoinService.getConfirmedTransactions()
    data.values = data.values.map(({ x, y }) => {
      return {
        month: moment(new Date(x * 1000)).format('MMM DD'),
        BIT: y
      }
    }).slice(0, 150)

    setTransactionsChartData(data)
  }

  return (
    <div className='flex column justify-center align-center'>
      <Chart
        type="marketPrice"
        title={marketChartData?.name}
        description={marketChartData?.description}
        data={marketChartData?.values} />
      <Chart
        type="transactions"
        title={transactionsChartData?.name}
        description={transactionsChartData?.description}
        data={transactionsChartData?.values} />
    </div>
  )
}