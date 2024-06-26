/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import api from '../../core/axiosConfig'
import CIcon from '@coreui/icons-react'
import utilitieSweetalert from '../../core/utilities/utilitieSweetalert2'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import DataTable from 'react-data-table-component'
import Moment from 'moment'
import { cilOpentype, cilTrash } from '@coreui/icons'
import dataTableService from '../../core/services/serviceDataTable'
import emojesData from '../../core/data/emojesData'

const evaluationList = () => {
  //-------------------start: declare -------------------//
  const [filterText, setFilterText] = React.useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false)
  const [evaluations, setEvaluations] = useState([])
  const [pending, setPending] = useState(true)
  //use Effect
  useEffect(() => {
    async function getData() {
      evaluationsAsync().then((response) => {
        if (response.data !== null) setEvaluations(response.data)
        setPending(false)
      })
    }
    getData()
  }, [])
  //-------------------start: declare -------------------//

  //-------------------start: actions methods -------------------//
  //
  const getTitle = (number) => {
    const row = emojesData.find((x) => x.id === number)
    return row.title
  }
  //items after filter
  const filteredItems = evaluations.filter((item) => {
    return (
      (item.id && item.id.toString().includes(filterText)) ||
      (item.value && item.value.toString().includes(filterText)) ||
      (item.departmentName &&
        item.departmentName.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.subDepartmentName &&
        item.subDepartmentName.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.userName && item.userName.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.date && Moment(item.date).format('DD-MM-YYYY MM:SS').includes(filterText))
    )
  })
  //filter sub Header Component
  const subHeaderComponent = React.useMemo(() => {
    return dataTableService().subHeaderComponent({
      setResetPaginationToggle,
      setFilterText,
      filterText,
      resetPaginationToggle,
    })
  }, [filterText, resetPaginationToggle])
  //sort funcation
  const customSort = (rows, selector, direction) =>
    dataTableService().customSort(rows, selector, direction)
  //
  const deleteFormShow = async (row) => {
    utilitieSweetalert()
      .confirmSwl(
        'Are you sure?',
        "You won't be able to revert this!",
        'warning',
        'Yes, delete it!',
      )
      .then((result) => {
        if (result.value) delEvaluationAsync(row.id)
      })
  }
  //-------------------end: actions methods -------------------//

  //-------------------start: get methods -------------------//
  const evaluationsAsync = () => api({ url: 'Evaluation' })
  //-------------------end: get methods -------------------//

  //-------------------start: post & put & delete methods -------------------//
  const viewDetails = (data) => {
    utilitieSweetalert().msgSwl(
      'view details!',
      `<p><strong>Phone:</strong>   ${
        data.phoneNumber === '' ? 'No text' : data.phoneNumber
      } </p><br /><strong>Note:</strong> ${data.note === '' ? 'No text' : data.note} <p></p>`,
      'success',
    )
  }
  const delEvaluationAsync = async (id) => {
    api({ url: `Evaluation/${id}`, method: 'delete' }).then((response) => {
      if (response.data.code === 202) {
        evaluationsAsync().then((response) => {
          if (response.data !== null) setEvaluations(response.data)
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
      name: 'Value',
      selector: (row) => getTitle(row.value),
      sortable: true,
    },
    {
      name: 'Department Name',
      selector: (row) => row.departmentName,
      sortable: true,
    },
    {
      name: 'Sub Department Name Name',
      selector: (row) => row.subDepartmentName,
      sortable: true,
    },
    {
      name: 'User Name',
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row) => Moment(row.date).format('DD-MM-YYYY MM:SS'),
      sortable: true,
    },
    {
      cell: (row) => (
        <>
          <CButton color="danger" onClick={() => deleteFormShow(row)}>
            <CIcon icon={cilTrash} className="me-2" />
          </CButton>
          <CButton color="success" onClick={() => viewDetails(row)} hidden={row.value !== 44}>
            <CIcon icon={cilOpentype} className="me-2" />
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
            <strong>Evaluations</strong> <small>list</small>
          </CCardHeader>
          <CCardBody>
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
export default evaluationList
