/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import jwt_decode from 'jwt-decode'
import logo from '../../assets/images/logo.png'
import { useHistory } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const navigate = useHistory()
  const [decodedToken, setDecodedToken] = useState({})
  useEffect(() => {
    if(localStorage.getItem('token') !== null){
      const token = JSON.parse(localStorage.getItem('token'))
    const decoded = jwt_decode(token)
    setDecodedToken(decoded)
    } else {
      navigate.push('/login')
    }
  }, [])

  const logOut = () => {
    localStorage.removeItem('token')
    navigate.push('/login')
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <span> {decodedToken.role} </span>
        <CAvatar src={logo} className='img-avatar' size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Name: {decodedToken.unique_name}</CDropdownHeader>
        <CDropdownItem onClick={() => logOut()}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
