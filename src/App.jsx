import routes from './router'

import './assets/styles/main.scss'
import AppHeader from './components/AppHeader'

function Root() {
  return (
    <div className="main-layout">
      <AppHeader />
      { routes }
      <footer>Footer</footer>
    </div>
  );
}

export default Root