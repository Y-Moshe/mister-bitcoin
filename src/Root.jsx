import { Outlet } from 'react-router-dom'

import './assets/styles/main.scss'
import AppHeader from './components/AppHeader'

function Root() {
  return (
    <div className="main-layout">
      <AppHeader />
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
}

export default Root