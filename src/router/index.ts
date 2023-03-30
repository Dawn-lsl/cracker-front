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
    component: () => import('@/view/login/index.vue'),
    meta: useRouteMeta(),
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import('@/view/home/index.vue'),
    children: [
      {
        path: '/home/message/:targetId',
        component: () => import('@/view/home/components/message.vue'),
      },
    ],
    meta: useRouteMeta(),
  },
  {
    name: 'Error',
    path: '/error/:msg',
    props: true,
    component: () => import('@/view/error/index.vue'),
    meta: useRouteMeta(),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

installSessionGuard(router)

export default router
