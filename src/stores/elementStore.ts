import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElementStatus, type Element } from '@/app/modules/elements/domain/element.d'
import type { Tag } from '@/app/modules/tags/domain/tag'
import { generateId } from '@/utils/generateId'

export const useElementStore = defineStore('element', () => {
  const elements = ref<Element[]>([
    {
      id: generateId(),
      title: 'Elemento 1',
      date: new Date(),
      status: ElementStatus.active,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])

  const addElement = () => {
    elements.value.push({
      id: generateId(),
      title: '',
      date: new Date(),
      status: ElementStatus.active,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })
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

  return {
    elements,
    addElement,
    removeElement,
    addTag,
    removeTag,
  }
})
