import Http from '@/app/network/Http'
import Routes from '@/app/shared/routes'
import { type Response } from '@/app/network/domain/interfaces'
import env from '@/app/shared/env'
import type { ICreateProjectPayload, IUpdateProjectPayload, Project } from './domain/project'

const http = new Http()

export const createProject = async (
  payload: ICreateProjectPayload,
): Promise<Response<Project>> => {
  const url = Routes.createProject(env.apiBase)
  const response = await http.post<ICreateProjectPayload, Project>(url, {
    data: payload,
  })
  return response
}

export const updateProject = async (
  projectId: string,
  payload: IUpdateProjectPayload,
): Promise<Response<Project>> => {
  const url = Routes.updateProject(env.apiBase, projectId)
  const response = await http.put<IUpdateProjectPayload, Project>(url, {
    data: payload,
  })
  return response
}

export const getProject = async (
  projectId: string,
): Promise<Response<Project>> => {
  const url = Routes.getProject(env.apiBase, projectId)
  const response = await http.get<null, Project>(url)
  return response
}

export const getProjects = async (): Promise<Response<Project[]>> => {
  const url = Routes.getProjects(env.apiBase)
  const response = await http.get<null, Project[]>(url)
  return response
}


