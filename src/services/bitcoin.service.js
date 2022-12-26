import { httpService } from './http.service'

function getRate(coins) {
  return httpService.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
}

function getMarketPrice() {
  return httpService.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
}

function getConfirmedTransactions() {
  return httpService.get(`https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&rollingAverage=8hours&format=json&cors=true`)
}

export const bitcoinService = {
  getRate,
  getMarketPrice,
  getConfirmedTransactions
}