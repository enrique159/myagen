<template>
  <Transition name="bottom-menu">
    <div v-if="isHomePage" class="fixed bottom-6 w-[90%] left-[5%] rounded-3xl h-16 bg-base-100 bottom-menu">
      <div class="grid grid-cols-4 gap-2 place-items-center h-full px-4">
        <!-- BUSCAR -->
        <button 
          class="btn btn-circle btn-ghost text-base-300"
          @click="handleSearch"
        >
          <component :is="IconSearch" size="24" />
        </button>
        <!-- CALENDARIO -->
        <button 
          class="btn btn-circle btn-ghost text-base-300"
          @click="handleCalendar"
        >
          <component :is="IconCalendarWeek" size="24" />
        </button>
        <!-- PROYECTOS -->
        <button 
          class="btn btn-circle border-none"
          :class="[
            currentProject ? [ isColorDark(currentProject.color || '#ccc') ? 'text-black' : 'text-white' ] : 'btn-ghost',
          ]"
          :style="[
            currentProject ? { 'background-color': currentProject.color || '#ccc' } : {}
          ]"
          @click="toggleProjectsDrawer"
        >
          <component :is="currentProjectIcon" size="24" />
        </button>
        <!-- PERFIL -->
        <div class="btn btn-sm btn-ghost btn-circle avatar" @click="goToProfile">
          <div class="rounded-full">
            <img alt="Perfil" :src="userProfile" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { IconCalendarWeek, IconFolderOpen, IconSearch } from '@tabler/icons-vue'
import { useUser } from '@/composables/useUser'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProject } from '@/composables/useProject'
import * as TablerIcons from '@tabler/icons-vue'
import { isColorDark } from '@/utils/colors'

const router = useRouter()
const route = useRoute()

const isHomePage = computed(() => route.name === 'Home')

const { user } = useUser()

const userProfile = computed(() => {
  return user.value?.profileImageUrl || '/avatar.png'
})

const handleSearch = () => {
  console.log('Buscar')
}

const handleCalendar = () => {
  console.log('Calendario')
}

// PROJECTS
const getProjectIcon = (iconName: string) => {
  if (iconName in TablerIcons) {
    return TablerIcons[iconName as keyof typeof TablerIcons]
  }
  return TablerIcons.IconCircle
}

const { currentProject, toggleProjectsDrawer } = useProject()
const currentProjectIcon = computed(() => {
  return currentProject.value?.icon ? getProjectIcon(currentProject.value.icon) : IconFolderOpen
})

const goToProfile = () => {
  router.push('/profile')
}
</script>

<style scoped>
.bottom-menu {
  z-index: 10;
  box-shadow: 0px 8px 10px 5px rgba(0, 0, 0, 0.05);
}

.bottom-menu-enter-active {
  animation: enterBottomMenu 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28); /* Bounce effect */
}

.bottom-menu-leave-active {
  animation: leaveBottomMenu 0.3s ease-in;
}

@keyframes enterBottomMenu {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  70% {
    opacity: 1;
    transform: translateY(-10px); /* Slight overshoot for bounce effect */
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes leaveBottomMenu {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100px);
  }
}
</style>