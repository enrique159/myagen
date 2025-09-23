<template>
  <div v-show="isDesktop" class="p-6 space-y-6 relative h-full">
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
          <router-link to="/profile">
            <IconUser size="16" />
            Mi cuenta
          </router-link>
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

    <div class="bg-base-100 pl-4 pr-2 py-2 rounded-2xl h-fit min-h-[200px] max-h-[400px] overflow-y-auto">
      <p class="text-base-content/60 text-sm">Recordatorios</p>
      <div v-if="reminders.length === 0" class="h-[200px] w-full flex items-center justify-center">
        <p class="text-base-content/60 text-sm">No hay recordatorios</p>
      </div>
      <div v-else class="py-2 space-y-2">
        <div
          v-for="reminder in reminders"
          :key="reminder.id"
          class="flex items-center gap-2 cursor-pointer hover:bg-base-200 rounded-2xl p-1"
          @click="openReminderModal(reminder)"
        >
          <IconAlarm size="18" class="text-red-500 min-w-5"/>
          <div class="w-full max-w-[220px]">
            <p class="text-xs text-base-content/60">{{ formatDatetimeShort(reminder.date) }}</p>
            <p class="text-sm truncate">{{ reminder.task?.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <basic-modal v-model="showReminderModal" title="Recordatorio">
    <span class="text-base-content/60 text-sm">
      Descripción
    </span>
    <p class="mb-4">{{ selectedReminder?.task?.description }}</p>
    <span class="text-base-content/60 text-sm">
      Fecha
    </span>
    <p class="mb-4">{{ formatDatetimeShort(selectedReminder?.date) }}</p>

    <div class="flex flex-col gap-2 pb-4">
      <button
        class="btn bg-primary text-white hover:bg-primary/80 w-full shadow-none rounded-full"
        @click="markAsCompleted"
      >
        <IconCheck size="16" /> Marcar como completado
      </button>
      <button
        class="btn bg-error text-white hover:bg-error/80 w-full shadow-none rounded-full"
        @click="handleDeleteReminder"
      >
        <IconTrash size="16" /> Eliminar
      </button>
    </div>
  </basic-modal>
</template>

<script setup lang="ts">
import { useUser } from '@/composables/useUser';
import { useApp } from '@/composables/useApp';
import { IconSettings, IconUser, IconLogout, IconAlarm, IconCheck, IconTrash } from '@tabler/icons-vue';
import { useBreakpoints } from '@/composables/useBreakpoints';
import { useElement } from '@/composables/useElement';
import { computed, onMounted, ref } from 'vue';
import { handleFetchErrors } from '@/utils/handleFetchErrors';
import { useDate } from '@/composables/useDate';
import type { Reminder } from '@/app/modules/reminders/domain/reminder';
import Exception from '@/app/shared/error/Exception';
import notify from '@/utils/notifications';

const { user, signOut } = useUser()
const { setValidated } = useApp()
const { formatDatetimeShort } = useDate()
const { isDesktop } = useBreakpoints()

const userProfile = computed(() => {
  return user.value?.profileImageUrl || '/avatar.png'
})

const { reminders, getReminders, updateReminder, updateTask, deleteReminder } = useElement()

const fetchReminders = async () => {
  await getReminders()
    .catch((error) => handleFetchErrors(error))
}

const showReminderModal = ref(false)
const selectedReminder = ref<Reminder | null>()

const openReminderModal = (reminder: Reminder) => {
  selectedReminder.value = reminder
  showReminderModal.value = true
}

const markAsCompleted = async () => {
  const ids = {
    taskId: selectedReminder.value?.task?.id || '',
    elementId: selectedReminder.value?.task?.list?.element?.id || '',
    listId: selectedReminder.value?.task?.list?.id || '',
  }
  try {
    await updateReminder(selectedReminder.value?.id || '', {
      notified: true,
    })
    await updateTask(ids, {
      completed: true,
    })
    await fetchReminders()
  } catch (error) {
    if (error instanceof Exception) {
      handleFetchErrors(error)
    }
    notify.error('Error al marcar como completado')
  } finally {
    showReminderModal.value = false
  }
}

const handleDeleteReminder = async () => {
  try {
    await deleteReminder(selectedReminder.value?.id || '')
    await fetchReminders()
  } catch (error) {
    if (error instanceof Exception) {
      handleFetchErrors(error)
    }
    notify.error('Error al eliminar el recordatorio')
  } finally {
    showReminderModal.value = false
  }
}

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

onMounted(() => {
  fetchReminders()
})
</script>
