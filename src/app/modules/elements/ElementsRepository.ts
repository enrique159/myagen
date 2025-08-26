import Http from '@/app/network/Http'
import Routes from '@/app/shared/routes'
import { type Response } from '@/app/network/domain/interfaces'
import env from '@/app/shared/env'
import type { ICreateElementPayload, Element, IUpdateElementPayload, IGetElementsParams } from './domain/element'

const http = new Http()

export const createElement = async (
  payload: ICreateElementPayload,
): Promise<Response<Element>> => {
  const url = Routes.createElement(env.apiBase)
  const response = await http.post<ICreateElementPayload, Element>(url, {
    data: payload,
  })
  return response
}

export const updateElement = async (
  elementId: string,
  payload: IUpdateElementPayload,
): Promise<Response<Element>> => {
  const url = Routes.updateElement(env.apiBase, elementId)
  const response = await http.put<IUpdateElementPayload, Element>(url, {
    data: payload,
  })
  return response
}

export const getElements = async (params: IGetElementsParams): Promise<Response<Element[]>> => {
  const url = Routes.getElements(env.apiBase)
  const response = await http.get<null, Element[]>(url, { params: { ...params } })
  return response
}

export const searchElements = async (params: { query: string }): Promise<Response<Element[]>> => {
  const url = Routes.searchElements(env.apiBase)
  const response = await http.get<null, Element[]>(url, { params: { ...params } })
  return response
}

export const deleteElement = async (elementId: string): Promise<Response<Element>> => {
  const url = Routes.deleteElement(env.apiBase, elementId)
  const response = await http.delete<null, Element>(url)
  return response
}

export const addTags = async (elementId: string, tagIds: string[]): Promise<Response<Element>> => {
  const url = Routes.addTags(env.apiBase, elementId)
  const response = await http.post<{ tagIds: string[] }, Element>(url, {
    data: { tagIds },
  })
  return response
}

export const removeTags = async (elementId: string, tagIds: string[]): Promise<Response<Element>> => {
  const url = Routes.removeTags(env.apiBase, elementId)
  const response = await http.delete<{ tagIds: string[] }, Element>(url, {
    data: { tagIds },
  })
  return response
}

  