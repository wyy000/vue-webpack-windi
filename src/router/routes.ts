import {RouteRecordRaw} from 'vue-router'

import viewRoutes from '@/router/viewRoutes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main',
    meta: {auth: true},
  },
  {
    path: '/main',
    component: () => import('../Main.vue'),
    children: [...viewRoutes],
    meta: {auth: true},
  },
  {
    path: '/login',
    component: () => import('../Login.vue'),
    meta: {auth: false},
  },
]

export default routes