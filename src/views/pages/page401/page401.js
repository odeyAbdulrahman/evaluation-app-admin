import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { useHistory } from 'react-router-dom'

const Page401 = () => {
  const navigate = useHistory()
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
              <h1 className="float-start display-3 me-4">
                401
                <br></br>
                <CButton
                  style={{ with: '300px' }}
                  color="info"
                  onClick={() => {
                    navigate.push('/dashboard')
                  }}
                >
                  Go Back -{'>'}
                </CButton>
              </h1>
              <h4 className="pt-3">oooops, you are not authorized!</h4>
              <p className="text-medium-emphasis float-start">
                You do not have permission to access this page
              </p>
            </span>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default Page401
