/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import { status } from './enums/statusCode'
import { logOut } from './services/authService'
const api = ({ ...options }) => {
  const baseUrl = "https://evaluationapi.dhaid.shj.ae/api/";
  const baseUrlTest = "https://localhost:44379/api/";
  const token = JSON.parse(localStorage.getItem('token'))
  const api = axios.create({ baseURL: baseUrlTest })
  api.defaults.headers.common['Authorization'] = 'Bearer ' + token
  api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  api.defaults.headers.common['Consumer'] = '143217789'
  api.defaults.headers.common['Lang'] = '22'
  const onSuccess = (response) => {
    return response
  }
  const onError = (error) => {
    if (error.response.status === status.UNAUTHORIZED) {
      logOut()
    }
    return error
  }
  return api(options).then(onSuccess).catch(onError)
}
export default api
