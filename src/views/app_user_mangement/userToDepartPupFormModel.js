/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { CButton, CFormSelect } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import api from '../../core/axiosConfig'
import utilitieSweetalert from '../../core/utilities/utilitieSweetalert2'

// eslint-disable-next-line react/prop-types
const UserToDepartPupFormModel = ({
  setUserToDeptIsOpen,
  setHeadOfDeptIsOpen,
  userToDeptIsOpen,
  headOfDeptIsOpen,
  departments,
  userId,
  puptitle,
}) => {
  const [show, setShow] = useState(false)
  const [departmentsEmp, setDepartmentsEmp] = useState([])
  //use Effect
  useEffect(() => {
    async function getData() {
      departmentsEmpAsync().then((response) => {
        if (response.data !== null) setDepartmentsEmp(response.data)
      })
    }
    getData()
  }, [userId])

  //-------------------start: get methods -------------------//
  const departmentsEmpAsync = () => api({ url: `DepartmentEmployee/${userId}` })
  //-------------------end: get methods -------------------//

  //-------------------start: post & put & delete methods -------------------//
  //add new record or update current record in data base
  const UserToDeptAsync = async (data) => {
    data.userId = userId
    if (headOfDeptIsOpen !== true) {
      api({ url: 'DepartmentEmployee', method: 'post', data }).then((response) => {
        if (response.data.code === 200) {
          utilitieSweetalert().msgSwl('Good job!', response.data.description, 'success')
        } else utilitieSweetalert().msgSwl('sorry!', '' + response.data.description, 'error')
      })
    }
  }
  //delete current record
  const delDepartmentEmpAsync = async (id) => {
    api({ url: `DepartmentEmployee/${id}`, method: 'delete' }).then((response) => {
      if (response.data.code === 202) {
        departmentsEmpAsync(userId).then((response) => {
          if (response.data !== null) setDepartmentsEmp(response.data)
        })
        utilitieSweetalert().msgSwl('Good job!', '' + response.data.description, 'success')
      } else {
        utilitieSweetalert().msgSwl('sorry!', '' + response.data.description, 'error')
      }
    })
  }
  //-------------------end: post & put & delete methods -------------------//

  //-------------------start: actions methods -------------------//
  const handleClose = () => {
    if (show) setShow(false)
    if (userToDeptIsOpen) setUserToDeptIsOpen(false)
    if (headOfDeptIsOpen) setHeadOfDeptIsOpen(false)
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
        if (result.value) delDepartmentEmpAsync(row.id)
      })
  }
  //-------------------end: actions methods -------------------//

  //-------------------start: validation Schema methods -------------------//
  //validation Schema Add & put
  const changPasswdValidationSchema = Yup.object({
    departmentId: Yup.string().required(),
  })
  //-------------------end: validation Schema methods -------------------//
  //table columns
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Department Name',
      selector: (row) => row.departmentName,
      sortable: true,
    },
    {
      cell: (row) => (
        <>
          <CButton color="danger" onClick={() => deleteFormShow(row)} title="Delete Department">
            <CIcon icon={cilTrash} className="me-2" />
          </CButton>
        </>
      ),
    },
  ]
  return (
    <>
      <Modal show={headOfDeptIsOpen || userToDeptIsOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{puptitle}</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            departmentId: '',
          }}
          validationSchema={changPasswdValidationSchema}
          onSubmit={(values, onSubmitProps) => {
            UserToDeptAsync(values)
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            handleClose()
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="departmentId">
                  <Form.Label>Department</Form.Label>
                  <CFormSelect
                    name="departmentId"
                    aria-label="Select department"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.departmentId}
                  >
                    <option value="">--select department--</option>
                    {departments &&
                      departments.map((row) => (
                        <option key={row.id} value={row.id}>
                          {row.name}
                        </option>
                      ))}
                  </CFormSelect>
                  <Form.Text className="text-muted">
                    {errors.departmentId && touched.departmentId && errors.departmentId}
                  </Form.Text>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Formik>
        <DataTable
          columns={columns}
          data={departmentsEmp}
          selectableRows
          pagination
          subHeader
          persistTableHead
          highlightOnHover
          pointerOnHover
        />
      </Modal>
    </>
  )
}
export default UserToDepartPupFormModel
