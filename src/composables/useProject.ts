import type { ICreateProjectPayload, IUpdateProjectPayload, Project } from '@/app/modules/projects/domain/project'
import { useProjectStore } from '@/stores/projectStore'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const showDrawer = ref(false)

export const useProject = () => {
  const projectStore = useProjectStore()
  const { projects, currentProject } = storeToRefs(projectStore)

  // Getter para saber si la seleccion es mostrar todo
  const isAllProjects = computed(() => !currentProject.value)
  const showProjectsDrawer = computed(() => showDrawer.value)

  // Mutations
  function setCurrentProject(project: Project | null) {
    projectStore.currentProject = project
  }

  function toggleProjectsDrawer() {
    showDrawer.value = !showDrawer.value
  }

  // Actions
  function getProjects() {
    return projectStore.getProjects()
  }

  function createProject(payload: ICreateProjectPayload) {
    return projectStore.createProject(payload)
  }

  function updateProject(projectId: string, payload: IUpdateProjectPayload) {
    return projectStore.updateProject(projectId, payload)
  }

  function getProject(projectId: string) {
    return projectStore.getProject(projectId)
  }

  return {
    projects,
    showProjectsDrawer,
    toggleProjectsDrawer,
    currentProject,
    setCurrentProject,
    isAllProjects,
    getProjects,
    createProject,
    updateProject,
    getProject,
  }
}
  