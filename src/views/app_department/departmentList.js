/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import departmentModel from '../../core/models/departmentModel'
import api from '../../core/axiosConfig'
import CIcon from '@coreui/icons-react'
import utilitieSweetalert from '../../core/utilities/utilitieSweetalert2'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import DataTable from 'react-data-table-component'
import Moment from 'moment'
import { cilPen, cilTrash } from '@coreui/icons'
import DeptPupFormModel from './deptPupFormModel'
import dataTableService from '../../core/services/serviceDataTable'

const departmentList = () => {
  //-------------------start: declare -------------------//
  const [puptitle, setPuptitle] = useState('')
  const [filterText, setFilterText] = React.useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false)
  const [departments, setDepartments] = useState([])
  const [pending, setPending] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  //use Effect
  useEffect(() => {
    async function getData() {
      departmentsAsync().then((response) => {
        if (response.data !== null) setDepartments(response.data)
        setPending(false)
      })
    }
    getData()
  }, [])
  //-------------------End: declare -------------------//

  //-------------------start: actions methods -------------------//
  //items after filter
  const filteredItems = departments.filter((item) => {
    return (
      (item.id && item.id.toString().includes(filterText)) ||
      (item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.nameAr && item.nameAr.toLowerCase().includes(filterText.toLowerCase()))
    )
  })
  //filter sub Header Component
  const subHeaderComponent = React.useMemo(
    () =>
      dataTableService().subHeaderComponent({
        setResetPaginationToggle,
        setFilterText,
        filterText,
        resetPaginationToggle,
      }),
    [filterText, resetPaginationToggle],
  )
  //sort funcation
  const customSort = (rows, selector, direction) =>
    dataTableService().customSort(rows, selector, direction)
  //edit form btn
  const editFromShow = (data) => {
    departmentModel.id = data.id
    departmentModel.name = data.name
    departmentModel.nameAr = data.nameAr
    departmentModel.nameUr = data.nameUr
    setIsOpen(true)
    setPuptitle('Edit department info')
  }
  //delete form btn
  const deleteFormShow = (row) => {
    utilitieSweetalert()
      .confirmSwl(
        'Are you sure?',
        "You won't be able to revert this!",
        'warning',
        'Yes, delete it!',
      )
      .then((result) => {
        if (result.value) delDepartmentsAsync(row.id)
      })
  }
  //-------------------end: actions methods -------------------//

  //-------------------start: get methods -------------------//
  //get records list
  const departmentsAsync = () => api({ url: 'Department/0/1000' })
  //-------------------end: get methods -------------------//

  //-------------------start: post & put & delete methods -------------------//
  //delete current record
  const delDepartmentsAsync = (id) => {
    api({ url: `Department/${id}`, method: 'delete' }).then((response) => {
      if (response.data.code === 202) {
        departmentsAsync().then((response) => {
          if (response.data !== null) setDepartments(response.data)
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
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Name ar',
      selector: (row) => row.nameAr,
      sortable: true,
    },
    {
      name: 'Name ur',
      selector: (row) => row.nameUr,
      sortable: true,
    },
    {
      name: 'Head of Department Name',
      selector: (row) => row.departmentHeadName,
      sortable: true,
    },
    {
      name: 'Head of Department Name (Ar)',
      selector: (row) => row.departmentHeadNameAr,
      sortable: true,
    },
    {
      name: 'Created by',
      selector: (row) => row.createdName,
      sortable: true,
    },
    {
      name: 'Updated by',
      selector: (row) => row.updatedName,
      sortable: true,
    },
    {
      name: 'Created Date',
      selector: (row) => Moment(row.createdDate).format('DD-MM-YYYY MM:SS'),
      sortable: true,
    },
    {
      name: 'Updated Date',
      selector: (row) => Moment(row.updatedDate).format('DD-MM-YYYY MM:SS'),
      sortable: true,
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
        </>
      ),
    },
  ]
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>departments</strong> <small>list</small>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={12}>
                <DeptPupFormModel
                  departmentsAsync={departmentsAsync}
                  setDepartments={setDepartments}
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                  departmentModel={departmentModel}
                  puptitle={puptitle}
                  setPuptitle={setPuptitle}
                />
              </CCol>
            </CRow>
            <DataTable
              columns={columns}
              data={filteredItems}
              sortFunction={customSort}
              selectableRows
              pagination
              progressPending={pending}
              subHeader
              subHeaderComponent={subHeaderComponent}
              persistTableHead
              highlightOnHover
              pointerOnHover
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default departmentList
