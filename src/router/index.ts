import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import homeRoutes from '../views/home/routes'
import authRoutes from '../views/auth/routes'
import { useApp } from '@/composables/useApp'
import { useUser } from '@/composables/useUser'

const routes = [
  ...authRoutes,
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      ...homeRoutes,
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const { validated } = useApp()
  const { isLoggedIn } = useUser()

  if (to.meta.requiresAuth && !isLoggedIn.value && validated.value) {
    next({ name: 'SignIn' })
  } else if (to.path.includes('auth') && isLoggedIn.value) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
