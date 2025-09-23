<template>
  <Transition name="bottom-menu">
    <div
      v-if="isHomePage"
      class="fixed bottom-6 w-[90%] left-[5%] rounded-3xl h-fit bg-base-100 border border-base-content/20 bottom-menu transition-all"
    >
      <!-- SEARCH BAR -->
      <div
        :class="showSearchBar ? 'h-14' : 'h-0'"
        class="w-full transition-all overflow-hidden px-3 flex items-end"
      >
        <input
          type="text"
          placeholder="Busca por nombre, tag o texto"
          class="input border-none rounded-2xl bg-base-300/20 w-full mb-1 px-6 focus:outline-none focus:shadow-none"
          v-model.trim="searchQuery"
          @input="handleSearchChange"
        />
      </div>
      <!-- CALENDAR -->
      <div
        :class="showCalendar ? 'h-[312px]' : 'h-0'"
        class="w-full transition-all overflow-hidden px-3 flex items-end"
      >
        <DatePicker
          v-model="date"
          :markers="elementMarkers"
          inline
          auto-apply
          :dark="isDark"
          :enable-time-picker="false"
          :timezone="timezone"
          locale="es-MX"
        />
      </div>

      <!-- REMINDERS -->
      <div
        :class="
          showReminders
            ? 'h-fit min-h-[200px] max-h-[400px] overflow-y-auto'
            : 'h-0'
        "
        class="w-full transition-all overflow-hidden px-6"
      >
        <p class="text-base-content/60 text-sm pt-6">Recordatorios</p>
        <div class="py-2 space-y-2">
          <div
            v-for="reminder in reminders"
            :key="reminder.id"
            class="flex items-center gap-2 cursor-pointer hover:bg-base-200 rounded-2xl p-1"
            @click="openReminderModal(reminder)"
          >
            <IconAlarm size="18" class="text-red-500 min-w-5" />
            <div class="w-full pr-6">
              <p class="text-xs text-base-content/60">
                {{ formatDatetimeShort(reminder.date) }}
              </p>
              <p class="text-sm truncate">{{ reminder.task?.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-5 gap-2 place-items-center h-16 px-4">
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
            currentProject
              ? [
                  isColorDark(currentProject.color || '#ccc')
                    ? 'text-black'
                    : 'text-white',
                ]
              : 'btn-ghost text-base-300',
          ]"
          :style="[
            currentProject
              ? { 'background-color': currentProject.color || '#ccc' }
              : {},
          ]"
          @click="handleShowProjects"
        >
          <component :is="currentProjectIcon" size="24" />
        </button>
        <!-- REMINDERS -->
        <button
          class="btn btn-circle btn-ghost text-base-300"
          @click="handleReminders"
        >
          <IconAlarm size="24" />
        </button>
        <!-- PERFIL -->
        <div
          class="btn btn-sm btn-ghost btn-circle avatar"
          @click="goToProfile"
        >
          <div class="rounded-full">
            <img alt="Perfil" :src="userProfile" />
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <basic-modal v-model="showReminderModal" title="Recordatorio">
    <span class="text-base-content/60 text-sm"> Descripción </span>
    <p class="mb-4">{{ selectedReminder?.task?.description }}</p>
    <span class="text-base-content/60 text-sm"> Fecha </span>
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
import {
  IconCalendarWeek,
  IconFolderOpen,
  IconSearch,
  IconAlarm,
} from '@tabler/icons-vue'
import { useUser } from '@/composables/useUser'
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProject } from '@/composables/useProject'
import { useElement } from '@/composables/useElement'
import * as TablerIcons from '@tabler/icons-vue'
import { isColorDark } from '@/utils/colors'
import { handleFetchErrors } from '@/utils/handleFetchErrors'
import type { Reminder } from '@/app/modules/reminders/domain/reminder'
import { useApp } from '@/composables/useApp'
import { useDate } from '@/composables/useDate'
import { useTheme } from '@/composables/useTheme'
import dayjs from 'dayjs'
import notify from '@/utils/notifications'
import Exception from '@/app/shared/error/Exception'

const router = useRouter()
const route = useRoute()
const { isDark } = useTheme()
const { formatAssignedDate, formatDatetimeShort, timezone } = useDate()

const isHomePage = computed(() => route.name === 'Home')

const { user } = useUser()
const { dateCalendar, setDateCalendar } = useApp()
const {
  searchElements,
  isSearching,
  getElements,
  calendarElements,
  reminders,
  updateReminder,
  deleteReminder,
  updateTask,
  getReminders,
} = useElement()

const userProfile = computed(() => {
  return user.value?.profileImageUrl || '/avatar.png'
})

// SEARCH
const showSearchBar = ref(false)
const handleSearch = () => {
  showCalendar.value = false
  showReminders.value = false
  showSearchBar.value = !showSearchBar.value
}

watch(showSearchBar, () => {
  if (!showSearchBar.value) {
    searchQuery.value = ''
    isSearching.value = false
  }
})

const searchTimeout = ref<number | null>(null)
const searchQuery = ref('')
const handleSearchChange = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }

  isSearching.value = true
  searchTimeout.value = setTimeout(() => {
    if (searchQuery.value.trim() !== '') {
      searchElements({ query: searchQuery.value })
        .catch((error) => {
          handleFetchErrors(error)
        })
        .finally(() => {
          isSearching.value = false
        })
    } else {
      getElements({
        projectId: currentProject.value?.id,
        assignedDate: formatAssignedDate(dateCalendar.value),
      })
        .catch((error) => {
          handleFetchErrors(error)
        })
        .finally(() => {
          isSearching.value = false
        })
    }
    searchTimeout.value = null
  }, 1000) as unknown as number
}

// CALENDAR
const showCalendar = ref(false)

const date = computed({
  get: () => dateCalendar.value,
  set: (val: Date) => setDateCalendar(val),
})
const handleCalendar = () => {
  showSearchBar.value = false
  showReminders.value = false
  showCalendar.value = !showCalendar.value
}

const elementMarkers = computed(() => {
  return calendarElements.value.map((element) => {
    return {
      date: dayjs(element.assignedDate).add(1, 'day').format('YYYY-MM-DD'),
      type: 'dot',
      color: 'orange',
    }
  })
})

// PROJECTS
const getProjectIcon = (iconName: string) => {
  if (iconName in TablerIcons) {
    return TablerIcons[iconName as keyof typeof TablerIcons]
  }
  return TablerIcons.IconCircle
}

const { currentProject, toggleProjectsDrawer } = useProject()
const currentProjectIcon = computed(() => {
  return currentProject.value?.icon
    ? getProjectIcon(currentProject.value.icon)
    : IconFolderOpen
})

const goToProfile = () => {
  router.push('/profile')
}

const handleShowProjects = () => {
  showSearchBar.value = false
  showCalendar.value = false
  showReminders.value = false
  toggleProjectsDrawer()
}

// REMINDERS
const showReminders = ref(false)
const showReminderModal = ref(false)
const selectedReminder = ref<Reminder | null>(null)

const handleReminders = () => {
  showSearchBar.value = false
  showCalendar.value = false
  showReminders.value = !showReminders.value
}

const openReminderModal = (reminder: Reminder) => {
  selectedReminder.value = reminder
  showReminderModal.value = true
}

const fetchReminders = async () => {
  await getReminders().catch((error) => handleFetchErrors(error))
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
</script>

<style scoped>
.bottom-menu {
  z-index: 10;
  box-shadow: 0px 4px 16px 5px rgba(0, 0, 0, 0.1);
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
