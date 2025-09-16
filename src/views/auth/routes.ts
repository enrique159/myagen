import SignInView from './SignInView.vue'
import SignUpView from './SignUpView.vue'
import ForgotPassword from './ForgotPassword.vue'
import RecoverPassword from './RecoverPassword.vue'

export default [
  {
    path: '/auth',
    redirect: '/auth/signin',
  },
  {
    path: '/auth/signin',
    name: 'SignIn',
    component: SignInView,
  },
  {
    path: '/auth/signup',
    name: 'SignUp',
    component: SignUpView,
  },
  {
    path: '/auth/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/auth/recover-password',
    name: 'RecoverPassword',
    component: RecoverPassword,
  },
]