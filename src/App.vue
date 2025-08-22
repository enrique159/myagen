<template>
  <main class="min-h-screen min-w-screen">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { check } from './app/auth/repository/AuthRepository'
import { useUser } from '@/composables/useUser'
import type { Response } from './app/network/domain/interfaces'
import type { ISignInResponse } from '@/app/auth/domain/auth'
import { useRouter } from 'vue-router'
import { useTheme } from './composables/useTheme'
import { useApp } from './composables/useApp'

const router = useRouter()
const { setUser } = useUser()
const { setValidated } = useApp()

useTheme()
const loading = ref(false)
const isAuthenticated = async () => {
  loading.value = true
  await check()
    .then((response: Response<ISignInResponse>) => {
      setUser(response.data)
      router.push({ name: 'Home' })
    })
    .catch(() => {
      router.push('/auth/signin')
    })
    .finally(() => {
      loading.value = false
      setValidated(true)
    })
}

isAuthenticated()
</script>

