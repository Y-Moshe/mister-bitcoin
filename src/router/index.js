import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Root from '../Root'
import HomePage from '../views/HomePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'home',
        element: <HomePage />
      }
    ]
  }
])

export default router