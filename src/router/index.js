import React from 'react'
import { createHashRouter, useLocation, useNavigate, useParams, } from 'react-router-dom'

import Root from '../Root'
import HomePage from '../pages/HomePage'
import ContactPage from '../pages/ContactPage'
import ContactDetailsPage from '../pages/ContactDetailsPage'
import ContactEditPage from '../pages/ContactEditPage'
import ChartPage from '../pages/ChartPage'

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'home',
        element: <HomePage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'contact/:id',
        element: <ContactDetailsPage />
      },
      {
        path: 'contact/edit/:id?',
        element: <ContactEditPage />
      },
      {
        path: 'chart',
        element: <ChartPage />
      }
    ]
  }
])

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation()
    let navigate = useNavigate()
    let params = useParams()

    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    )
  }

  return ComponentWithRouterProp
}

export default router