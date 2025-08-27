<template>
  <div class="fixed bottom-0 left-0 right-0 w-full h-16 bg-base-100">
    <div class="grid grid-cols-5 gap-2 place-items-center h-full px-6">
      <button v-for="option in menuOptions" :key="option.label" class="btn btn-circle btn-ghost text-base-300">
        <component :is="option.icon" size="24" />
      </button>
      <div class="btn btn-sm btn-ghost btn-circle avatar" @click="goToProfile">
        <div class="rounded-full">
          <img alt="Perfil" :src="userProfile" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconCalendarWeek, IconFolderOpen, IconRocket, IconSearch } from '@tabler/icons-vue'
import { useUser } from '@/composables/useUser'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { user } = useUser()

const userProfile = computed(() => {
  return user.value?.profileImageUrl || '/avatar.png'
})

const menuOptions = [
  {
    icon: IconRocket,
    label: 'Inicio',
    action: () => {
      console.log('Inicio')
    }
  },
  {
    icon: IconSearch,
    label: 'Buscar',
    action: () => {
      console.log('Buscar')
    }
  },
  {
    icon: IconCalendarWeek,
    label: 'Calendario',
    action: () => {
      console.log('Calendario')
    }
  },
  {
    icon: IconFolderOpen,
    label: 'Proyectos',
    action: () => {
      console.log('Proyectos')
    }
  },
]

const goToProfile = () => {
  router.push('/profile')
}
</script>