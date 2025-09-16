import type { ISignInPayload, UserAuth } from '@/app/auth/domain/auth'
import type { ICreateUserPayload, IUpdateUserPayload } from '@/app/modules/users/domain/user'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export const useUser = () => {
  const userStore = useUserStore()
  const { user, getUser } = storeToRefs(userStore)

  // Getters
  const isLoggedIn = computed(() => user.value !== null)

  // Functions
  function setUser(user: UserAuth) {
    userStore.setUser(user)
  }
  function setToken(token: string) {
    userStore.setToken(token)
  }

  // Actions
  async function signIn(payload: ISignInPayload) {
    return userStore.signIn(payload)
  }
  async function signOut() {
    return userStore.signOut()
  }
  async function signUp(payload: ICreateUserPayload) {
    return userStore.signUp(payload)
  }
  async function updateUser(payload: IUpdateUserPayload) {
    return userStore.updateUser(payload)
  }
  async function sendRecoveryPasswordEmail(payload: { email: string }) {
    return userStore.sendRecoveryPasswordEmail(payload)
  }
  async function recoverPassword(payload: { token: string, password: string }) {
    return userStore.recoverPassword(payload)
  }

  return {
    user,
    getUser,
    isLoggedIn,

    setUser,
    setToken,
    signIn,
    signOut,
    signUp,
    updateUser,
    sendRecoveryPasswordEmail,
    recoverPassword,
  }
}
