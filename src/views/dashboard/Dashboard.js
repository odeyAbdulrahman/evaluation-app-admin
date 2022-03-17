/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import WidgetsCounts from '../widgets/WidgetsCounts.js'
import WidgetStats from '../widgets/WidgetStats.js'
import { CRow, CCol, CFormSelect } from '@coreui/react'
import api from '../../core/axiosConfig'
import Moment from 'moment'
import WidgetsDepartmentCard from '../widgets/WidgetsDepartmentCard.js'
import WidgetsDatePicker from '../widgets/DatePicker.js'
import utilitieSweetalert from '../../core/utilities/utilitieSweetalert2'

const Dashboard = () => {
  const navigate = useHistory()
  const [counts, setCounts] = useState([])
  const [cardCounts, setCardCounts] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [departmentId, setDepartmentId] = useState(0)
  const [departments, setDepartments] = useState([])
  const [subDepartmentId, setSubDepartmentId] = useState(0)
  const [subDepartments, setSubDepartments] = useState([])

  //-------------------start: actions methods -------------------//
  //use Effect
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token === null) {
      localStorage.removeItem('token')
      navigate.push('/login')
    } else {
      departmentsAsync().then((response) => {
        if (response.data !== null) setDepartments(response.data)
      })
      CountsAsync().then((response) => {
        if (response.data !== null) setCounts(response.data)
      })
      const currentDate = new Date()
      const fromDate = Moment(currentDate, 'DD-MM-YYYY').add(-31, 'days')
      CountsByDepartmentAsync(
        1,
        -1,
        `${fromDate.format('DD')}-${fromDate.format('MM')}-${fromDate.format('YYYY')}`,
        Moment(currentDate).format('DD-MM-YYYY'),
      ).then((response) => {
        if (response.data !== null) setCardCounts(response.data)
      })
    }
  }, [])

  const FilterByDepartmentAsync = () => {
    if (departmentId !== 0) {
      const startString = Moment(startDate).format('DD-MM-YYYY')
      const toString = Moment(toDate).format('DD-MM-YYYY')
      CountsByDepartmentAsync(departmentId, subDepartmentId, startString, toString).then(
        (response) => {
          if (response.data !== null) setCardCounts(response.data)
        },
      )
    } else utilitieSweetalert().msgSwl('sorry!', 'selete the department', 'error')
  }

  //-------------------end: actions methods -------------------//

  //-------------------start: get methods -------------------//
  //get records list
  const departmentsAsync = () => api({ url: 'Department/0/1000' })
  //get data of Departments from api
  const subDepartmentsAsync = (deptId) => api({ url: `SubDepartment/${deptId}` })
  //get records list
  const CountsAsync = () => api({ url: 'Dashboard' })
  //get records list
  const CountsByDepartmentAsync = (departmentId, subDepartmentId, from, to) =>
    api({
      url: `Dashboard/${departmentId}/${subDepartmentId}/${from.toString()}/${to.toString()}`,
    })
  //-------------------end: get methods -------------------//

  return (
    <>
      <CRow className="Card-Box">
        <CCol sm={3}>
          <CRow>
            <CCol sm={6}>
              <h6>Department</h6>
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => {
                  setDepartmentId(e.target.selectedOptions[0].value)
                  setSubDepartmentId(0)
                  subDepartmentsAsync(e.target.selectedOptions[0].value).then((response) => {
                    if (response.data !== null) setSubDepartments(response.data)
                  })
                }}
              >
                <option key="0" value="">
                  --Select department--
                </option>
                {departments &&
                  departments.map((row) => (
                    <option key={row.id} value={row.id}>
                      {row.name}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
            <CCol sm={6}>
              <h6>Sub Department</h6>
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => {
                  setSubDepartmentId(e.target.selectedOptions[0].value)
                }}
              >
                <option key="0" value="">
                  {' '}
                  --Select sub department--{' '}
                </option>
                {subDepartments &&
                  subDepartments.map((row) => (
                    <option key={row.id} value={row.id}>
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
      <CRow className="Card-Box">
        <WidgetsCounts counts={counts} />
      </CRow>
      <CRow className="Card-Box">
        <WidgetStats counts={counts} />
      </CRow>
    </>
  )
}
export default Dashboard
