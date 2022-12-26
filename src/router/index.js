import React from 'react'
import { v4 as uuid } from 'uuid'
import { Route, Redirect } from 'react-router-dom'

import HomePage from '../views/HomePage'
import ContactPage from '../views/Contact'
import ContactDetails from '../views/ContactDetails'
import ContactEdit from '../views/ContactEdit'
import StatisticPage from '../views/Statistic'

const routes = [
  <Route key={uuid()} path={'/'} render={() => <Redirect to={'/home'} />} />,
  <Route key={uuid()} path={'/home'} component={HomePage} />,
  <Route key={uuid()} path={'/contact'} component={ContactPage} exact />,
  <Route key={uuid()} path={'/contact/:id'} component={ContactDetails} exact />,
  <Route key={uuid()} path={'/contact/edit/:id?'} component={ContactEdit} />,
  <Route key={uuid()} path={'/statistic'} component={StatisticPage} />,
]

export default routes