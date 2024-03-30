import axios from 'axios'
import { getCurrentUser } from '@/services/auth'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'Application/json'
  }
})

const updateAuthorizationHeader = () => {
  const currentUser = getCurrentUser()
  if (currentUser) {
    axiosInstance.defaults.headers.common['Authorization'] = currentUser.Authorization
  }
}

updateAuthorizationHeader()

axiosInstance.interceptors.request.use(
  (config) => {
    updateAuthorizationHeader()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
