import type { LocationQueryRaw, Router } from 'vue-router'

export default function (router: Router) {
  router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token')
    if (!token && to.name !== 'Login') {
      next({
        name: 'Login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      })
      return
    }
    next()
  })
}
