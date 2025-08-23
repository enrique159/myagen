import type { Tag } from '@/app/modules/tags/domain/tag'
import { useElementStore } from '@/stores/elementStore'
import { storeToRefs } from 'pinia'

export const useElement = () => {
  const elementStore = useElementStore()
  const { elements } = storeToRefs(elementStore)

  function addElement() {
    return elementStore.addElement()
  }

  function removeElement(elementId: string) {
    return elementStore.removeElement(elementId)
  }

  function addTag(elementId: string, tag: Tag) {
    return elementStore.addTag(elementId, tag)
  }

  function removeTag(elementId: string, tagId: string) {
    return elementStore.removeTag(elementId, tagId)
  }

  return {
    elements,
    addElement,
    removeElement,
    addTag,
    removeTag,
  }
}
