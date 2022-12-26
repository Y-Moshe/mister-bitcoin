import { Switch } from 'react-router-dom'
import routes from './routes'

import './assets/styles/main.scss'
import AppHeader from './components/AppHeader'

function App() {
  return (
    <div className="main-layout">
      <AppHeader />
      <main className='main-view'>
        <Switch>
          { routes }
        </Switch>
      </main>
    </div>
  );
}

export default App