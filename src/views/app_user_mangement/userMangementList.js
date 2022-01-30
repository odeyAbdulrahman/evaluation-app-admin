/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import userModel from '../../core/models/userModel'
import api from '../../core/axiosConfig'
import CIcon from '@coreui/icons-react'
import utilitieSweetalert from '../../core/utilities/utilitieSweetalert2'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CFormSelect } from '@coreui/react'
import DataTable from 'react-data-table-component'
import Moment from 'moment'
import { cilPen, cilTrash, cilReload, cilFolder, cilFolderOpen } from '@coreui/icons'
import UserPupFormModel from './userPupFormModel'
import UserToDepartPupFormModel from './userToDepartPupFormModel'
import ChangePasswordPupFormModel from './changePasswordPupFormModel'
import { useHistory } from 'react-router-dom'

const userMangmentList = () => {
  const navigate = useHistory()
  //-------------------start: declare -------------------//
  const [roles, setRoles] = useState([])
  const [users, setUserMangment] = useState([])
  const [departments, setDepartments] = useState([])
  const [pending, setPending] = useState(true)
  const [HeadOfDeptIsOpen, setHeadOfDeptIsOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [changePasswordIsOpen, setChangePasswordIsOpen] = useState(false)
  const [userToDeptIsOpen, setUserToDeptIsOpen] = useState(false)
  //use Effect
  useEffect(() => {
    async function getData() {
      rolesAsync().then((response) => {
        if (response.data !== null) setRoles(response.data)
        setPending(false)
      })
      departmentsAsync().then((response) => {
        if (response.data !== null) setDepartments(response.data)
        setPending(false)
      })
    }
    getData()
  }, [])
  //-------------------start: declare -------------------//

  //-------------------start: actions methods -------------------//
  //sort funcation
  const caseInsensitiveSort = (rowA, rowB) => {
    return 0
  }
  //edit form btn
  const editFromShow = (data) => {
    userModel.id = data.id
    userModel.userName = data.userName
    userModel.fullName = data.fullName
    userModel.fullNameAr = data.fullNameAr
    userModel.email = data.email
    userModel.phoneNumber = data.phoneNumber
    userModel.role = data.role
    userModel.availabilityStatus = data.availabilityStatus
    setIsOpen(true)
  }
  //delete form btn
  const deleteFormShow = async (row) => {
    utilitieSweetalert()
      .confirmSwl(
        'Are you sure?',
        "You won't be able to revert this!",
        'warning',
        'Yes, delete it!',
      )
      .then((result) => {
        if (result.value) delUserAsync(row.id)
      })
  }
  //change Password form btn
  const changePasswordFromShow = async (data) => {
    userModel.id = data.id
    setChangePasswordIsOpen(true)
  }
  //Add user To dapartment
  const userToDepartFromShow = async (data) => {
    userModel.id = data.id
    setUserToDeptIsOpen(true)
  }
  //Add user To dapartment
  const headOfDeptFromShow = async (data) => {
    userModel.id = data.id
    setHeadOfDeptIsOpen(true)
  }
  //-------------------end: actions methods -------------------//

  //-------------------start: get methods -------------------//
  const rolesAsync = () => api({ url: 'Role' })
  //
  const departmentsAsync = () => api({ url: 'Department/0/1000' })
  //
  const userMangmentAsync = (role) => api({ url: `UserManage/${role}` })
  //-------------------end: get methods -------------------//

  //-------------------start: post & put & delete methods -------------------//
  //delete current record
  const delUserAsync = async (id) => {
    api({ url: `UserManage/${id}`, method: 'delete' }).then((response) => {
      if (response.data.code === 202) {
        userMangmentAsync(roles[0].value).then((response) => {
          if (response.data !== null) setUserMangment(response.data)
          setPending(false)
        })
        utilitieSweetalert().msgSwl('Good job!', '' + response.data.description, 'success')
      } else {
        utilitieSweetalert().msgSwl('sorry!', '' + response.data.description, 'error')
      }
    })
  }
  //-------------------end: post & put & delete methods -------------------//

  //table columns
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      sortFunction: caseInsensitiveSort,
    },
    {
      name: 'User Name',
      selector: (row) => row.userName,
      sortable: true,
      sortFunction: caseInsensitiveSort,
    },
    {
      name: 'Full Name',
      selector: (row) => row.fullName,
      sortable: true,
      sortFunction: caseInsensitiveSort,
    },
    {
      name: 'Full Name Ar',
      selector: (row) => row.fullNameAr,
      sortable: true,
      sortFunction: caseInsensitiveSort,
    },
    {
      name: 'Phone Number',
      selector: (row) => `${row.countryCode} ${row.phoneNumber}`,
      sortable: true,
      sortFunction: caseInsensitiveSort,
    },
    {
      name: 'Created Date',
      selector: (row) => Moment(row.DateCreated).format('DD-MM-YYYY MM:SS'),
      sortable: true,
      sortFunction: caseInsensitiveSort,
    },
    {
      cell: (row) => (
        <>
          <CButton color="danger" onClick={() => deleteFormShow(row)}>
            <CIcon icon={cilTrash} className="me-2" />
          </CButton>
          <CButton color="success" onClick={() => editFromShow(row)}>
            <CIcon icon={cilPen} className="me-2" />
          </CButton>
          <CButton color="info" onClick={() => changePasswordFromShow(row)}>
            <CIcon icon={cilReload} className="me-2" />
          </CButton>
          <CButton color="dark" onClick={() => userToDepartFromShow(row)}>
            <CIcon icon={cilFolder} className="me-2" />
          </CButton>
          <CButton color="light" onClick={() => headOfDeptFromShow(row)}>
            <CIcon icon={cilFolderOpen} className="me-2" />
          </CButton>
        </>
      ),
    },
  ]
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User mangement</strong> <small>list</small>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={2}>
                <label>Filter User By Roles</label>
              </CCol>
              <CCol xs={8}>
                <CFormSelect
                  aria-label="-- select role --"
                  onChange={(e) => {
                    if (e.target.selectedOptions[0].value !== '') {
                      userMangmentAsync(e.target.selectedOptions[0].value).then((response) => {
                        if (response.data !== null) setUserMangment(response.data)
                        setPending(false)
                      })
                    } else utilitieSweetalert().msgSwl('sorry!', 'select role', 'error')
                  }}
                >
                  <option value="">--select role--</option>
                  {roles && roles.map((role) => <option value={role.value}>{role.key}</option>)}
                </CFormSelect>
              </CCol>
              <CCol xs={2}>
                <UserPupFormModel
                  usersAsync={userMangmentAsync}
                  setUsers={setUserMangment}
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                  roles={roles}
                  userModel={userModel}
                />
              </CCol>
            </CRow>
            <DataTable
              columns={columns}
              data={users}
              selectableRows
              pagination
              progressPending={pending}
              highlightOnHover
              pointerOnHover
            />
            <CCol xs={12}>
              <ChangePasswordPupFormModel
                changePasswordIsOpen={changePasswordIsOpen}
                setChangePasswordIsOpen={setChangePasswordIsOpen}
                userId={userModel.id}
              />
            </CCol>
            <CCol xs={12}>
              <UserToDepartPupFormModel
                setUserToDeptIsOpen={setUserToDeptIsOpen}
                setHeadOfDeptIsOpen={setHeadOfDeptIsOpen}
                userToDeptIsOpen={userToDeptIsOpen}
                headOfDeptIsOpen={HeadOfDeptIsOpen}
                departments={departments}
                userId={userModel.id}
              />
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default userMangmentList
