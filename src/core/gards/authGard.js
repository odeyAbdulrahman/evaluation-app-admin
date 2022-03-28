export const AuthGard = (token) => {
  return token !== null ? true : false
}

export const HasRole = (token, roles) => {
  return roles.includes(token.role)
}
