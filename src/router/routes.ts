import {RouteRecordRaw} from 'vue-router'

import viewRoutes from '@/router/viewRoutes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index',
  },
  ...viewRoutes,
]

export default routes