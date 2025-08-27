<template>
  <div class="p-6 space-y-6 relative h-full">
    <div class="dropdown dropdown-end w-full">
      <div
        tabindex="0"
        role="button"
        class="flex justify-between items-center gap-2 bg-base-100 pl-4 pr-2 py-2 rounded-2xl cursor-pointer active:scale-95 transition-transform duration-200"
      >
        <div>
          <p class="font-semibold text-base-content">{{ user?.name }}</p>
          <p class="text-sm text-base-content/60">{{ user?.email }}</p>
        </div>
        <div class="btn btn-lg btn-ghost btn-circle avatar">
          <div class="w-20 rounded-full">
            <img alt="Perfil" :src="userProfile" />
          </div>
        </div>
      </div>
      <ul
        tabindex="0"
        class="menu dropdown-content bg-base-100 rounded-xl z-1 mt-3 w-52 p-2 shadow-xl border border-base-content/20"
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
</template>

<script setup lang="ts">
import { useUser } from '@/composables/useUser';
import { useApp } from '@/composables/useApp';
import { IconSettings, IconUser, IconLogout } from '@tabler/icons-vue';
import { computed } from 'vue';

const { user, signOut } = useUser()
const { setValidated } = useApp()

const userProfile = computed(() => {
  return user.value?.profileImageUrl || '/avatar.png'
})

const logout = async () => {
  await signOut()
  setValidated(false)

  // Desregistrar service worker
  if ('serviceWorker' in navigator) {
    try {
      caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
          caches.delete(cacheName);
        });
      });
      const registrations = await navigator.serviceWorker.getRegistrations()
      await Promise.all(registrations.map(registration => registration.unregister()))
    } catch (error) {
      console.error('Error al desregistrar service worker:', error)
    }
  }
  
  // Recargar la página para asegurar que todos los cambios surtan efecto
  window.location.reload()
}
</script>
