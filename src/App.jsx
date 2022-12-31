import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import './assets/styles/main.scss'

import AppHeader from './components/AppHeader'
import { userService } from './services/user.service'
import { setUser } from './store/actions/user.actions'
import { useSettings } from './hooks'

export default function App() {
  const [settings] = useSettings()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const appClasses = useMemo(() => {
    const classes = ['main-layout', 'main-app']
    if (settings && settings.isDark) classes.push('bp4-dark')
    return classes
  }, [settings])

  useEffect(() => {
    const user = userService.getLoggedInUser()
    if (user) {
      dispatch(setUser(user))
      navigate('/')
    } else navigate('/signup')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={appClasses.join(' ')}>
      <AppHeader />
      <main className='main-view'>
        <Outlet />
      </main>
    </div>
  );
}