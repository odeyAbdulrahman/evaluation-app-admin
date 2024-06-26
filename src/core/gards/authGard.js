import { roles } from '../enums/roles'

export const AuthGard = (token) => {
  return token !== null ? true : false
}

export const HasRole = (token, roles) => {
  return roles.includes(token.role)
}

export const IsAdmin = (token) => {
  if (token === null) {
    return false
  }
  return token.role === roles.Admin ? false : true
}
