import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  signIn as signInUseCase,
  signOut as signoutUseCase,
} from '@/app/auth/repository/AuthRepository'
import { signUp as signUpUseCase } from '@/app/modules/users/repository/UsersRepository'
import {
  type ISignInPayload,
  type ISignInResponse,
} from '@/app/auth/domain/auth.d'
import { type ICreateUserPayload } from '@/app/modules/users/domain/user.d'

export const useUserStore = defineStore('user', () => {
  const user = ref<ISignInResponse | null>(null)
  const getUser = computed(() => user.value)

  function setUser(userData: ISignInResponse | null) {
    user.value = userData
  }

  // Actions
  async function signIn(payload: ISignInPayload) {
    const action = await signInUseCase(payload)
      .then((response) => {
        setUser(response.data)
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
    signIn,
    signOut,
    signUp,
  }
})
