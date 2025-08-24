import type { ICreateElementPayload, IGetElementsParams, IUpdateElementPayload } from '@/app/modules/elements/domain/element'
import type { ICreateTagPayload, IUpdateTagPayload } from '@/app/modules/tags/domain/tag'
import type { ICreateTaskPayload, IUpdateTaskPayload } from '@/app/modules/tasks/domain/task'
import type { ICreateTodoListPayload, IUpdateTodoListPayload } from '@/app/modules/todo-lists/domain/todo-list'
import { useElementStore } from '@/stores/elementStore'
import { storeToRefs } from 'pinia'

export const useElement = () => {
  const elementStore = useElementStore()
  const { elements, tags } = storeToRefs(elementStore)

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

  function deleteElement(elementId: string) {
    return elementStore.deleteElement(elementId)
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
    deleteElement,
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
  }
}
