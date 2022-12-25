import { Outlet } from 'react-router-dom'

import './assets/styles/main.scss'

function Root() {
  return (
    <div className="main-layout">
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
}

export default Root