import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, NavbarGroup, Alignment, Button } from '@blueprintjs/core'

export default function AppHeader() {
  return (
    <header className='main-header main-layout full'>
      {/* <Navbar className='full'> */}
      <Navbar>

        <NavbarGroup align={Alignment.LEFT}>
          <Navbar.Heading>Mister-bitcoin</Navbar.Heading>
        </NavbarGroup>


        <NavbarGroup align={Alignment.RIGHT} className='nav-list'>
          <NavLink to={'/home'}>
            <Button className='bp4-minimal' icon="home" text="Home" />
          </NavLink>

          <Navbar.Divider />

          <NavLink to={'/contacts'}>
            <Button className='bp4-minimal' icon="id-number" text="Contacts" />
          </NavLink>

          <Navbar.Divider />

          <NavLink to={'/charts'}>
            <Button className='bp4-minimal' icon="timeline-bar-chart" text="Charts" />
          </NavLink>
        </NavbarGroup>

      </Navbar>
    </header>
  )
}
