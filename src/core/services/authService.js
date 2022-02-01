/* eslint-disable react-hooks/rules-of-hooks */
import { useHistory } from 'react-router-dom'
const langService = () => {
  const UNAUTHORIZED = 401
  const navigate = useHistory()
  const logOut = (status) => {
    if (status === UNAUTHORIZED) {
      localStorage.removeItem('token')
      navigate.push('/login')
    }
    return null
  }
  return { logOut }
}
export default langService
