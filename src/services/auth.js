export const setCurrentUser = (user) => {
  user = JSON.stringify(user)
  localStorage.setItem('current_user', user)
}

export const getCurrentUser = () => {
  const token = localStorage.getItem('access_token')
  return token ? { Authorization: `Bearer ${token}` } : null
}

export const removeCurrentUser = () => {
  localStorage.removeItem('current_user')
}

export const setToken = (token) => {
  localStorage.setItem('access_token', token)
}

export const getToken = () => {
  const token = localStorage.getItem('access_token')
  return token
}

export const destroyToken = () => {
  localStorage.removeItem('access_token')
}
