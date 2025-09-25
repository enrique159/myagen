<template>
  <div class="container mx-auto p-6">
    <header class="flex items-center justify-between gap-2 w-full">
      <router-link to="/" class="flex items-center gap-2">
        <IconArrowLeft stroke="2" />
        {{ isDesktop ? 'Volver' : '' }}
      </router-link>
      <button
        v-if="isDesktop"
        class="btn text-red-400 btn-ghost"
        @click="logout"
      >
        <IconLogout size="18" stroke="2" />
        Cerrar sesión
      </button>
    </header>
    <section class="container mx-auto max-w-md space-y-8">
      <div class="flex items-center gap-2 mt-6 relative">
        <div class="relative rounded-full overflow-hidden">
          <img
            :src="currentProfileImage"
            alt="Perfil"
            class="w-16 h-16 object-contain bg-base-200"
          />
          <div
            v-if="!isImageUploading"
            class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            :class="{
              'opacity-0 hover:opacity-100 transition-all bg-black/30': isDesktop,
            }"
          >
            <label class="btn btn-sm btn-circle" :class="[
              isDesktop ? 'bg-base-200/50 backdrop-blur-xs' :
              'bg-transparent text-white border-none',
            ]">
              <IconPencil />
              <input
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleImageChange"
              />
            </label>
          </div>
          <div
            v-else
            class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 opacity-100"
          >
            <span class="loading loading-spinner"></span>
          </div>
        </div>
        <div>
          <p class="text-lg font-semibold">{{ user?.name }} {{ user?.lastName }}</p>
          <p class="text-base-300">{{ user?.email }}</p>
        </div>
        <div
          class="tooltip tooltip-left absolute right-0 top-0"
          data-tip="Editar perfil"
        >
          <button class="btn btn-circle btn-sm text-base-content/60 btn-ghost" @click="showEditUserModal = true">
            <IconEdit stroke="2" />
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <button
          class="btn w-full bg-base-100 border-none rounded-xl h-14 text-base-content/60 flex justify-start items-center gap-2 relative"
          @click="showNewPasswordModal = true"
        >
          <IconLock stroke="2" />
          Cambiar contraseña
          <IconChevronRight
            stroke="2"
            class="absolute right-2 top-1/2 -translate-y-1/2"
          />
        </button>

        <button
          class="btn w-full bg-base-100 border-none rounded-xl h-14 text-base-content/60 flex justify-start items-center gap-2 relative"
        >
          <IconSun v-if="!isDark" stroke="2" class="w-6" />
          <IconMoon v-else stroke="2" class="w-6" />
          Tema
          <ToggleTheme class="absolute right-2 top-1/2 -translate-y-1/2" />
        </button>

        <button
          v-if="!isDesktop"
          class="btn w-full bg-base-100 border-none rounded-xl h-14 text-red-400 flex justify-start items-center gap-2 relative"
          @click="logout"
        >
          <IconLogout stroke="2" />
          Cerrar sesión
          <IconChevronRight
            stroke="2"
            class="absolute right-2 top-1/2 -translate-y-1/2"
          />
        </button>
      </div>
    </section>
  </div>

  <!-- NEW PASSWORD -->
  <ChangePasswordForm v-model="showNewPasswordModal" />

  <!-- EDIT USER -->
  <EditUserForm v-model="showEditUserModal" />
</template>

<script setup lang="ts">
import ChangePasswordForm from './components/ChangePasswordForm.vue'
import EditUserForm from './components/EditUserForm.vue'
import {
  IconArrowLeft,
  IconChevronRight,
  IconEdit,
  IconLock,
  IconLogout,
  IconPencil,
} from '@tabler/icons-vue'
import { useUser } from '@/composables/useUser'
import { useBreakpoints } from '@/composables/useBreakpoints'
import IconSun from '@/assets/customs/IconSun.vue'
import IconMoon from '@/assets/customs/IconMoon.vue'
import { useTheme } from '@/composables/useTheme'
import { computed, ref } from 'vue'
import type Exception from '@/app/shared/error/Exception'
import { handleFetchErrors } from '@/utils/handleFetchErrors'


const { isDark } = useTheme()
const { user, signOut, uploadImage } = useUser()

const { isDesktop } = useBreakpoints()

const logout = async () => {
  await signOut()
  window.location.reload()
}

const showNewPasswordModal = ref(false)
const showEditUserModal = ref(false)

// PROFILE IMAGE
const currentProfileImage = computed(() => user.value?.profileImageUrl || '/avatar.png')
const isImageUploading = ref(false)
const profileImage = ref<File | null>(null)
const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    profileImage.value = file
    submitNewImage()
  }
}

const submitNewImage = async () => {
  isImageUploading.value = true
  await uploadImage(profileImage.value!)
    .catch((error: Exception) => {
      handleFetchErrors(error)
    })
    .finally(() => {
      isImageUploading.value = false
    })
}
</script>
