import React, { Component } from 'react'
import moment from 'moment'

import { bitcoinService } from '../services/bitcoin.service'
import Chart from '../components/Chart'

export default class Statistic extends Component {
  state = {
    marketChartData: [],
    transactionsChartData: []
  }

  componentDidMount() {
    this.loadMarketChart()
    this.loadTransactionsChart()
  }

  loadMarketChart = async () => {
    const { values } = await bitcoinService.getMarketPrice()

    const data = values.map(({ x, y }) => {
      return {
        month: moment(new Date(x * 1000)).format('MMM DD'),
        USD: y
      }
    })

    setTimeout(() => this.setState({ marketChartData: data }), 1000)
  }

  loadTransactionsChart = async () => {
    const { values } = await bitcoinService.getConfirmedTransactions()

    const data = values.map(({ x, y }) => {
      return {
        month: moment(new Date(x * 1000)).format('MMM DD'),
        BIT: y
      }
    })

    setTimeout(() => this.setState({ transactionsChartData: data }), 1000)
  }

  render() {
    const { marketChartData, transactionsChartData } = this.state

    return (
      <div>
        <Chart type="marketPrice" data={marketChartData} />
        <Chart type="transactions" data={transactionsChartData} />
      </div>
    )
  }
}