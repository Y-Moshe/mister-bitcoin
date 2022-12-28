import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {
  Navbar, NavbarGroup, Alignment,
  Button, Position, Menu,
  MenuItem, MenuDivider,
  Switch, Icon
} from '@blueprintjs/core'
import { Popover2 as Popover } from '@blueprintjs/popover2'
import MediaQuery from 'react-responsive'

import BitcoinIcon from './Icons/BitcoinIcon'
import { logoutUser } from '../store/actions/user.actions'

const links = [
  {
    href: '/home',
    text: 'Home',
    icon: 'home'
  },
  {
    href: '/contact',
    text: 'Contact',
    icon: 'id-number'
  },
  {
    href: '/statistic',
    text: 'Statistics',
    icon: 'timeline-bar-chart'
  }
]

function AppHeader(props) {
  const [isUserNavOpen, setIsUserNavOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const isNavActive = (path) => {
    const currentPath = props.location.pathname
    return currentPath === path
  }

  const handleDarkModeChange = ({ target }) => setIsDark(target.checked)
  const openUserNav = () => setIsUserNavOpen(true)
  const closeUserNav = () => setIsUserNavOpen(false)

  const handleLogout = () => {
    props.logoutUser()
    props.history.replace('/signup')
  }

  const isLoggedIn = props.loggedInUser
  const userName = props.loggedInUser?.name || ''

  return (
    <header className='main-header main-layout full'>
      <Navbar className='full'>
      {/* <Navbar> */}

        <NavbarGroup align={Alignment.LEFT}>
          <Navbar.Heading className='flex align-center gap-5'><BitcoinIcon />Mister-bitcoin</Navbar.Heading>
        </NavbarGroup>

        { isLoggedIn && <NavbarGroup align={Alignment.RIGHT} className='gap-5'>
          <MediaQuery minWidth={568}>
            {
              links.map(link => (
                <Link to={link.href} key={link.text}>
                  <Button
                    minimal
                    icon={link.icon}
                    text={link.text}
                    active={isNavActive(link.href)}
                  />
                </Link>
              ))
            }
          </MediaQuery>

          <Navbar.Divider />

          <Popover
            isOpen={isUserNavOpen}
            content={UserNav({
              userName,
              isDark,
              history: props.history,
              onDarkModeChange: handleDarkModeChange,
              onLogout: handleLogout,
              isNavActive: isNavActive
            })}
            position={Position.BOTTOM_RIGHT}
            onClose={closeUserNav}
            interactionKind='hover'
            onInteraction={openUserNav}>
            <Button minimal icon='cog' onClick={openUserNav} />
          </Popover>

        </NavbarGroup>}
      </Navbar>
    </header>
  )
}

function UserNav({ userName, isDark, onDarkModeChange, history, isNavActive, onLogout }) {
  const darkIcon = <Icon icon='contrast' color={isDark ? 'darkblue' : 'gold'} />
  const darkSwitch = <Switch checked={isDark} onChange={onDarkModeChange} style={{ margin: 0 }} />

  return (
    <Menu onClick={ev => ev.stopPropagation()}>
      <MediaQuery maxWidth={567}>
        {
          links.map(link => (
            <MenuItem key={link.text} text={
              <Button
                alignText='left'
                minimal fill
                icon={link.icon}
                text={link.text}
                onClick={() => history.push(link.href)}
                active={isNavActive(link.href)}
              />
            }>
            </MenuItem>
          ))
        }
        <MenuDivider />
      </MediaQuery>

      <MenuItem icon='user' text={userName} onClick={() => history.push('/home')} />
      <MenuItem icon={darkIcon} text={darkSwitch} />
      <MenuDivider />
      <MenuItem icon='log-out' text='Log-out' intent='danger' onClick={onLogout} />
    </Menu>
  )
}

const mapStateToProps = ({ userModule }) => ({
  loggedInUser: userModule.loggedInUser
})

const mapDispatchToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppHeader))