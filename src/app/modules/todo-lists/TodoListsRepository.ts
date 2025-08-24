import Http from '@/app/network/Http'
import Routes from '@/app/shared/routes'
import { type Response } from '@/app/network/domain/interfaces'
import env from '@/app/shared/env'
import type { ICreateTodoListPayload, IUpdateTodoListPayload, TodoList } from './domain/todo-list'

const http = new Http()

export const createList = async (
  payload: ICreateTodoListPayload,
): Promise<Response<TodoList>> => {
  const url = Routes.createList(env.apiBase)
  const response = await http.post<ICreateTodoListPayload, TodoList>(url, {
    data: payload,
  })
  return response
}

export const updateList = async (
  listId: string,
  payload: IUpdateTodoListPayload,
): Promise<Response<TodoList>> => {
  const url = Routes.updateList(env.apiBase, listId)
  const response = await http.put<IUpdateTodoListPayload, TodoList>(url, {
    data: payload,
  })
  return response
}

export const deleteList = async (listId: string): Promise<Response<TodoList>> => {
  const url = Routes.deleteList(env.apiBase, listId)
  const response = await http.delete<null, TodoList>(url)
  return response
}
  