<template>
  <div class="home-container">
    <!-- SIDE MENU  -->
    <side-menu />
    <!-- ELEMENTS CONTENT -->
    <elements-content />
    <!-- RIGHT MENU -->
    <div class="p-6 space-y-6 relative h-full">
      <div class="flex justify-between items-center gap-2 bg-base-100 pl-4 pr-2 py-2 rounded-2xl">
        <div>
          <p class="font-semibold text-base-content">{{ user?.name }}</p>
          <p class="text-sm text-base-content/60">{{ user?.email }}</p>
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-lg btn-ghost btn-circle avatar">
            <div class="w-20 rounded-full">
              <img alt="Perfil" :src="userProfile" />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu dropdown-content bg-base-100 rounded-xl z-1 mt-3 w-52 p-2 shadow border border-base-content/20"
          >
            <li>
              <a class="flex justify-between">
                Tema
                <ToggleTheme />
              </a>
            </li>
            <div class="divider my-0" />
            <li>
              <a>
                <IconUser size="16" />
                Mi cuenta
              </a>
            </li>
            <li>
              <a>
                <IconSettings size="16" />
                Configuración
              </a>
            </li>
            <li @click="logout">
              <a class="text-red-400">
                <IconLogout size="16" />
                Cerrar sesión</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideMenu from './components/SideMenu.vue';
import ElementsContent from './components/ElementsContent.vue';
import { useUser } from '@/composables/useUser';
import { useApp } from '@/composables/useApp';
import { IconSettings, IconUser, IconLogout } from '@tabler/icons-vue';
import { computed } from 'vue';


const { user, signOut } = useUser()
const { setValidated } = useApp()

const userProfile = computed(() => {
  return user.value?.profileImageUrl || '/avatar.png'
})

const logout = () => {
  signOut()
  setValidated(false)
  window.location.reload()
}
</script>

<style scoped>
.home-container {
  display: grid;
  grid-template-columns: 340px 1fr 340px;
  height: 100dvh;
}
</style>