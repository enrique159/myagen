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
import type { ICreateTagPayload, IUpdateTagPayload, Tag } from '@/app/modules/tags/domain/tag'

export const useElementStore = defineStore('element', () => {
  const elements = ref<Element[]>([])
  const tags = ref<Tag[]>([])

  // Mutations
  const addElement = (element: Element) => {
    elements.value.push(element)
  }
  const setTags = (newTags: Tag[]) => {
    tags.value = newTags
  }

  const setElements = (newElements: Element[]) => {
    elements.value = newElements
  }

  const removeElement = (elementId: string) => {
    elements.value = elements.value.filter(
      (element) => element.id !== elementId,
    )
  }

  const addTagToElement = (elementId: string, tag: Tag) => {
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

  const removeTagFromElement = (elementId: string, tagId: string) => {
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

  // TAGS
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

  return {
    elements,
    addElement,
    removeElement,
    addTagToElement,
    removeTagFromElement,
    createElement,
    updateElement,
    getElements,
    deleteElement,
    addTags,
    removeTags,
    tags,
    createTag,
    getTags,
    updateTag,
    deleteTag,
  }
})
