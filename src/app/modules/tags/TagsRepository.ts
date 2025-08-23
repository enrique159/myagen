import Http from '@/app/network/Http'
import Routes from '@/app/shared/routes'
import { type Response } from '@/app/network/domain/interfaces'
import env from '@/app/shared/env'
import type { ICreateTagPayload, IUpdateTagPayload, Tag } from './domain/tag'

const http = new Http()

export const createTag = async (
  payload: ICreateTagPayload,
): Promise<Response<Tag>> => {
  const url = Routes.createTag(env.apiBase)
  const response = await http.post<ICreateTagPayload, Tag>(url, {
    data: payload,
  })
  return response
}

export const getTags = async (): Promise<Response<Tag[]>> => {
  const url = Routes.getTags(env.apiBase)
  const response = await http.get<null, Tag[]>(url)
  return response
}

export const updateTag = async (
  tagId: string,
  payload: IUpdateTagPayload,
): Promise<Response<Tag>> => {
  const url = Routes.updateTag(env.apiBase, tagId)
  const response = await http.put<IUpdateTagPayload, Tag>(url, {
    data: payload,
  })
  return response
}

export const deleteTag = async (tagId: string): Promise<Response<Tag>> => {
  const url = Routes.deleteTag(env.apiBase, tagId)
  const response = await http.delete<null, Tag>(url)
  return response
}

  