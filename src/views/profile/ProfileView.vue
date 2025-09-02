<template>
  <div class="container mx-auto p-6">
    <header class="flex items-center justify-between gap-2 w-full">
      <router-link to="/" class="flex items-center gap-2">
        <IconArrowLeft stroke="2" />
        {{ isDesktop ? 'Volver' : '' }}
      </router-link>
      <button v-if="isDesktop" class="btn text-red-400 btn-ghost" @click="logout">
        <IconLogout size="18" stroke="2" />
        Cerrar sesión
      </button>
    </header>
    <section class="container mx-auto max-w-md space-y-8">
      <div class="flex items-center gap-2 mt-6 relative">
        <img class="w-16 h-16 aspect-square max-w-16 rounded-full" alt="Perfil" :src="user?.profileImageUrl || '/avatar.png'" />
        <div>
          <p class="text-lg font-semibold">{{ user?.name }}</p>
          <p class="text-base-300">{{ user?.email }}</p>
        </div>
        <div class="tooltip tooltip-left absolute right-0 top-0" data-tip="Editar perfil">
          <button class="btn btn-circle btn-sm text-base-content/60 btn-ghost">
            <IconEdit stroke="2" />
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <button class="btn w-full bg-base-100 border-none rounded-xl h-14 text-base-content/60 flex justify-start items-center gap-2 relative">
          <IconLock stroke="2" />
          Cambiar contraseña
          <IconChevronRight stroke="2" class="absolute right-2 top-1/2 -translate-y-1/2" />
        </button>
  
        <button v-if="!isDesktop" class="btn w-full bg-base-100 border-none rounded-xl h-14 text-red-400 flex justify-start items-center gap-2 relative">
          <IconLogout stroke="2" />
          Cerrar sesión
          <IconChevronRight stroke="2" class="absolute right-2 top-1/2 -translate-y-1/2" />
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { IconArrowLeft, IconChevronRight, IconEdit, IconLock, IconLogout } from '@tabler/icons-vue';
import { useUser } from '@/composables/useUser';
import { useBreakpoints } from '@/composables/useBreakpoints'

const { user, signOut } = useUser()

const { isDesktop } = useBreakpoints()

const logout = async () => {
  await signOut()
}
</script>