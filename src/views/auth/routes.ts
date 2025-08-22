import SignInView from './SignInView.vue'
import SignUpView from './SignUpView.vue'

export default [
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
]