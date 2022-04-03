/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import api from '../../core/axiosConfig'
import utilitieSweetalert from '../../core/utilities/utilitieSweetalert2'
import { CFormSelect, CFormSwitch } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const UserPupFormModel = ({
  usersAsync,
  setUsers,
  setIsOpen,
  isOpen,
  roles,
  userModel,
  puptitle,
  setPuptitle,
}) => {
  //-------------------start: actions methods -------------------//
  const [show, setShow] = useState(false)
  const handleShow = () => {
    setShow(true)
    setPuptitle('Add new user')
  }
  const handleClose = () => {
    if (show) setShow(false)
    if (isOpen) setIsOpen(false)
  }
  //-------------------end: actions methods -------------------//

  //-------------------start: post & put & delete methods -------------------//
  //add new record or update current record in data base
  const postPutAsync = (data) => {
    try {
      if (isOpen !== true) {
        api({ url: 'UserManage', method: 'post', data }).then((response) => {
          if (response.data.code === 200) {
            usersAsync().then((response) => {
              if (response.data !== null) setUsers(response.data)
            })
            utilitieSweetalert().msgSwl('Good job!', response.data.description, 'success')
          } else utilitieSweetalert().msgSwl('sorry!', '' + response.data.description, 'error')
        })
      } else {
        data.id = userModel.id
        api({ url: `UserManage`, method: 'put', data }).then((response) => {
          if (response.data.code === 201) {
            usersAsync().then((response) => {
              if (response.data !== null) setUsers(response.data)
            })
            utilitieSweetalert().msgSwl('Good job!', response.data.description, 'success')
          } else utilitieSweetalert().msgSwl('sorry!', '' + response.data.description, 'error')
        })
      }
    } catch (err) {
      utilitieSweetalert().msgSwl('sorry!', '' + err.message, 'error')
    }
  }
  //-------------------end: post & put & delete methods -------------------//

  //-------------------start: validation Schema methods -------------------//
  //validation Schema Add & put
  const validationSchema = Yup.object({
    userName: Yup.string().required().min(4).max(50),
    fullName: Yup.string().required().min(4).max(50),
    fullNameAr: Yup.string().required().min(4).max(50),
    email: Yup.string().email().required().min(10).max(50),
    phoneNumber: Yup.string(9).max(9).required(),
    passwordHash: Yup.string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
    rePasswordHash: Yup.string()
      .required()
      .oneOf([Yup.ref('passwordHash')], 'Passwords does not match'),
    role: Yup.string().required(),
  })
  const upValidationSchema = Yup.object({
    userName: Yup.string().required().max(50),
    fullName: Yup.string().required().max(50),
    fullNameAr: Yup.string().required().max(50),
    email: Yup.string().email().required().min(10).max(50),
    phoneNumber: Yup.string().min(9).max(9).required(),
  })
  //-------------------end: validation Schema methods -------------------//

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        New Record
      </Button>
      <Modal show={show || isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{puptitle}</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            userName: userModel.userName,
            fullName: userModel.fullName,
            fullNameAr: userModel.fullNameAr,
            email: userModel.email,
            phoneNumber: userModel.phoneNumber,
            role: userModel.role,
            availabilityStatus: userModel.availabilityStatus,
          }}
          validationSchema={isOpen !== true ? validationSchema : upValidationSchema}
          onSubmit={(values, onSubmitProps) => {
            postPutAsync(values)
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
                <Form.Group className="mb-3" controlId="userName">
                  <Form.Label>User name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter user name"
                    name="userName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userName}
                  />
                  <Form.Text className="text-muted">
                    {errors.userName && touched.userName && errors.userName}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="fullName">
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    name="fullName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                  />
                  <Form.Text className="text-muted">
                    {errors.fullName && touched.fullName && errors.fullName}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="fullNameAr">
                  <Form.Label>Full name Ar</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name ar"
                    name="fullNameAr"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullNameAr}
                  />
                  <Form.Text className="text-muted">
                    {errors.fullNameAr && touched.fullNameAr && errors.fullNameAr}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <Form.Text className="text-muted">
                    {errors.email && touched.email && errors.email}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="phoneNumber">
                  <Form.Label>phone number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="phoneNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                  />
                  <Form.Text className="text-muted">
                    {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="role" hidden={isOpen}>
                  <Form.Label>Role</Form.Label>
                  <CFormSelect
                    name="role"
                    aria-label="select role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                  >
                    <option value="">--select role--</option>
                    {roles && roles.map((role) => <option value={role.value}>{role.key}</option>)}
                  </CFormSelect>
                  <Form.Text className="text-muted">
                    {errors.role && touched.role && errors.role}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordHash" hidden={isOpen}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="passwordHash"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordHash}
                  />
                  <Form.Text className="text-muted">
                    {errors.passwordHash && touched.passwordHash && errors.passwordHash}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="rePasswordHash" hidden={isOpen}>
                  <Form.Label>Re password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Re password"
                    name="rePasswordHash"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rePasswordHash}
                  />
                  <Form.Text className="text-muted">
                    {errors.rePasswordHash && touched.rePasswordHash && errors.rePasswordHash}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="availabilityStatus">
                  <CFormSwitch
                    name="availabilityStatus"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.availabilityStatus}
                  />
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
export default UserPupFormModel
