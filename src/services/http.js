import axios from 'axios'
import { useToast } from 'vue-toastification'
import { getCurrentUser, setCurrentUser } from '@/services/auth'

const toast = useToast()

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'Application/json'
  }
})

const updateAuthorizationHeader = () => {
  const currentUser = getCurrentUser()
  if (currentUser) {
    client.defaults.headers.common['Authorization'] = currentUser.Authorization
  }
}

updateAuthorizationHeader()

client.interceptors.request.use(
  (config) => {
    updateAuthorizationHeader()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const login = async (data) => {
  try {
    const login = await client.post('login', data)
    if (login.status === 200) {
      setCurrentUser(data)
      localStorage.setItem('access_token', login.data.access_token)
      toast.success(login.data.message)
    }
    return login
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const validationErrors = error.response.data.errors
      return validationErrors
    } else {
      toast.error(error.response.data.message)
    }
  }
}

export const forgetPassword = async (data) => {
  try {
    const response = await client.post('forgotpassword', data)
    toast.success(response.data.message)
    return response
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const validationErrors = error.response.data.errors
      return validationErrors
    } else if (error.response && error.response.status === 404) {
      toast.error(error.response.data.message)
    }
  }
}

export const register = async (data) => {
  try {
    const response = await client.post('register', data)
    if (response.status === 201) {
      setCurrentUser(data)
      localStorage.setItem('access_token', response.data.access_token)
      toast.success(response.data.message)
    }
    return response
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const validationErrors = error.response.data.errors
      if (Object.keys(validationErrors).length > 0) {
        return validationErrors
      }
    } else {
      toast.error(error.response.data.message)
    }
  }
}

export const logout = async () => {
  try {
    const response = await client.post('logout')
    if (response.status === 200) {
      localStorage.clear()
      toast.success(response.data.message)
    }
    return response
  } catch (error) {
    toast.error(error.response.data.message)
  }
}
