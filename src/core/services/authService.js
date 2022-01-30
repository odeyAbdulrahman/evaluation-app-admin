/* eslint-disable react-hooks/rules-of-hooks */
import { useHistory } from 'react-router-dom'
const langService = () => {
  const navigate = useHistory()
  const logOut = (status) => {
    if (status === 401) {
      localStorage.removeItem('token')
      navigate.push('/login')
    }
    return null
  }
  return { logOut }
}
export default langService
