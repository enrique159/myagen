import axios, {
  type AxiosInstance,
  AxiosError,
  type RawAxiosRequestHeaders,
} from 'axios'
import { type IHttp } from './domain/interfaces/IHttp'

import type { Response } from './domain/interfaces'
import type { IPayload } from './domain/interfaces'
import Exception from '../shared/error/Exception'
import {
  NetworkStatusCode as HttpStatusCode,
  NetworkStatusCode,
} from '../shared/enums/networkStatusCode'

const TIME_OUT = 10000
const WITH_CREDENTIALS = false

export default class Http implements IHttp {
  private axios!: AxiosInstance

  private requestHeaders = (headers: RawAxiosRequestHeaders) => {
    const token = localStorage.getItem('myagen-token')
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    }
  }

  constructor() {
    this.instanceAxios()
  }

  private instanceAxios() {
    this.axios = axios.create()
  }

  /*
   *********** GET ***********
   */
  async get<T, U>(url: string, payload?: IPayload<T>): Promise<Response<U>> {
    try {
      const response = await this.axios.get(url, {
        params: payload?.params,
        headers: this.requestHeaders(payload?.headers ?? {}),
        timeout: payload?.timeout ?? TIME_OUT,
        data: payload?.data ?? null,
        withCredentials: payload?.auth || WITH_CREDENTIALS,
      })

      return response.data
    } catch (err) {
      return handleException(err as AxiosError)
    }
  }

  /*
   *********** POST ***********
   */
  async post<T, U>(url: string, payload?: IPayload<T>): Promise<Response<U>> {
    try {
      const response = await this.axios.post(url, payload?.data ?? {}, {
        params: payload?.params,
        headers: this.requestHeaders(payload?.headers ?? {}),
        data: payload?.data ?? {},
        timeout: payload?.timeout ?? TIME_OUT,
        withCredentials: payload?.auth || WITH_CREDENTIALS,
      })

      return response.data
    } catch (err) {
      return handleException(err as AxiosError)
    }
  }

  /*
   *********** PUT ***********
   */
  async put<T, U>(url: string, payload?: IPayload<T>): Promise<Response<U>> {
    try {
      const response = await this.axios.put(url, payload?.data ?? {}, {
        params: payload?.params,
        headers: this.requestHeaders(payload?.headers ?? {}),
        data: payload?.data ?? {},
        timeout: payload?.timeout ?? TIME_OUT,
        withCredentials: payload?.auth || WITH_CREDENTIALS,
      })

      return response.data
    } catch (err) {
      return handleException(err as AxiosError)
    }
  }

  /*
   *********** DELETE ***********
   */
  async delete<T, U>(url: string, payload?: IPayload<T>): Promise<Response<U>> {
    try {
      const response = await this.axios.delete(url, {
        params: payload?.params,
        headers: this.requestHeaders(payload?.headers ?? {}),
        data: payload?.data ?? {},
        timeout: payload?.timeout ?? TIME_OUT,
        withCredentials: payload?.auth || WITH_CREDENTIALS,
      })

      return response.data
    } catch (err) {
      return handleException(err as AxiosError)
    }
  }

  /*
   *********** PATCH ***********
   */
  async patch<T, U>(url: string, payload?: IPayload<T>): Promise<Response<U>> {
    try {
      const response = await this.axios.patch(url, {
        params: payload?.params,
        headers: this.requestHeaders(payload?.headers ?? {}),
        data: payload?.data ?? {},
        timeout: payload?.timeout ?? TIME_OUT,
        withCredentials: payload?.auth || WITH_CREDENTIALS,
      })

      return response.data
    } catch (err) {
      return handleException(err as AxiosError)
    }
  }
}

const handleException = (err: AxiosError) => {
  if (err instanceof AxiosError) {
    if (err.code === 'ECONNABORTED') {
      throw new Exception(HttpStatusCode.REQUEST_TIMEOUT, [
        'El tiempo de respuesta se ha excedido, intenta de nuevo.',
      ])
    }
    if (err.code === 'ERR_NETWORK') {
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [
        'Parece que ocurre un error de red, intenta de nuevo.',
      ])
    }
    let errorResponse: { status: NetworkStatusCode; message: string } = {
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: 'Ha ocurrido un error en el servidor, contacta a soporte.',
    }
    if (
      err.response?.data &&
      err.response?.status !== HttpStatusCode.INTERNAL_SERVER_ERROR
    ) {
      errorResponse = err.response?.data as {
        status: NetworkStatusCode
        message: string
      }
    }
    throw new Exception(
      errorResponse.status ??
        err.response?.status ??
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      Array.isArray(errorResponse.message)
        ? errorResponse.message
        : [errorResponse.message],
    )
  } else {
    console.log('🚨 Unexpected error: ', err)
    throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [
      'Ha ocurrido un error en el servidor, contacta a soporte.',
    ])
  }
}
