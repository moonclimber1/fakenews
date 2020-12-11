import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/Blog.vue')
  },
  {
    path: '/home-vivi',
    name: 'Home Vivi',
    component: () => import('../views/HomeVivi.vue')
  },
  {
    path: '/universe',
    name: 'Universe',
    component: () => import('../views/Universe.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
