import axios from 'axios'
import { handleDates } from './helpers/date-handler'

const api = axios.create({
  baseURL: 'http://localhost:5000',
})

api.interceptors.response.use(response => {
  handleDates(response.data)
  return response
})

export default api
