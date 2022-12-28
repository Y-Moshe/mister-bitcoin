import React from 'react'
import moment from 'moment'

export default function MoveList({ title, moves, renderTo }) {
  return (
    <section className='move-list'>
      { moves.length > 0 && <h3>{title}</h3>}
      {
        moves.map(({ contact, amount, at }) => (
          <article key={at}>
            { renderTo && <p>To: {contact.name}</p> }
            <p>{moment(new Date(at)).fromNow()}</p>
            <p>Amount: {amount}</p>
          </article>
        ))
      }
    </section>
  )
}
