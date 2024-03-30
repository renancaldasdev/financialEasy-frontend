import { getCurrentUser } from './auth'

const authGuard = (to, from, next) => {
  const currentUser = getCurrentUser()
  if (currentUser && currentUser.Authorization) {
    next()
  } else {
    next('/unauthorized')
  }
}

export default authGuard
