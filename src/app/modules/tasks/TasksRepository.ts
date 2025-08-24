import Http from '@/app/network/Http'
import Routes from '@/app/shared/routes'
import { type Response } from '@/app/network/domain/interfaces'
import env from '@/app/shared/env'
import type { ICreateTaskPayload, IUpdateTaskPayload, Task } from './domain/task'

const http = new Http()

export const createTask = async (
  payload: ICreateTaskPayload,
): Promise<Response<Task>> => {
  const url = Routes.createTask(env.apiBase)
  const response = await http.post<ICreateTaskPayload, Task>(url, {
    data: payload,
  })
  return response
}

export const updateTask = async (
  taskId: string,
  payload: IUpdateTaskPayload,
): Promise<Response<Task>> => {
  const url = Routes.updateTask(env.apiBase, taskId)
  const response = await http.put<IUpdateTaskPayload, Task>(url, {
    data: payload,
  })
  return response
}

export const deleteTask = async (taskId: string): Promise<Response<Task>> => {
  const url = Routes.deleteTask(env.apiBase, taskId)
  const response = await http.delete<null, Task>(url)
  return response
}
  