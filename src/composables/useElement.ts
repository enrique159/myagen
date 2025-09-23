import type { ICreateElementPayload, IGetElementsParams, IUpdateElementPayload } from '@/app/modules/elements/domain/element'
import type { ICreateReminderPayload, IUpdateReminderPayload } from '@/app/modules/reminders/domain/reminder'
import type { ICreateTagPayload, IUpdateTagPayload } from '@/app/modules/tags/domain/tag'
import type { ICreateTaskPayload, IUpdateTaskPayload } from '@/app/modules/tasks/domain/task'
import type { ICreateTodoListPayload, IUpdateTodoListPayload } from '@/app/modules/todo-lists/domain/todo-list'
import { useElementStore } from '@/stores/elementStore'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const isLoadingSearch = ref(false)

export const useElement = () => {
  const elementStore = useElementStore()
  const { elements, tags, calendarElements, reminders } = storeToRefs(elementStore)

  const isSearching = computed({
    get: () => isLoadingSearch.value,
    set: (value) => {
      isLoadingSearch.value = value
    },
  })

  // Mutations
  function removeElement(elementId: string) {
    return elementStore.removeElement(elementId)
  }

  function addTagsToElement(elementId: string, tagIds: string[]) {
    return elementStore.addTagsToElement(elementId, tagIds)
  }

  function removeTagsFromElement(elementId: string, tagIds: string[]) {
    return elementStore.removeTagsFromElement(elementId, tagIds)
  }

  // Actions
  function createElement(payload: ICreateElementPayload) {
    return elementStore.createElement(payload)
  }

  function updateElement(elementId: string, payload: IUpdateElementPayload) {
    return elementStore.updateElement(elementId, payload)
  }

  function getElements(params: IGetElementsParams) {
    return elementStore.getElements(params)
  }

  function searchElements(params: { query: string }) {
    return elementStore.searchElements(params)
  }

  function deleteElement(elementId: string) {
    return elementStore.deleteElement(elementId)
  }

  // CALENDAR
  function getCalendarElements(year: number, projectId?: string) {
    return elementStore.getCalendarElements(year, projectId)
  }

  // TAGS
  function createTag(payload: ICreateTagPayload) {
    return elementStore.createTag(payload)
  }

  function getTags() {
    return elementStore.getTags()
  }

  function updateTag(tagId: string, payload: IUpdateTagPayload) {
    return elementStore.updateTag(tagId, payload)
  }

  function deleteTag(tagId: string) {
    return elementStore.deleteTag(tagId)
  }

  // REMINDERS
  function getReminders() {
    return elementStore.getReminders()
  }
  function createReminder(payload: ICreateReminderPayload) {
    return elementStore.createReminder(payload)
  }

  function updateReminder(reminderId: string, payload: IUpdateReminderPayload) {
    return elementStore.updateReminder(reminderId, payload)
  }

  function deleteReminder(reminderId: string) {
    return elementStore.deleteReminder(reminderId)
  }

  // TODO-LISTS
  function createList(payload: ICreateTodoListPayload) {
    return elementStore.createList(payload)
  }

  function updateList(listId: string, payload: IUpdateTodoListPayload) {
    return elementStore.updateList(listId, payload)
  }

  function deleteList(elementId: string, listId: string) {
    return elementStore.deleteList(elementId, listId)
  }

  // TASKS
  function createTask(elementId: string, payload: ICreateTaskPayload) {
    return elementStore.createTask(elementId, payload)
  }

  function updateTask(ids: { elementId: string, listId: string, taskId: string }, payload: IUpdateTaskPayload) {
    return elementStore.updateTask(ids.elementId, ids.listId, ids.taskId, payload)
  }

  function deleteTask(ids: { elementId: string, listId: string, taskId: string }) {
    return elementStore.deleteTask(ids.elementId, ids.listId, ids.taskId)
  }

  return {
    // ELEMENTS
    elements,
    removeElement,
    addTagsToElement,
    removeTagsFromElement,
    createElement,
    updateElement,
    getElements,
    searchElements,
    deleteElement,
    isSearching,
    // CALENDAR
    calendarElements,
    getCalendarElements,
    // TAGS
    tags,
    createTag,
    getTags,
    updateTag,
    deleteTag,
    // TODO-LISTS
    createList,
    updateList,
    deleteList,
    // TASKS
    createTask,
    updateTask,
    deleteTask,
    // REMINDERS
    reminders,
    getReminders,
    createReminder,
    updateReminder,
    deleteReminder,
  }
}
