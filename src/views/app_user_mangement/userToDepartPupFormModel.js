/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import api from '../../core/axiosConfig'
import utilitieSweetalert from '../../core/utilities/utilitieSweetalert2'
import { CFormSelect } from '@coreui/react'

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
    } else {
      api({ url: `Department`, method: 'put', data }).then((response) => {
        if (response.data.code === 201) {
          utilitieSweetalert().msgSwl('Good job!', response.data.description, 'success')
        } else utilitieSweetalert().msgSwl('sorry!', '' + response.data.description, 'error')
      })
    }
  }
  //-------------------end: post & put & delete methods -------------------//

  //-------------------start: actions methods -------------------//
  const [show, setShow] = useState(false)
  const handleClose = () => {
    if (show) setShow(false)
    if (userToDeptIsOpen) setUserToDeptIsOpen(false)
    if (headOfDeptIsOpen) setHeadOfDeptIsOpen(false)
  }
  //-------------------end: actions methods -------------------//

  //-------------------start: validation Schema methods -------------------//
  //validation Schema Add & put
  const changPasswdValidationSchema = Yup.object({
    departmentId: Yup.string().required(),
  })
  //-------------------end: validation Schema methods -------------------//
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
      </Modal>
    </>
  )
}
export default UserToDepartPupFormModel
