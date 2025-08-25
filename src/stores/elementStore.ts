import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  Element,
  ICreateElementPayload,
  IGetElementsParams,
  IUpdateElementPayload,
} from '@/app/modules/elements/domain/element.d'
import {
  createElement as createElementUseCase,
  updateElement as updateElementUseCase,
  getElements as getElementsUseCase,
  deleteElement as deleteElementUseCase,
  addTags as addTagsUseCase,
  removeTags as removeTagsUseCase,
} from '@/app/modules/elements/ElementsRepository'
import {
  createTag as createTagUseCase,
  getTags as getTagsUseCase,
  updateTag as updateTagUseCase,
  deleteTag as deleteTagUseCase,
} from '@/app/modules/tags/TagsRepository'
import {
  createList as createListUseCase,
  updateList as updateListUseCase,
  deleteList as deleteListUseCase,
} from '@/app/modules/todo-lists/TodoListsRepository'
import {
  createTask as createTaskUseCase,
  updateTask as updateTaskUseCase,
  deleteTask as deleteTaskUseCase,
} from '@/app/modules/tasks/TasksRepository'
import type { ICreateTagPayload, IUpdateTagPayload, Tag } from '@/app/modules/tags/domain/tag'
import type { ICreateTodoListPayload, IUpdateTodoListPayload, TodoList } from '@/app/modules/todo-lists/domain/todo-list'
import type { ICreateTaskPayload, IUpdateTaskPayload, Task } from '@/app/modules/tasks/domain/task'

