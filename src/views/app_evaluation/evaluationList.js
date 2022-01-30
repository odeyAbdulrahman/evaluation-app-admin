/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import api from '../../core/axiosConfig'
import CIcon from '@coreui/icons-react'
import utilitieSweetalert from '../../core/utilities/utilitieSweetalert2'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import DataTable from 'react-data-table-component'
import Moment from 'moment'
import { cilTrash } from '@coreui/icons'

const evaluationList = () => {
  //-------------------start: declare -------------------//
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
  const caseInsensitiveSort = (rowA, rowB) => {
    return 0
  }
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
      sortFunction: caseInsensitiveSort,
    },
    {
      name: 'Value',
      selector: (row) => row.value,
      sortable: true,
      sortFunction: caseInsensitiveSort,
    },
    {
      name: 'Department Name',
      selector: (row) => row.departmentName,
      sortable: true,
      sortFunction: caseInsensitiveSort,
    },
    {
      name: 'Department Name Ar',
      selector: (row) => row.departmentNameAr,
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
      name: 'User Name Ar',
      selector: (row) => row.userNameAr,
      sortable: true,
      sortFunction: caseInsensitiveSort,
    },
    {
      name: 'Date',
      selector: (row) => Moment(row.date).format('DD-MM-YYYY MM:SS'),
      sortable: true,
      sortFunction: caseInsensitiveSort,
    },
    {
      cell: (row) => (
        <>
          <CButton color="danger" onClick={() => deleteFormShow(row)}>
            <CIcon icon={cilTrash} className="me-2" />
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
              data={evaluations}
              selectableRows
              pagination
              progressPending={pending}
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
