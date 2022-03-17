/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'

const api = ({ ...options }) => {
  const UNAUTHORIZED = 401
  const baseUrl = "https://evaluationapi.dhaid.shj.ae/api/";
  const baseUrlTest = "https://localhost:44379/api/";
  const token = JSON.parse(localStorage.getItem('token'))
  const api = axios.create({ baseURL: baseUrl })
  api.defaults.headers.common['Authorization'] = 'Bearer ' + token
  api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  api.defaults.headers.common['Consumer'] = '143217789'
  api.defaults.headers.common['Lang'] = '22'
  const onSuccess = (response) => {
    console.log(JSON.stringify(response))
    return response
  }
  const onError = (error) => {
    console.log(JSON.stringify(error))
    if (error.response.status === UNAUTHORIZED) {
      localStorage.removeItem('token')
    }
    return error
  }
  return api(options).then(onSuccess).catch(onError)
}
export default api