export const useElementStore = defineStore('element', () => {
  const elements = ref<Element[]>([])

  const addElement = (element: Element) => {
    elements.value.push(element)
  }

  const setElements = (newElements: Element[]) => {
    elements.value = newElements
  }

  const removeElement = (elementId: string) => {
    elements.value = elements.value.filter(
      (element) => element.id !== elementId,
    )
  }

  const createElement = async (payload: ICreateElementPayload) => {
    const action = await createElementUseCase(payload)
      .then((response) => {
        addElement(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  const updateElement = async (elementId: string, payload: IUpdateElementPayload) => {
    const action = await updateElementUseCase(elementId, payload)
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  const getElements = async (params: IGetElementsParams) => {
    const action = await getElementsUseCase(params)
      .then((response) => {
        setElements(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  const deleteElement = async (elementId: string) => {
    const action = await deleteElementUseCase(elementId)
      .then(() => {
        removeElement(elementId)
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  const addTagsToElement = async (elementId: string, tagIds: string[]) => {
    const action = await addTagsUseCase(elementId, tagIds)
      .then((response) => {
        setTagsElement(elementId, response.data.tags)
        return response
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  const removeTagsFromElement = async (elementId: string, tagIds: string[]) => {
    const action = await removeTagsUseCase(elementId, tagIds)
      .then((response) => {
        setTagsElement(elementId, response.data.tags)
        return response
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  // TAGS
  const tags = ref<Tag[]>([])

  const setTags = (newTags: Tag[]) => {
    tags.value = newTags
  }

  const setTagsElement = (elementId: string, tags: Tag[]) => {
    elements.value = elements.value.map((element) => {
      if (element.id === elementId) {
        element.tags = tags
      }
      return element
    })
  }

  const createTag = async (payload: ICreateTagPayload) => {
    const action = await createTagUseCase(payload)
      .then((response) => {
        setTags([...tags.value, response.data])
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  const getTags = async () => {
    const action = await getTagsUseCase()
      .then((response) => {
        setTags(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  const updateTag = async (tagId: string, payload: IUpdateTagPayload) => {
    const action = await updateTagUseCase(tagId, payload)
      .then((response) => {
        const index = tags.value.findIndex((tag) => tag.id === tagId)
        tags.value[index] = response.data
        return response
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  const deleteTag = async (tagId: string) => {
    const action = await deleteTagUseCase(tagId)
      .then(() => {
        const index = tags.value.findIndex((tag) => tag.id === tagId)
        tags.value.splice(index, 1)
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  // NOTES
  const addElementList = (elementId: string, list: TodoList) => {
    const index = elements.value.findIndex((element) => element.id === elementId)
    if (index !== -1) {
      if (!elements.value[index]!.lists) {
        elements.value[index]!.lists = []
      }
      elements.value[index]!.lists.push(list)
    }
  }

  const createList = async (payload: ICreateTodoListPayload) => {
    const action = await createListUseCase(payload)
      .then((response) => {
        addElementList(payload.elementId, response.data)
        return response
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  const updateList = async (listId: string, payload: IUpdateTodoListPayload) => {
    const action = await updateListUseCase(listId, payload)
      .then((response) => {
        const index = elements.value.findIndex((element) => element.id === listId)
        elements.value[index]?.lists?.forEach((list) => {
          if (list.id === listId) {
            list.content = payload.content || list.content
          }
        })
        return response
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  const deleteList = async (elementId: string, listId: string) => {
    const action = await deleteListUseCase(listId)
      .then(() => {
        const elementIndex = elements.value.findIndex((element) => element.id === elementId)
        if (elementIndex !== -1 && elements.value[elementIndex]?.lists) {
          const listIndex = elements.value[elementIndex].lists.findIndex((list) => list.id === listId)
          if (listIndex !== -1) {
            elements.value[elementIndex].lists.splice(listIndex, 1)
          }
        }
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  // TASKS
  const addTaskToElementList = (elementId: string, listId: string, task: Task) => {
    const elementIndex = elements.value.findIndex((element) => element.id === elementId)
    if (elementIndex !== -1 && elements.value[elementIndex]?.lists) {
      const listIndex = elements.value[elementIndex].lists.findIndex((list) => list.id === listId)
      if (listIndex !== -1) {
        elements.value[elementIndex]?.lists[listIndex]?.tasks?.push(task)
      }
    }
  }

  const removeTaskFromElementList = (elementId: string, listId: string, taskId: string) => {
    const elementIndex = elements.value.findIndex((element) => element.id === elementId)
    if (elementIndex !== -1 && elements.value[elementIndex]?.lists) {
      const listIndex = elements.value[elementIndex].lists.findIndex((list) => list.id === listId)
      if (listIndex !== -1) {
        elements.value[elementIndex]?.lists[listIndex]?.tasks?.forEach((task) => {
          if (task.id === taskId) {
            elements.value[elementIndex]?.lists[listIndex]?.tasks?.splice(elements.value[elementIndex]?.lists[listIndex]?.tasks?.indexOf(task), 1)
          }
        })
      }
    }
  }

  const createTask = async (elementId: string, payload: ICreateTaskPayload) => {
    const action = await createTaskUseCase(payload)
      .then((response) => {
        addTaskToElementList(elementId, payload.listId, response.data)
        return response
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  const updateTask = async (elementId: string, listId: string, taskId: string, payload: IUpdateTaskPayload) => {
    const action = await updateTaskUseCase(taskId, payload)
      .then((response) => {
        const elementIndex = elements.value.findIndex((element) => element.id === elementId)
        if (elementIndex !== -1 && elements.value[elementIndex]?.lists) {
          const listIndex = elements.value[elementIndex].lists.findIndex((list) => list.id === listId)
          if (listIndex !== -1) {
            elements.value[elementIndex]?.lists[listIndex]?.tasks?.forEach((task) => {
              if (task.id === taskId) {
                task.description = payload.description
                task.completed = payload.completed
              }
            })
          }
        }
        return response
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  const deleteTask = async (elementId: string, listId: string, taskId: string) => {
    const action = await deleteTaskUseCase(taskId)
      .then(() => {
        removeTaskFromElementList(elementId, listId, taskId)
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  return {
    // ELEMENTS
    elements,
    addElement,
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
})
