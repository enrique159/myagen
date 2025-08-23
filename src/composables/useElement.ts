import type { ICreateElementPayload, IGetElementsParams, IUpdateElementPayload } from '@/app/modules/elements/domain/element'
import type { Tag } from '@/app/modules/tags/domain/tag'
import { useElementStore } from '@/stores/elementStore'
import { storeToRefs } from 'pinia'

export const useElement = () => {
  const elementStore = useElementStore()
  const { elements } = storeToRefs(elementStore)

  // Mutations
  function removeElement(elementId: string) {
    return elementStore.removeElement(elementId)
  }

  function addTag(elementId: string, tag: Tag) {
    return elementStore.addTag(elementId, tag)
  }

  function removeTag(elementId: string, tagId: string) {
    return elementStore.removeTag(elementId, tagId)
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

  return {
    elements,
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
}
