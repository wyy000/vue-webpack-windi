import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

import {userInfo as me} from '@/model/user'
import {isEmptyObject} from "@/utils"

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from , next) => {
  if (to.matched.some(record => record.meta.auth) && to.meta.auth && isEmptyObject(me.value)) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    })
  }
  else next()
  next()
})

export default router
