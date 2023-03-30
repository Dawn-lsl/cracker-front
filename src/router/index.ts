import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import installSessionGuard from './guard/session'
import { useRouteMeta } from '@/composable'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: { name: 'Home' },
  },
  {
    path: '/',
    redirect: { name: 'Home' },
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('../view/login/index.vue'),
    meta: useRouteMeta(),
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import('../view/home/index.vue'),
    meta: useRouteMeta(),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

installSessionGuard(router)

export default router
