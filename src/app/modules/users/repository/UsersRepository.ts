import Http from '@/app/network/Http'
import Routes from '@/app/shared/routes'
import { type ICreateUserPayload, type IUpdateUserPayload, type User } from '../domain/user.d'
import { type Response } from '@/app/network/domain/interfaces'
import env from '@/app/shared/env'
import type { ISignInResponse } from '@/app/auth/domain/auth'

const http = new Http()

export const signUp = async (
  payload: ICreateUserPayload,
): Promise<Response<ISignInResponse>> => {
  const url = Routes.signUp(env.apiBase)
  const response = await http.post<ICreateUserPayload, ISignInResponse>(url, {
    data: payload,
  })
  return response
}

export const updateUser = async (payload: IUpdateUserPayload): Promise<Response<User>> => {
  const url = Routes.updateUser(env.apiBase)
  const response = await http.put<IUpdateUserPayload, User>(url, {
    data: payload,
  })
  return response
}