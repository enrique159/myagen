<template>
  <div v-show="isDesktop" class="p-6 space-y-6 relative h-full">
    <div class="flex items-center px-4">
      <img
        v-if="isDark"
        src="@/assets/logo_full_dark.svg"
        alt="Logo"
        class="w-30 cursor-pointer hover:translate-y-1 transition-all duration-100 ease-in-out"
      />
      <img
        v-else
        src="@/assets/logo_full_light.svg"
        alt="Logo"
        class="w-30 cursor-pointer hover:translate-y-1 transition-all duration-100 ease-in-out"
      />
    </div>

    <label
      for="search-input"
      class="flex items-center gap-2 bg-base-100 px-4 py-4 rounded-2xl"
    >
      <component :is="TablerIcons.IconSearch" class="text-base-300" />
      <input
        type="text"
        id="search-input"
        placeholder="Buscar"
        v-model="searchQuery"
        @input="handleSearchChange"
        class="text-base-content placeholder:text-base-300 w-full outline-none"
      />
    </label>

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

    <div
      class="flex justify-between items-center gap-2 bg-base-100 px-4 py-3 rounded-2xl"
    >
      <div>
        <p class="text-base-content/60 text-sm">Proyecto</p>
        <p v-if="isAllProjects" class="text-base-content text-lg font-semibold">
          Todos
        </p>
        <p v-else class="text-lg font-semibold flex items-center gap-2" :style="{ color: currentProject?.color || PROJECT_COLORS.AZUL }">
          <component :is="getProjectIcon(currentProject?.icon || 'IconCircle')" size="20" stroke-width="2" />
          {{ currentProject?.name }}
        </p>
      </div>
      <button
        class="btn btn-circle btn-ghost bg-gradient-to-tr from-orange-400 to-pink-600 text-white"
        @click="toggleProjectsDrawer"
      >
        <component :is="TablerIcons.IconSwipe" />
      </button>
    </div>

    <span class="absolute bottom-4 left-6 text-xs text-base-300">
      creado por
      <a
        href="https://github.com/enrique159"
        target="_blank"
        class="text-primary hover:underline"
        >enrique159</a
      >
    </span>
  </div>
</template>

<script setup lang="ts">
import { useApp } from '@/composables/useApp'
import { useTheme } from '@/composables/useTheme'
import TablerIcons from '@/plugins/tablerIcons'
import { useProject } from '@/composables/useProject'
import { computed, ref, watch } from 'vue'
import { handleFetchErrors } from '@/utils/handleFetchErrors'
import { PROJECT_COLORS } from '@/constants/colors'
import { useElement } from '@/composables/useElement'
import { useDate } from '@/composables/useDate'
import { useBreakpoints } from '@/composables/useBreakpoints'
import dayjs from 'dayjs'


const { isDark } = useTheme()
const { dateCalendar, setDateCalendar } = useApp()
const { calendarElements, getCalendarElements } = useElement()
const { formatAssignedDate, timezone } = useDate()
const { isDesktop } = useBreakpoints()

const date = computed({
  get: () => dateCalendar.value,
  set: (val: Date) => setDateCalendar(val),
})

// PROJECTS
const {
  getProjects,
  currentProject,
  isAllProjects,
  toggleProjectsDrawer,
} = useProject()

const getProjectIcon = (iconName: string) => {
  if (iconName in TablerIcons) {
    return TablerIcons[iconName as keyof typeof TablerIcons]
  }
  return TablerIcons.IconCircle
}

const isProjectsLoading = ref(false)
const fetchProjects = async () => {
  isProjectsLoading.value = true
  await getProjects()
    .catch((error) => {
      handleFetchErrors(error)
    })
    .finally(() => {
      isProjectsLoading.value = false
    })
}
fetchProjects()

// SEARCH
const { searchElements, isSearching, getElements } = useElement()

const searchQuery = ref('')
const searchTimeout = ref<number | null>(null)
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

const elementMarkers = computed(() => {
  return calendarElements.value.map((element) => {
    return {
      date: dayjs(element.assignedDate).add(1, 'day').format('YYYY-MM-DD'),
      type: 'dot',
      color: 'orange',
    }
  })
})

// CALENDAR
const currentYear = ref(dateCalendar.value.getFullYear())
const fetchCalendarElements = async () => {
  await getCalendarElements(currentYear.value, currentProject.value?.id)
    .catch((error) => {
      handleFetchErrors(error)
    })
}
fetchCalendarElements()

watch(dateCalendar, () => {
  if (dateCalendar.value.getFullYear() !== currentYear.value) {
    currentYear.value = dateCalendar.value.getFullYear()
    fetchCalendarElements()
  }
})
</script>