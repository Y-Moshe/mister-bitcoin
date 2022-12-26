import { Switch } from 'react-router-dom'
import routes from './routes'

import './assets/styles/main.scss'
import AppHeader from './components/AppHeader'

function Root() {
  return (
    <div className="main-layout">
      <AppHeader />
      <Switch>
        { routes }
      </Switch>
      <footer>Footer</footer>
    </div>
  );
}

export default Root