import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar, NavbarGroup, Alignment, Button } from '@blueprintjs/core'

export default function AppHeader() {
  const location = useLocation()

  function isNavActive(path) {
    const currentPath = location.pathname
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
