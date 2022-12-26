import React, { Component } from 'react'
import { FormGroup, InputGroup, Spinner, SpinnerSize } from '@blueprintjs/core'

import { utilService } from '../services/util.service'

export default class ContactFilter extends Component {
  state = {
    filterBy: {
      text: ''
    }
  }

  componentDidMount() {
    this.setState({
      filterBy: utilService.deepClone(this.props.filterBy)
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState(prev => ({
      filterBy: {
        ...prev.filterBy,
        [name]: value
      }
    }), () => this.props.onChange(this.state.filterBy))
  }

  render() {
    const { filterBy } = this.state
    const loading = this.props.loading ? <Spinner size={SpinnerSize.SMALL} intent='warning' /> : null

    return (
      <section>
        <FormGroup>
          <InputGroup
            type='search'
            name='text'
            placeholder='Search contact..'
            value={filterBy.text}
            onChange={this.handleChange}
            leftIcon='search'
            rightElement={loading}
            round
          />
        </FormGroup>
      </section>
    )
  }
}
