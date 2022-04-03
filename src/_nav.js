import React from 'react'
import CIcon from '@coreui/icons-react'
import { IsAdmin } from './core/gards/authGard'
import { decoded } from './core/services/authService'
import { cilFolder, cilSpeedometer, cilStar, cilUser } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = (token) => {
  return [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      badge: {
        color: 'info',
        text: '',
      },
    },
    {
      component: CNavItem,
      name: 'User Management',
      to: '/use-mangement',
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      hidden: IsAdmin(decoded(token)),
    },
    {
      component: CNavItem,
      name: 'Evaluation',
      to: '/evaluation',
      icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
      hidden: false,
    },
    {
      component: CNavItem,
      name: 'Department',
      to: '/department',
      icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
      hidden: IsAdmin(decoded(token)),
    },
    {
      component: CNavItem,
      name: 'Sub Department',
      to: '/sub-department',
      icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
      hidden: IsAdmin(decoded(token)),
    },
  ]
}
export default _nav
