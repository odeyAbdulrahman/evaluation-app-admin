/* eslint-disable react-hooks/rules-of-hooks */
import jwt_decode from 'jwt-decode'

export const logOut = (navigate) => {
  localStorage.removeItem('token')
}

export const decoded = (token) => {
  return token !== null ? jwt_decode(JSON.parse(token)) : null
}
