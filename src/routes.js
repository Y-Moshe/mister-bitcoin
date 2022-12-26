import React from 'react'
import { v4 as uuid } from 'uuid'
import { Route, Redirect } from 'react-router-dom'

import HomePage from './views/HomePage'
import ContactPage from './views/Contact'
import ContactDetails from './views/ContactDetails'
import ContactEdit from './views/ContactEdit'
import StatisticPage from './views/Statistic'

const routes = [
  <Route key={uuid()} path={'/statistic'} component={StatisticPage} />,
  <Route key={uuid()} path={'/contact/edit/:id?'} component={ContactEdit} />,
  <Route key={uuid()} path={'/contact/:id'} component={ContactDetails} />,
  <Route key={uuid()} path={'/contact'} component={ContactPage} />,
  <Route key={uuid()} path={'/home'} component={HomePage} />,
  <Route key={uuid()} path={'/'} render={() => <Redirect to={'/home'} />} />,
]

export default routes