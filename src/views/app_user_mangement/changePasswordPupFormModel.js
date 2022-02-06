/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import api from '../../core/axiosConfig'
import utilitieSweetalert from '../../core/utilities/utilitieSweetalert2'

const ChangePasswordPupFormModel = ({
  changePasswordIsOpen,
  setChangePasswordIsOpen,
  userId,
  puptitle,
}) => {
  //-------------------start: post & put & delete methods -------------------//
  //add new record or update current record in data base
  const ChangePasswordAsync = async (data) => {
    data.userId = userId
    api({ url: `UserManage/ChangePassword`, method: 'put', data }).then((response) => {
      if (response.data.code === 201) {
        utilitieSweetalert().msgSwl('Good job!', response.data.description, 'success')
      } else utilitieSweetalert().msgSwl('sorry!', '' + response.data.description, 'error')
    })
  }
  //-------------------end: post & put & delete methods -------------------//

  //-------------------start: actions methods -------------------//
  const [show, setShow] = useState(false)
  const handleClose = () => {
    if (show) setShow(false)
    if (changePasswordIsOpen) setChangePasswordIsOpen(false)
  }
  //-------------------end: actions methods -------------------//

  //-------------------start: validation Schema methods -------------------//
  //validation Schema Add & put
  const changPasswdValidationSchema = Yup.object({
    passwordHash: Yup.string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
    rePasswordHash: Yup.string()
      .required()
      .oneOf([Yup.ref('passwordHash')], 'Passwords does not match'),
  })
  //-------------------end: validation Schema methods -------------------//
  return (
    <>
      <Modal show={show || changePasswordIsOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{puptitle}</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            passwordHash: '',
            rePasswordHash: '',
          }}
          validationSchema={changPasswdValidationSchema}
          onSubmit={(values, onSubmitProps) => {
            console.log('data: ' + values)
            ChangePasswordAsync(values)
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
                <Form.Group className="mb-3" controlId="passwordHash">
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
                <Form.Group className="mb-3" controlId="rePasswordHash">
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
export default ChangePasswordPupFormModel
