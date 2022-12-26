import React, { Component } from 'react'
import moment from 'moment'

import { bitcoinService } from '../services/bitcoin.service'
import Chart from '../components/Chart'

export default class Statistic extends Component {
  state = {
    marketChartData: null,
    transactionsChartData: null
  }

  componentDidMount() {
    this.loadMarketChart()
    this.loadTransactionsChart()
  }

  loadMarketChart = async () => {
    const response = await bitcoinService.getMarketPrice()

    response.values = response.values.map(({ x, y }) => {
      return {
        month: moment(new Date(x * 1000)).format('MMM DD'),
        USD: y
      }
    }).slice(0, 10)

    this.setState({ marketChartData: response })
  }

  loadTransactionsChart = async () => {
    const response = await bitcoinService.getConfirmedTransactions()

    response.values = response.values.map(({ x, y }) => {
      return {
        month: moment(new Date(x * 1000)).format('MMM DD'),
        BIT: y
      }
    }).slice(0, 150)

    this.setState({ transactionsChartData: response })
  }

  render() {
    const { marketChartData, transactionsChartData } = this.state

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
}