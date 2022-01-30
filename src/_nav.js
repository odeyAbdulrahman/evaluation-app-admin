import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilFolder, cilSpeedometer, cilStar, cilUser } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
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
  },
  {
    component: CNavItem,
    name: 'Evaluation',
    to: '/evaluation',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Department',
    to: '/department',
    icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
  },
]
export default _nav
