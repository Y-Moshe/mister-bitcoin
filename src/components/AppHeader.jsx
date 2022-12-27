import React, { Component } from 'react'
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

class AppHeader extends Component {
  state = {
    isUserNavOpen: false,
    isDark: false
  }

  isNavActive = (path) => {
    const currentPath = this.props.location.pathname
    return currentPath === path
  }

  handleDarkModeChange = ({ target }) => {
    this.setState({ isDark: target.checked })
  }

  openUserNav = () => this.setState({ isUserNavOpen: true })
  closeUserNav = () => this.setState({ isUserNavOpen: false })

  render() {
    const { isUserNavOpen, isDark } = this.state

    return (
      <header className='main-header main-layout full'>
        <Navbar className='full'>
        {/* <Navbar> */}

          <NavbarGroup align={Alignment.LEFT}>
            <Navbar.Heading className='flex align-center gap-5'><BitcoinIcon />Mister-bitcoin</Navbar.Heading>
          </NavbarGroup>

          <NavbarGroup align={Alignment.RIGHT} className='gap-5'>
            <MediaQuery minWidth={568}>
              {
                links.map(link => (
                  <Link to={link.href} key={link.text}>
                    <Button
                      minimal
                      icon={link.icon}
                      text={link.text}
                      active={this.isNavActive(link.href)}
                    />
                  </Link>
                ))
              }
            </MediaQuery>

            <Navbar.Divider />

            <Popover
              isOpen={isUserNavOpen}
              content={UserNav({
                isDark,
                history: this.props.history,
                onDarkModeChange: this.handleDarkModeChange,
                isNavActive: this.isNavActive
              })}
              position={Position.BOTTOM_RIGHT}
              onClose={this.closeUserNav}
              interactionKind='hover'
              onInteraction={this.openUserNav}>
              <Button minimal icon='cog' onClick={this.openUserNav} />
            </Popover>

          </NavbarGroup>
        </Navbar>
      </header>
    )
  }
}

function UserNav({ isDark, onDarkModeChange, history, isNavActive }) {
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

      <MenuItem icon='user' text='Profile' />
      <MenuItem icon={darkIcon} text={darkSwitch} />
      <MenuDivider />
      <MenuItem icon='log-out' text='Log-out' intent='danger' />
    </Menu>
  )
}

export default withRouter(AppHeader)