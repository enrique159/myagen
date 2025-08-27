<template>
  <div class="p-6 space-y-6 relative h-full">
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
          <component :is="getProjectIcon(currentProject?.icon || 'IconCircle')" size="20" stroke-width="3" />
          {{ currentProject?.name }}
        </p>
      </div>
      <button
        class="btn btn-circle btn-ghost bg-gradient-to-tr from-orange-400 to-pink-600 text-white"
        @click="showSelectProjectModal = true"
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

  <basic-modal
    v-model="showSelectProjectModal"
    title="Proyectos"
    description="Selecciona un proyecto"
  >
    <div class="flex flex-col w-full gap-4">
      <div class="flex items-center justify-between">
        <button
          class="btn btn-ghost w-fit p-2 h-6 text-info"
          @click="handleSelectProject(null)"
        >
          Mostrar todo
        </button>
        <button
          class="btn btn-ghost w-fit p-2 h-6 text-info"
          @click="handleCreateProject"
        >
          Nuevo proyecto
        </button>
      </div>

      <div class="grid grid-cols-2 gap-2 pb-6">
        <button
          v-for="project in projects"
          :key="project.id"
          class="btn btn-soft border-none rounded-full"
          :class="[
            isColorDark(project.color || '#ccc')
              ? 'text-gray-900'
              : 'text-gray-100',
          ]"
          :style="{ backgroundColor: project.color || '#ccc' }"
          @click="handleSelectProject(project)"
        >
          <component v-if="project.icon" :is="getProjectIcon(project.icon)" />
          {{ project.name }}
        </button>
      </div>
    </div>
  </basic-modal>

  <basic-modal
    v-model="showCreateProjectModal"
    title="Nuevo proyecto"
    description="Crea un nuevo proyecto"
    :close-on-click-outside="false"
  >
    <div class="flex flex-col w-full gap-4 pb-6">
      <input
        type="text"
        v-model="newProjectName"
        placeholder="Nombre del proyecto"
        class="input input-bordered w-full"
      />
      <div class="dropdown w-full">
        <div
          tabindex="0"
          role="button"
          class="input input-bordered w-full flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-5 h-5 rounded-full"
              :style="{ backgroundColor: newProjectColor }"
            ></div>
            <span>{{ getColorName(newProjectColor) }}</span>
          </div>
          <component :is="TablerIcons.IconChevronDown" size="18" />
        </div>
        <div
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full mt-1"
        >
          <div class="grid grid-cols-8 gap-2 p-2">
            <div
              v-for="color in projectColors"
              :key="color.value"
              class="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-all duration-200 flex items-center justify-center"
              :style="{ backgroundColor: color.value }"
              @click="selectColor(color.value)"
            >
              <component
                v-if="newProjectColor === color.value"
                :is="TablerIcons.IconCheck"
                class="text-white"
                size="18"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown w-full">
        <div
          tabindex="0"
          role="button"
          class="input input-bordered w-full flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <component
              v-if="newProjectIcon"
              :is="getProjectIcon(newProjectIcon)"
              size="20"
            />
            <span>{{ newProjectIcon || 'Selecciona un icono' }}</span>
          </div>
          <component :is="TablerIcons.IconChevronDown" size="18" />
        </div>
        <div
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full mt-1 max-h-60 overflow-y-auto"
        >
          <div class="flex flex-col gap-2">
            <input
              type="text"
              v-model="iconSearchQuery"
              placeholder="Buscar icono"
              class="input input-sm bg-base-200 border-none focus:outline-none w-full mb-2"
            />
            <div class="grid grid-cols-8 gap-2 p-2">
              <div
                v-for="icon in filteredIcons"
                :key="icon"
                class="p-1 rounded-full cursor-pointer hover:bg-base-200 transition-all duration-200 flex items-center justify-center"
                @click="selectIcon(icon)"
                :class="{ 'bg-base-200': newProjectIcon === icon }"
              >
                <component :is="getProjectIcon(icon)" size="24" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        class="btn btn-primary btn-soft"
        @click="createNewProject"
        :disabled="isLoadingCreateProject"
      >
        <span>Crear proyecto</span>
        <loading-spinner v-if="isLoadingCreateProject" />
      </button>
    </div>
  </basic-modal>
</template>

