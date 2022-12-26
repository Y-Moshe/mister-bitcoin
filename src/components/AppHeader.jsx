import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Navbar, NavbarGroup, Alignment, Button } from '@blueprintjs/core'

function AppHeader(props) {
  function isNavActive(path) {
    const currentPath = props.location.pathname
    return currentPath === path
  }

  return (
    <header className='main-header main-layout full'>
      {/* <Navbar className='full'> */}
      <Navbar>

        <NavbarGroup align={Alignment.LEFT}>
          <Navbar.Heading>Mister-bitcoin</Navbar.Heading>
        </NavbarGroup>


        <NavbarGroup align={Alignment.RIGHT} className='nav-list'>
          <Link to={'/home'}>
            <Button
              className='bp4-minimal'
              icon="home"
              text="Home"
              active={isNavActive('/home')} />
          </Link>

          <Navbar.Divider />

          <Link to={'/contact'}>
            <Button
              className='bp4-minimal'
              icon="id-number"
              text="Contacts"
              active={isNavActive('/contact')} />
          </Link>

          <Navbar.Divider />

          <Link to={'/statistic'}>
            <Button
              className='bp4-minimal'
              icon="timeline-bar-chart"
              text="Statistics"
              active={isNavActive('/chart')} />
          </Link>
        </NavbarGroup>

      </Navbar>
    </header>
  )
}

export default withRouter(AppHeader)