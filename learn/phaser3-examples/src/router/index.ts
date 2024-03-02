import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home-page.vue'
import { exampleRoutes } from './examplesRoute'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: exampleRoutes
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/not-found.vue')
    }
  ]
})

export default router