<script setup lang="ts">
import { useApp } from '@/composables/useApp'
import { useTheme } from '@/composables/useTheme'
import TablerIcons from '@/plugins/tablerIcons'
import { useProject } from '@/composables/useProject'
import { computed, ref, watch } from 'vue'
import { handleFetchErrors } from '@/utils/handleFetchErrors'
import type {
  ICreateProjectPayload,
  Project,
} from '@/app/modules/projects/domain/project'
import { isColorDark } from '@/utils/colors'
import { PROJECT_COLORS } from '@/constants/colors'
import { useElement } from '@/composables/useElement'
import { useDate } from '@/composables/useDate'
import dayjs from 'dayjs'

const { isDark } = useTheme()
const { dateCalendar, setDateCalendar } = useApp()
const { calendarElements, getCalendarElements } = useElement()
const { formatAssignedDate, timezone } = useDate()

const date = computed({
  get: () => dateCalendar.value,
  set: (val: Date) => setDateCalendar(val),
})

// PROJECTS
const {
  getProjects,
  projects,
  setCurrentProject,
  currentProject,
  createProject,
  isAllProjects,
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

const showSelectProjectModal = ref(false)
const showCreateProjectModal = ref(false)

const handleSelectProject = (project: Project | null) => {
  setCurrentProject(project)
  showSelectProjectModal.value = false
}

const handleCreateProject = () => {
  showCreateProjectModal.value = true
}

// NEW PROJECT
const newProjectName = ref('')
const newProjectColor = ref<string>(PROJECT_COLORS.AZUL)
const newProjectIcon = ref('')

// Lista de colores predefinidos para proyectos
interface ProjectColor {
  name: string
  value: string
}

const projectColors = ref<ProjectColor[]>([
  { name: 'Azul', value: PROJECT_COLORS.AZUL },
  { name: 'Rojo', value: PROJECT_COLORS.ROJO },
  { name: 'Verde', value: PROJECT_COLORS.VERDE },
  { name: 'Amarillo', value: PROJECT_COLORS.AMARILLO },
  { name: 'Púrpura', value: PROJECT_COLORS.PURPURA },
  { name: 'Rosa', value: PROJECT_COLORS.ROSA },
  { name: 'Indigo', value: PROJECT_COLORS.INDIGO },
  { name: 'Esmeralda', value: PROJECT_COLORS.ESMERALDA },
  { name: 'Naranja', value: PROJECT_COLORS.NARANJA },
  { name: 'Cian', value: PROJECT_COLORS.CIAN },
  { name: 'Lima', value: PROJECT_COLORS.LIMA },
  { name: 'Gris', value: PROJECT_COLORS.GRIS },
])

// Función para seleccionar un color
const selectColor = (color: string) => {
  newProjectColor.value = color
}

// Función para obtener el nombre del color
const getColorName = (colorValue: string): string => {
  const color = projectColors.value.find((c) => c.value === colorValue)
  return color ? color.name : 'Color personalizado'
}

// Búsqueda de iconos
const iconSearchQuery = ref('')

// Lista de iconos comunes para proyectos
const commonProjectIcons = [
  'IconBriefcase',
  'IconCode',
  'IconDeviceDesktop',
  'IconFolder',
  'IconHome',
  'IconBuildingStore',
  'IconChartBar',
  'IconNotes',
  'IconPalette',
  'IconPhoto',
  'IconPresentationAnalytics',
  'IconReportAnalytics',
  'IconSettings',
  'IconUsers',
  'IconWorld',
  'IconBrandGithub',
  'IconBrandFigma',
  'IconBrandGoogle',
  'IconBrandApple',
  'IconBrandAndroid',
  'IconBrandWindows',
  'IconBrandAws',
  'IconBrandNetflix',
  'IconBrandSpotify',
]

const filteredIcons = computed(() => {
  // Si hay búsqueda, filtramos todos los iconos disponibles
  if (iconSearchQuery.value) {
    return Object.keys(TablerIcons).filter((icon) =>
      icon.toLowerCase().includes(iconSearchQuery.value.toLowerCase()),
    )
  }

  // Si no hay búsqueda, mostramos solo los iconos comunes
  return commonProjectIcons.filter((icon) => icon in TablerIcons)
})

// Seleccionar un icono
const selectIcon = (icon: string) => {
  newProjectIcon.value = icon
}

const isLoadingCreateProject = ref(false)
const createNewProject = () => {
  const payload: ICreateProjectPayload = {
    name: newProjectName.value,
    color: newProjectColor.value,
    icon: newProjectIcon.value,
  }

  isLoadingCreateProject.value = true
  createProject(payload)
    .catch((error) => {
      handleFetchErrors(error)
    })
    .finally(() => {
      isLoadingCreateProject.value = false
      showCreateProjectModal.value = false
    })
}

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
      color: 'blue',
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
    .finally(() => {
      console.log('Calendar elements fetched')
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