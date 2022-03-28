import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { AuthGard, HasRole } from '../core/gards/authGard'
import { decoded } from '../core/services/authService'
import routes from '../routes'

const AppContent = () => {
  const token = localStorage.getItem('token')
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) =>
                    AuthGard(token) ? (
                      HasRole(decoded(token), route.roles) ? (
                        <route.component {...props} />
                      ) : (
                        <Redirect to="/401" />
                      )
                    ) : (
                      <Redirect to="/login" />
                    )
                  }
                />
              )
            )
          })}
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
