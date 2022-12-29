import { useSelector, useDispatch } from 'react-redux'
import { setUserSettings } from '../store/actions/user.actions'

export function useSettings() {
  const user = useSelector(({ userModule }) => userModule).loggedInUser
  const dispatch = useDispatch()

  return [
    user?.settings,
    (settings) => dispatch(setUserSettings(settings))
  ]
}