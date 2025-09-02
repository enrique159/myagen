import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  signIn as signInUseCase,
  signOut as signoutUseCase,
} from '@/app/auth/repository/AuthRepository'
import { signUp as signUpUseCase } from '@/app/modules/users/repository/UsersRepository'
import {
  type ISignInPayload,
  type UserAuth,
} from '@/app/auth/domain/auth.d'
import { type ICreateUserPayload } from '@/app/modules/users/domain/user.d'
import { useLocalStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  const token = useLocalStorage('myagen-token', '')
  const user = ref<UserAuth | null>(null)
  const getUser = computed(() => user.value)

  function setUser(userData: UserAuth | null) {
    user.value = userData
  }

  function setToken(newToken: string) {
    token.value = newToken
  }

  // Actions
  async function signIn(payload: ISignInPayload) {
    const action = await signInUseCase(payload)
      .then((response) => {
        setUser(response.data.user)
        setToken(response.data.token)
        return response
      })
      .catch((error) => {
        throw error
      })
    return action
  }

  async function signOut() {
    const action = await signoutUseCase()
      .then((response) => {
        setUser(null)
        setToken('')
        return response
      })
      .catch((error) => {
        throw error
      })
    return action
  }

  async function signUp(payload: ICreateUserPayload) {
    const action = await signUpUseCase(payload)
      .then((response) => {
        setUser(response.data.user)
        setToken(response.data.token)
        return response
      })
      .catch((error) => {
        throw error
      })
    return action
  }

  return {
    user,
    getUser,
    setUser,
    setToken,
    signIn,
    signOut,
    signUp,
  }
})
