// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: "/add",
    name: "Add",
    component: () => import('@/views/Add.vue'),
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('@/views/Edit.vue'),
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('@/views/Me.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/:id',
    name: 'View Profile',
    component: () => import('@/views/ViewProfile.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
