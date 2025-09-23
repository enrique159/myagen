import Http from '@/app/network/Http'
import Routes from '@/app/shared/routes'
import { type Response } from '@/app/network/domain/interfaces'
import env from '@/app/shared/env'
import type { ICreateReminderPayload, IGetRemindersPayload, IUpdateReminderPayload, Reminder } from './domain/reminder'

const http = new Http()

export const getReminders = async (payload: IGetRemindersPayload): Promise<Response<Reminder[]>> => {
  const url = Routes.getReminders(env.apiBase)
  const response = await http.get<IGetRemindersPayload, Reminder[]>(url, {
    params: {
      startDate: payload.startDate,
      endDate: payload.endDate,
    },
  })
  return response
}

export const createReminder = async (
  payload: ICreateReminderPayload,
): Promise<Response<Reminder>> => {
  const url = Routes.createReminder(env.apiBase)
  const response = await http.post<ICreateReminderPayload, Reminder>(url, {
    data: payload,
  })
  return response
}

export const updateReminder = async (
  reminderId: string,
  payload: IUpdateReminderPayload,
): Promise<Response<Reminder>> => {
  const url = Routes.updateReminder(env.apiBase, reminderId)
  const response = await http.put<IUpdateReminderPayload, Reminder>(url, {
    data: payload,
  })
  return response
}

export const deleteReminder = async (reminderId: string): Promise<Response<Reminder>> => {
  const url = Routes.deleteReminder(env.apiBase, reminderId)
  const response = await http.delete<null, Reminder>(url)
  return response
}

  