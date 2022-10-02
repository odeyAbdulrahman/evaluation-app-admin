/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import WidgetsCounts from '../widgets/WidgetsCounts.js'
import WidgetStats from '../widgets/WidgetStats.js'
import { CRow, CCol, CFormSelect } from '@coreui/react'
import api from '../../core/axiosConfig'
import Moment from 'moment'
import WidgetsDepartmentCard from '../widgets/WidgetsDepartmentCard.js'
import WidgetsDatePicker from '../widgets/DatePicker.js'
import { decoded } from '../../core/services/authService'

const Dashboard = () => {
  const [counts, setCounts] = useState([])
  const [cardCounts, setCardCounts] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [departmentId, setDepartmentId] = useState(0)
  const [departments, setDepartments] = useState([])
  const [subDepartmentId, setSubDepartmentId] = useState(0)
  const [subDepartments, setSubDepartments] = useState([])
  const [userRole, setUserRole] = useState({})

  //-------------------start: actions methods -------------------//
  //use Effect
  useEffect(() => {
    const token = localStorage.getItem('token')
    setUserRole(decoded(token))
    console.log(JSON.stringify(token))
    console.log(JSON.stringify(userRole))
    if (userRole.role === 'Admin') {
      departmentsAsync().then((response) => {
        console.log(JSON.stringify(response.data))
        if (response.data !== null) setDepartments(response.data)
      })
    } else {
      const deptId = localStorage.getItem('deptId')
      subDepartmentsAsync(deptId).then((response) => {
        if (response.data !== null) setSubDepartments(response.data)
      })
    }
    CountsAsync().then((response) => {
      if (response.data !== null) setCounts(response.data)
    })
  }, [userRole.unique_name])

  const FilterByDepartmentAsync = () => {
    const startString = Moment(startDate).format('DD-MM-YYYY')
    const toString = Moment(toDate).format('DD-MM-YYYY')
    if (userRole.role === 'Admin') {
      CountsByDepartmentAsync(departmentId, subDepartmentId, startString, toString).then(
        (response) => {
          if (response.data !== null) setCardCounts(response.data)
        },
      )
    } else {
      CountsBySubDepartmentAsync(subDepartmentId, startString, toString).then((response) => {
        if (response.data !== null) setCardCounts(response.data)
      })
    }
  }

  //-------------------end: actions methods -------------------//

  //-------------------start: get methods -------------------//
  const departmentsAsync = () => api({ url: `Department/0/1000` })
  //get data of Departments from api
  const subDepartmentsAsync = (deptId) => api({ url: `SubDepartment/${deptId}` })
  //get records list
  const CountsAsync = () => api({ url: 'Dashboard' })
  //get records list
  const CountsByDepartmentAsync = (departmentId, subDepartmentId, from, to) =>
    api({
      url: `Dashboard/${departmentId}/${subDepartmentId}/${from.toString()}/${to.toString()}`,
    })
  const CountsBySubDepartmentAsync = (subDepartmentId, from, to) =>
    api({
      url: `Dashboard/${subDepartmentId}/${from.toString()}/${to.toString()}`,
    })
  //-------------------end: get methods -------------------//

  return (
    <>
      <CRow className="Card-Box">
        <CCol sm={3}>
          <CRow>
            <CCol sm={6} hidden={userRole.role !== 'Admin'}>
              <h6>Department</h6>
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => {
                  setDepartmentId(e.target.selectedOptions[0].value)
                  subDepartmentsAsync(e.target.selectedOptions[0].value).then((response) => {
                    if (response.data !== null) setSubDepartments(response.data)
                  })
                }}
              >
                <option value=""> --Select Department-- </option>
                {departments &&
                  departments.map((row) => (
                    <option key={'d' + row.id} value={row.id}>
                      {row.name}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
            <CCol sm={userRole.role === 'Admin' ? 6 : 12}>
              <h6>Sub Department</h6>
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => {
                  setSubDepartmentId(e.target.selectedOptions[0].value)
                }}
              >
                <option value=""> --Select sub department-- </option>
                {subDepartments &&
                  subDepartments.map((row) => (
                    <option key={'sd' + row.id} value={row.id}>
                      {row.name}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <h6>From date</h6>
              <WidgetsDatePicker startDate={startDate} setStartDate={setStartDate} />
            </CCol>
            <CCol sm={6}>
              <h6>To date</h6>
              <WidgetsDatePicker startDate={toDate} setStartDate={setToDate} />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={12}>
              <button
                type="button"
                className="btn btn-primary custom-search-btn"
                onClick={() => FilterByDepartmentAsync()}
              >
                Submit
              </button>
            </CCol>
          </CRow>
        </CCol>
        <WidgetsDepartmentCard cardCounts={cardCounts} />
      </CRow>
      <div hidden={userRole.role !== 'Admin'}>
        <CRow className="Card-Box">
          <WidgetsCounts counts={counts} />
        </CRow>
      </div>
      <div hidden={userRole.role !== 'Admin'}>
        <CRow className="Card-Box">
          <WidgetStats counts={counts} />
        </CRow>
      </div>
    </>
  )
}
export default Dashboard
