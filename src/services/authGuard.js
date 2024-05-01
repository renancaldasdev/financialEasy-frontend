import { getCurrentUser } from './auth'

const authGuard = (to, from, next) => {
  const currentUser = getCurrentUser()
  console.log(currentUser)
  if (currentUser && currentUser.Authorization) {
    next()
  } else {
    if (!currentUser) {
      next('/unauthorized')
    }
  }
}

export default authGuard
