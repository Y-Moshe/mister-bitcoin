import React, { useState } from 'react'
import { FormGroup, InputGroup, Button } from '@blueprintjs/core'

export default function TransferFund(props) {
  const [amount, setAmount] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [transferError, setTransferError] = useState('')

  const handleChange = ({ target }) => setAmount(+target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (props.maxCoins < amount)
      return setTransferError(`Can't make transfer (You own ${props.maxCoins}) coins!`)

    setIsLoading(true)
    setTimeout(() => {
      props.onTransferCoins(amount)
      setIsLoading(false)
      setTransferError('')
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className='transfer-fund'>
      <FormGroup label='Enter amount to transfer' intent={transferError ? 'danger' : 'warning'} helperText={transferError}>
        <InputGroup
          fill
          type='number'
          intent={transferError ? 'danger' : 'warning'}
          name='amount'
          min={1}
          // max={props.maxCoins} // error is displayed instead
          placeholder='Amount'
          value={amount}
          onChange={handleChange}
        />

        <div className="flex flex-end">
          <Button type='submit' intent='warning' loading={isLoading} outlined>Transfer</Button>
        </div>
      </FormGroup>
    </form>
  )
}
