import type { ICreateElementPayload, IGetElementsParams, IUpdateElementPayload } from '@/app/modules/elements/domain/element'
import type { ICreateTagPayload, IUpdateTagPayload, Tag } from '@/app/modules/tags/domain/tag'
import { useElementStore } from '@/stores/elementStore'
import { storeToRefs } from 'pinia'

export const useElement = () => {
  const elementStore = useElementStore()
  const { elements, tags } = storeToRefs(elementStore)

  // Mutations
  function removeElement(elementId: string) {
    return elementStore.removeElement(elementId)
  }

  function addTagToElement(elementId: string, tag: Tag) {
    return elementStore.addTagToElement(elementId, tag)
  }

  function removeTagFromElement(elementId: string, tagId: string) {
    return elementStore.removeTagFromElement(elementId, tagId)
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

  function addTags(elementId: string, tagIds: string[]) {
    return elementStore.addTags(elementId, tagIds)
  }

  function removeTags(elementId: string, tagIds: string[]) {
    return elementStore.removeTags(elementId, tagIds)
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

  return {
    elements,
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
}
