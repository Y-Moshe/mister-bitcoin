import { connect } from 'react-redux'
import { Switch, Redirect } from 'react-router-dom'
import routes from './routes'
import './assets/styles/main.scss'

import AppHeader from './components/AppHeader'
import { userService } from './services/user.service'
import { setUser } from './store/actions/user.actions'

function App(props) {
  const user = userService.getLoggedInUser()
  if (user) props.setUser(user)

  return (
    <div className="main-layout">
      <AppHeader />
      <main className='main-view'>
        <Switch>
          { routes }
        </Switch>
        { !user && <Redirect to='/signup' /> }
      </main>
    </div>
  );
}

const mapDispatchToProps = {
  setUser
}

export default connect(null, mapDispatchToProps)(App)