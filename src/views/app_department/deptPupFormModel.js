/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import api from '../../core/axiosConfig'
import utilitieSweetalert from '../../core/utilities/utilitieSweetalert2'
import QRCode from 'qrcode'
import { saveAs } from 'file-saver'

// eslint-disable-next-line react/prop-types
const DeptPupFormModel = ({
  departmentsAsync,
  setDepartments,
  setIsOpen,
  isOpen,
  departmentModel,
  puptitle,
  setPuptitle,
}) => {
  const baseUrl = 'https://evaluationApp.dhaid.shj.ae/#/'
  const baseImg = '/assets/images/QrCode.png'
  const [show, setShow] = useState(false)
  const [url, setUrl] = useState(baseImg)
  //-------------------start: actions methods -------------------//
  const handleShow = () => {
    setShow(true)
    setPuptitle('Add new department')
  }
  //
  const handleClose = () => {
    if (show) setShow(false)
    if (isOpen) setIsOpen(false)
  }
  //
  const CreateQRCode = () => {
    QRCode.toDataURL(baseUrl + departmentModel.id)
      .then((x) => setUrl(x))
      .catch((err) => console.error(err))
  }
  //-------------------end: actions methods -------------------//

  //-------------------start: post & put & delete methods -------------------//
  //add new record or update current record in data base
  const postPutAsync = (data) => {
    if (isOpen !== true) {
      api({ url: 'Department', method: 'post', data }).then((response) => {
        if (response.data.code === 200) {
          departmentsAsync().then((response) => {
            if (response.data !== null) setDepartments(response.data)
          })
          utilitieSweetalert().msgSwl('Good job!', response.data.description, 'success')
        } else utilitieSweetalert().msgSwl('sorry!', '' + response.data.description, 'error')
      })
    } else {
      api({ url: `Department/${departmentModel.id}`, method: 'put', data }).then((response) => {
        if (response.data.code === 201) {
          departmentsAsync().then((response) => {
            if (response.data !== null) setDepartments(response.data)
          })
          utilitieSweetalert().msgSwl('Good job!', response.data.description, 'success')
        } else utilitieSweetalert().msgSwl('sorry!', '' + response.data.description, 'error')
      })
    }
  }
  //-------------------end: post & put & delete methods -------------------//

  //-------------------start: validation Schema methods -------------------//
  //validation Schema Add & put
  const validationSchema = Yup.object({
    name: Yup.string().required().min(10).max(50),
    nameAr: Yup.string().required().min(10).max(50),
    nameUr: Yup.string().required().min(10).max(50),
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
            name: departmentModel.name,
            nameAr: departmentModel.nameAr,
            nameUr: departmentModel.nameUr,
          }}
          validationSchema={validationSchema}
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
                <Form.Group className="mb-3" controlId="formQRCode" hidden={!isOpen}>
                  <img
                    className="qr-code-img"
                    src={url}
                    onClick={() => {
                      if (url.slice(0, 21) === 'data:image/png;base64') {
                        saveAs(url)
                        setUrl(baseImg)
                      } else
                        utilitieSweetalert().msgSwl('sorry!', 'Create the QR Code first', 'error')
                    }}
                  />
                  <a className="btn btn-outline-success code-btn" onClick={() => CreateQRCode()}>
                    Create QRCode
                  </a>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Depart Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <Form.Text className="text-muted">
                    {errors.name && touched.name && errors.name}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Depart Name Ar</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="nameAr"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nameAr}
                  />
                  <Form.Text className="text-muted">
                    {errors.nameAr && touched.nameAr && errors.nameAr}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Depart Name Ur</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name Ur"
                    name="nameUr"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nameUr}
                  />
                  <Form.Text className="text-muted">
                    {errors.nameUr && touched.nameUr && errors.nameUr}
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
export default DeptPupFormModel
