<template>
  <div
    class="absolute top-0 w-full h-full transition-all duration-200 ease-in-out z-[100]"
    :class="[showProjectsDrawer ? 'left-0' : '-left-full']"
    @click.self="toggleProjectsDrawer()"
  >
    <div class="bg-base-100 border-r border-base-content/10 w-[280px] h-full p-6 relative">
      <button class="absolute top-4 right-4 btn btn-circle btn-ghost btn-sm text-base-300" @click="toggleProjectsDrawer()">
        <IconX />
      </button>
      <h6 class="text-xl text-base-content/80 font-semibold mb-4">Proyectos</h6>
      <div class="grid grid-cols-1 gap-2">
        <button class="btn btn-ghost text-info border-none rounded-xl" @click="handleCreateProject">
          <TablerIcons.IconPlus />
          nuevo proyecto
        </button>
        <div
          v-for="project in projects"
          :key="project.id"
          class="btn btn-soft border-none h-12 rounded-xl flex justify-start relative"
          :class="[
            isColorDark(project.color || '#ccc')
              ? 'text-gray-900'
              : 'text-gray-100',
          ]"
          :style="{ backgroundColor: project.color || '#ccc' }"
          @click="handleSelectProject(project)"
        >
          <component v-if="project.icon" :is="getProjectIcon(project.icon)" />
          <TablerIcons.IconCircle v-else />
          {{ project.name }}

          <button
            class="btn btn-ghost btn-circle btn-sm absolute right-2 top-2"
            @click="handleEditProject(project)"
          >
            <TablerIcons.IconEdit size="18" />
          </button>
        </div>

        <button class="btn btn-ghost text-info border-none rounded-xl" @click="handleShowAllProjects">
          mostrar todo
        </button>
      </div>
    </div>
  </div>

  <!-- CREATE PROJECT MODAL -->
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
              class="w-7 h-7 rounded-full cursor-pointer hover:scale-110 transition-all duration-200 flex items-center justify-center"
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

  <!-- UPDATE PROJECT MODAL -->
  <basic-modal
    v-model="showEditProjectModal"
    title="Editar proyecto"
    description="Edita un proyecto"
    :close-on-click-outside="false"
  >
    <div class="flex flex-col w-full gap-4 pb-6">
      <input
        type="text"
        v-model="editProjectName"
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
              :style="{ backgroundColor: editProjectColor }"
            ></div>
            <span>{{ getColorName(editProjectColor) }}</span>
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
              class="w-7 h-7 rounded-full cursor-pointer hover:scale-110 transition-all duration-200 flex items-center justify-center"
              :style="{ backgroundColor: color.value }"
              @click="selectEditColor(color.value)"
            >
              <component
                v-if="editProjectColor === color.value"
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
              v-if="editProjectIcon"
              :is="getProjectIcon(editProjectIcon)"
              size="20"
            />
            <span>{{ editProjectIcon || 'Selecciona un icono' }}</span>
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
                @click="selectEditIcon(icon)"
                :class="{ 'bg-base-200': editProjectIcon === icon }"
              >
                <component :is="getProjectIcon(icon)" size="24" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        class="btn btn-primary btn-soft"
        @click="editProject"
        :disabled="isLoadingEditProject"
      >
        <span>Editar proyecto</span>
        <loading-spinner v-if="isLoadingEditProject" />
      </button>
    </div>
  </basic-modal>
</template>

<script setup lang="ts">
import type { ICreateProjectPayload, IUpdateProjectPayload, Project } from '@/app/modules/projects/domain/project'
import { useProject } from '@/composables/useProject'
import { PROJECT_COLORS } from '@/constants/colors'
import { isColorDark } from '@/utils/colors'
import { handleFetchErrors } from '@/utils/handleFetchErrors'
import * as TablerIcons from '@tabler/icons-vue'
import { IconX } from '@tabler/icons-vue'
import { computed, ref } from 'vue'
const {
  createProject,
  showProjectsDrawer,
  toggleProjectsDrawer,
  projects,
  setCurrentProject,
  updateProject,
} = useProject()

const getProjectIcon = (iconName: string) => {
  if (iconName in TablerIcons) {
    return TablerIcons[iconName as keyof typeof TablerIcons]
  }
  return TablerIcons.IconCircle
}

const handleSelectProject = (project: Project | null) => {
  setCurrentProject(project)
  toggleProjectsDrawer()
}

const handleShowAllProjects = () => {
  setCurrentProject(null)
  toggleProjectsDrawer()
}

// NEW PROJECT
const newProjectName = ref('')
const newProjectColor = ref<string>(PROJECT_COLORS.AZUL)
const newProjectIcon = ref('')
const showCreateProjectModal = ref(false)

const handleCreateProject = () => {
  showCreateProjectModal.value = true
}

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

const selectEditColor = (color: string) => {
  editProjectColor.value = color
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

const selectEditIcon = (icon: string) => {
  editProjectIcon.value = icon
}

const isLoadingCreateProject = ref(false)
const createNewProject = async () => {
  const payload: ICreateProjectPayload = {
    name: newProjectName.value,
    color: newProjectColor.value,
    icon: newProjectIcon.value,
  }

  isLoadingCreateProject.value = true
  createProject(payload)
    .then(async (response) => {
      const project = response.data
      setCurrentProject(project)
    })
    .catch((error) => {
      handleFetchErrors(error)
    })
    .finally(() => {
      isLoadingCreateProject.value = false
      showCreateProjectModal.value = false
    })
}

// EDIT PROJECT
const showEditProjectModal = ref(false)
const selectedProject = ref<Project | null>(null)

const handleEditProject = (project: Project) => {
  showEditProjectModal.value = true
  selectedProject.value = project
  editProjectName.value = project.name
  editProjectColor.value = project.color || PROJECT_COLORS.AZUL
  editProjectIcon.value = project.icon || 'IconCircle'
}

const editProjectName = ref('')
const editProjectColor = ref<string>(PROJECT_COLORS.AZUL)
const editProjectIcon = ref('')

const isLoadingEditProject = ref(false)
const editProject = async () => {
  const payload: IUpdateProjectPayload = {
    name: editProjectName.value,
    color: editProjectColor.value,
    icon: editProjectIcon.value,
  }

  isLoadingEditProject.value = true
  updateProject(selectedProject.value?.id || '', payload)
    .then(async (response) => {
      const project = response.data
      setCurrentProject(project)
    })
    .catch((error) => {
      handleFetchErrors(error)
    })
    .finally(() => {
      isLoadingEditProject.value = false
      showEditProjectModal.value = false
      selectedProject.value = null
      editProjectName.value = ''
      editProjectColor.value = PROJECT_COLORS.AZUL
      editProjectIcon.value = ''
    })
}

</script>
