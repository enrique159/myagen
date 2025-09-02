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
        <button
          v-for="project in projects"
          :key="project.id"
          class="btn btn-soft border-none rounded-xl"
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

        <button class="btn btn-ghost text-info border-none rounded-xl">
          mostrar todo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '@/app/modules/projects/domain/project'
import { useProject } from '@/composables/useProject'
import { isColorDark } from '@/utils/colors'
import * as TablerIcons from '@tabler/icons-vue'
import { IconX } from '@tabler/icons-vue'
const {
  showProjectsDrawer,
  toggleProjectsDrawer,
  projects,
  setCurrentProject,
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
</script>
