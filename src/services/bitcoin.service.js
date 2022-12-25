import { httpService } from './http.service'

function getRate(coins) {
  return httpService.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    .then(({ data }) => data)
}

function getMarketPrice() {
  
}

function getConfirmedTransactions() {

}

export const bitcoinService = {
  getRate
}