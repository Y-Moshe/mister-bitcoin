import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default function MoveList({ title, moves, renderTo }) {
  return (
    <section className='move-list'>
      { moves.length > 0 && <h3>{title}</h3>}
      {
        moves.map(({ _id, contact, amount, at }) => (
          <Link to={'/contact/' + contact._id} key={_id}>
            <article className='move-preview'>
              { renderTo && <p>To: {contact.name}</p> }
              <p>{moment(new Date(at)).fromNow()}</p>
              <p>Amount: {amount}</p>
            </article>
          </Link>
        ))
      }
    </section>
  )
}
