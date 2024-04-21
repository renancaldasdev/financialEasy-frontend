import axios from 'axios'
import { getToken } from './auth'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

client.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

const get = async (url, params) => {
  const response = await client.get(url, params)
  return response
}

const post = async (url, params) => {
  const response = await client.post(url, params)
  return response
}

const update = async (url, params) => {
  const response = await client.patch(url, params)
  return response
}

const destroy = async (url, params) => {
  const response = await client.delete(url, params)
  return response
}

export default { get, post, update, destroy }
