import React from 'react'
import { Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import moment from 'moment'

export default function MoveList({ title, moves, renderTo }) {
  return (
    <>
      {moves.length > 0 && <h3>{title}</h3>}
      <TransitionGroup className={'move-list'} component='section'>
        {
          moves.map(({ _id, contact, amount, at }) => (
            <CSSTransition classNames='slide-in' key={_id} timeout={500}>
              <Link to={'/contact/' + contact._id}>
                <article className='move-preview'>
                  {renderTo && <p>To: {contact.name}</p>}
                  <p>{moment(new Date(at)).fromNow()}</p>
                  <p>Amount: {amount}</p>
                </article>
              </Link>
            </CSSTransition>
          ))
        }
      </TransitionGroup>
    </>
  )
}
