import type { ISignInPayload, ISignInResponse } from '@/app/auth/domain/auth'
import type { ICreateUserPayload } from '@/app/modules/users/domain/user'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export const useUser = () => {
  const userStore = useUserStore()
  const { user, getUser } = storeToRefs(userStore)

  // Getters
  const isLoggedIn = computed(() => user.value !== null)

  // Functions
  function setUser(user: ISignInResponse) {
    userStore.setUser(user)
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

  return {
    user,
    getUser,
    isLoggedIn,

    setUser,
    signIn,
    signOut,
    signUp,
  }
}
