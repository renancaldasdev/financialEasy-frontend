export const getCurrentUser = () => {
  const token = localStorage.getItem('access_token')
  return token ? { Authorization: `Bearer ${token}` } : null
}
