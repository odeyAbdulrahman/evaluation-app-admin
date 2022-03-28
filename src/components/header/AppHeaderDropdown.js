/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import api from '../../core/axiosConfig'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import logo from '../../assets/images/logo.png'
import { useHistory } from 'react-router-dom'
import { AuthGard } from '../../core/gards/authGard'
import { logOut, decoded } from '../../core/services/authService'

const AppHeaderDropdown = () => {
  const navigate = useHistory()
  const [decodedToken, setDecodedToken] = useState({})
  const [myDepartments, setMyDepartments] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (AuthGard(token)) {
      setDecodedToken(decoded(token))
      myDepartmentsAsync().then((response) => {
        if (response.data.length !== 0)
          localStorage.setItem('deptId', response.data[0].departmentId)
        if (response.data.length !== 0) setMyDepartments(response.data)
      })
    }
  }, [decodedToken.unique_name])
  const myDepartmentsAsync = () => api({ url: 'DepartmentEmployee' })
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <span> {decodedToken.role} </span>
        <CAvatar src={logo} className="img-avatar" size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Name: {decodedToken.unique_name}
            <br></br>
            {myDepartments &&
              myDepartments.map((dept) => (
                <>
                  <span key={dept.id}>
                    <strong>Department: </strong>
                    {dept.departmentName}
                  </span>
                  <br></br>
                </>
              ))}
        </CDropdownHeader>
        <CDropdownItem
          onClick={() => {
            logOut()
            navigate.push('login')
          }}
        >
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
