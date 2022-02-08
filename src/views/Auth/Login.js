import React, { useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Form } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import api from '../../core/axiosConfig'
import { cilLockLocked, cilUser } from '@coreui/icons'
import utilitieSweetalert from '../../core/utilities/utilitieSweetalert2'
import loginModel from '../../core/models/loginModel'
import { useHistory } from 'react-router-dom'
import logoImg from '../../assets/images/logo.png'

const Login = () => {
  const navigate = useHistory()
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      navigate.push('/dashboard')
    }
  }, [])
  //-------------------start: validation Schema methods -------------------//
  //validation Schema Add & put
  const validationSchema = Yup.object({
    userName: Yup.string().required(),
    password: Yup.string().required(),
  })
  //-------------------end: validation Schema methods -------------------//
  //-------------------start: post & put & delete methods -------------------//
  //add new record or update current record in data base
  const tokenAsync = async (data) => {
    api({ url: `UserAuth/Token`, method: 'post', data }).then((response) => {
      if (response.data.code === 203) {
        utilitieSweetalert().msgSwl('Good job!', '' + response.data.description, 'success')
        localStorage.setItem('token', JSON.stringify(response.data.model))
        navigate.push('/dashboard')
      } else utilitieSweetalert().msgSwl('sorry!', '' + response.data.description, 'error')
    })
  }
  //-------------------end: post & put & delete methods -------------------//
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Formik
                    initialValues={{
                      userName: '',
                      password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, onSubmitProps) => {
                      loginModel.userName = values.userName
                      loginModel.password = values.password
                      tokenAsync(loginModel)
                      onSubmitProps.setSubmitting(false)
                      onSubmitProps.resetForm()
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
                        <h1>Login</h1>
                        <p className="text-medium-emphasis">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Enter user name"
                            name="userName"
                            autoComplete="off"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.userName}
                          />
                          <CCol xs={12}>
                            <Form.Text className="text-muted">
                              {errors.userName && touched.userName && errors.userName}
                            </Form.Text>
                          </CCol>
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            placeholder="Password"
                            name="password"
                            autoComplete="off"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <CCol xs={12}>
                            <Form.Text className="text-muted">
                              {errors.password && touched.password && errors.password}
                            </Form.Text>
                          </CCol>
                        </CInputGroup>
                        <CRow>
                          <CCol xs={6}>
                            <CButton
                              color="primary"
                              className="px-4"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Login
                            </CButton>
                          </CCol>
                        </CRow>
                      </form>
                    )}
                  </Formik>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-color py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <img src={logoImg} width="150" height="150" />
                    <h2>Dhaid</h2>
                    <p>Welcome to Al Dhaid Municipality</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
