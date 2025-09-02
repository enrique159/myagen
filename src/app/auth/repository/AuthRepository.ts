import Http from '@/app/network/Http'
import Routes from '@/app/shared/routes'
import { type ISignInPayload, type ISignInResponse, type UserAuth } from '../domain/auth.d'
import { type Response } from '@/app/network/domain/interfaces'
import env from '@/app/shared/env'

const http = new Http()

export const signIn = async (
  payload: ISignInPayload,
): Promise<Response<ISignInResponse>> => {
  const url = Routes.signIn(env.apiBase)
  const response = await http.post<ISignInPayload, ISignInResponse>(url, {
    data: payload,
  })
  return response
}

export const signOut = async (): Promise<Response<string>> => {
  const url = Routes.signOut(env.apiBase)
  const response = await http.post<null, string>(url)
  return response
}

export const check = async (): Promise<Response<UserAuth>> => {
  const url = Routes.check(env.apiBase)
  const response = await http.get<null, UserAuth>(url)
  return response
}
