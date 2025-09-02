<template>
  <div
    v-if="loading"
    class="h-screen flex flex-col justify-center items-center gap-4"
  >
    <img src="@/assets/logo_icon.svg" alt="Logo" class="w-12 mb-2" />
    <progress class="progress w-56 text-[#4872E5]" />
  </div>
  <main v-else class="min-h-screen min-w-screen">
    <router-view v-if="validated" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { check } from './app/auth/repository/AuthRepository'
import { useUser } from '@/composables/useUser'
import { useRouter } from 'vue-router'
import { useTheme } from './composables/useTheme'
import { useApp } from './composables/useApp'

const router = useRouter()
const { setUser, setToken } = useUser()
const { setValidated, validated } = useApp()

useTheme()
const loading = ref(true)
const isAuthenticated = async () => {
  loading.value = true
  try {
    const response = await check()
    setUser(response.data)
    if (router.currentRoute.value.path.includes('/auth') || router.currentRoute.value.path === '/') {
      await router.push({ name: 'Home' })
    }
    setValidated(true)
  } catch (error) {
    console.error(error)
    setToken('')
    await router.push('/auth/signin')
    setValidated(true)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await isAuthenticated()
})
</script>
