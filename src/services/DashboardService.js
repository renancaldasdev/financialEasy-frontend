import apiService from './apiService'

export async function getUser() {
  try {
    const user = await apiService.get(`users/showuser`)
    return user
  } catch (error) {
    console.log(error)
  }
}
