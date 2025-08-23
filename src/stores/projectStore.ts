import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ICreateProjectPayload, IUpdateProjectPayload, Project } from '@/app/modules/projects/domain/project'
import {
  getProjects as getProjectsUseCase,
  createProject as createProjectUseCase,
  updateProject as updateProjectUseCase,
  getProject as getProjectUseCase,
} from '@/app/modules/projects/ProjectsRepository'

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([]) 
  const currentProject = ref<Project | null>(null)

  // Actions
  const setProjects = (payload: Project[]) => {
    projects.value = payload
  }

  // API
  const getProjects = async () => {
    const action = await getProjectsUseCase()
      .then((response) => {
        setProjects(response.data)
        return response
      })
      .catch((error) => {
        throw error
      })
    return action
  }

  const createProject = async (payload: ICreateProjectPayload) => {
    const action = await createProjectUseCase(payload)
      .then((response) => {
        return response
      })
      .catch((error) => {
        throw error
      })
    return action
  }

  const updateProject = async (projectId: string, payload: IUpdateProjectPayload) => {
    const action = await updateProjectUseCase(projectId, payload)
      .then((response) => {
        return response
      })
      .catch((error) => {
        throw error
      })
    return action
  }

  const getProject = async (projectId: string) => {
    const action = await getProjectUseCase(projectId)
      .then((response) => {
        return response
      })
      .catch((error) => {
        throw error
      })
    return action
  }

  return {
    projects,
    currentProject,
    getProjects,
    createProject,
    updateProject,
    getProject,
  }
})

  