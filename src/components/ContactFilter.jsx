import React, { useState, useEffect } from 'react'
import { FormGroup, InputGroup, Spinner, SpinnerSize } from '@blueprintjs/core'

import { utilService } from '../services/util.service'

export default function ContactFilter(props) {
  const [filterBy, setFilterBy] = useState({ text: '' })

  useEffect(() => {
    setFilterBy(utilService.deepClone(props.filterBy))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.onChange(filterBy)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBy])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFilterBy(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const loading = props.loading ? <Spinner size={SpinnerSize.SMALL} intent='warning' /> : null

  return (
    <section>
      <FormGroup>
        <InputGroup
          type='search'
          name='text'
          placeholder='Search contact..'
          value={filterBy.text}
          onChange={handleChange}
          leftIcon='search'
          rightElement={loading}
          round
        />
      </FormGroup>
    </section>
  )
}
