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
import type { Tag } from '@/app/modules/tags/domain/tag'

export const useElementStore = defineStore('element', () => {
  const elements = ref<Element[]>([])

  // Mutations
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

  const addTag = (elementId: string, tag: Tag) => {
    elements.value = elements.value.map((element) => {
      if (element.id === elementId) {
        const tagExists = element.tags.some(
          (existingTag) => existingTag.id === tag.id,
        )
        if (tagExists) return element
        element.tags.push(tag)
      }
      return element
    })
  }

  const removeTag = (elementId: string, tagId: string) => {
    elements.value = elements.value.map((element) => {
      if (element.id === elementId) {
        element.tags = element.tags.filter((tag) => tag.id !== tagId)
      }
      return element
    })
  }

  // Actions API
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

  const addTags = async (elementId: string, tagIds: string[]) => {
    const action = await addTagsUseCase(elementId, tagIds)
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  const removeTags = async (elementId: string, tagIds: string[]) => {
    const action = await removeTagsUseCase(elementId, tagIds)
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error(error)
      })
    return action
  }

  return {
    elements,
    addElement,
    removeElement,
    addTag,
    removeTag,
    createElement,
    updateElement,
    getElements,
    deleteElement,
    addTags,
    removeTags,
  }
})
