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
        class="text-base-content placeholder:text-base-300 w-full outline-none"
      />
    </label>

    <DatePicker
      v-model="date"
      inline
      auto-apply
      :dark="isDark"
      :enable-time-picker="false"
      locale="es-MX"
    />

    <div
      class="flex justify-between items-center gap-2 bg-base-100 px-4 py-3 rounded-2xl"
    >
      <div>
        <p class="text-base-content/60 text-sm">Proyecto</p>
        <p class="text-base-content text-lg font-semibold">
          {{ isAllProjects ? 'Todos' : currentProject?.name }}
        </p>
      </div>
      <button
        class="btn btn-circle btn-ghost bg-gradient-to-tr from-orange-400 to-pink-600 text-white"
        @click="showModal = true"
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
    v-model="showModal"
    title="Proyectos"
    description="Selecciona un proyecto"
  >
    <div class="flex flex-col w-full gap-4">
      <button
        class="btn btn-ghost w-fit mx-auto p-2 h-6 text-info"
        @click="handleSelectProject(null)"
      >
        Mostrar todo
      </button>

      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="project in projects"
          :key="project.id"
          class="btn btn-soft border-none rounded-full"
          :class="[ isColorDark(project.color || '#ccc') ? 'text-gray-900' : 'text-gray-100' ]"
          :style="{ backgroundColor: project.color || '#ccc' }"
          @click="handleSelectProject(project)"
        >
          <component v-if="project.icon" :is="getProjectIcon(project.icon)" />
          {{ project.name }}
        </button>
      </div>
    </div>
  </basic-modal>
</template>

<script setup lang="ts">
import { useApp } from '@/composables/useApp'
import { useTheme } from '@/composables/useTheme'
import TablerIcons from '@/plugins/tablerIcons'
import { useProject } from '@/composables/useProject'
import { computed, ref } from 'vue'
import { handleFetchErrors } from '@/utils/handleFetchErrors'
import type { Project } from '@/app/modules/projects/domain/project'
import { isColorDark } from '@/utils/colors'

const { isDark } = useTheme()
const { dateCalendar, setDateCalendar } = useApp()

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
  isAllProjects,
} = useProject()

// Función para obtener el icono del proyecto de forma sincrónica
const getProjectIcon = (iconName: string) => {
  // Verificar si el icono existe en TablerIcons
  if (iconName in TablerIcons) {
    return TablerIcons[iconName as keyof typeof TablerIcons];
  }
  // Si no existe, devolver un icono por defecto
  return TablerIcons.IconCircle;
};

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


const showModal = ref(false)

const handleSelectProject = (project: Project | null) => {
  setCurrentProject(project)
  showModal.value = false
}
</script>

<style lang="scss" scoped></style>
