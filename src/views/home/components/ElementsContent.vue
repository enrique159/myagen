<template>
  <div class="mx-auto w-full max-w-xl px-6">
    <p class="text-base-content font-semibold text-center mt-4">
      {{ `${showToday ? 'Hoy, ' : ''}${formatDate(dateCalendar)}` }}
    </p>
    <p class="text-base-content/60 text-center text-sm mb-4">
      {{
        elements.length ? `${elements.length} elementos` : 'No hay elementos'
      }}
    </p>

    <div class="flex flex-col gap-4">
      <div
        v-for="element in elements"
        :key="element.id"
        class="card bg-base-100 rounded-3xl"
      >
        <div class="card-body p-4">
          <input
            name="title"
            type="text"
            v-model="element.title"
            class="input input-ghost focus:outline-none w-full p-1 h-8 text-lg font-bold placeholder:text-base-300"
            placeholder="Escribe el titulo"
          />
          <div class="flex flex-wrap gap-2">
            <div 
              v-for="tag in element.tags"
              :key="tag.id"
              class="text-sm px-2 py-1 rounded-full"
              :class="`bg-[${tag.color}]/30 text-[${tag.color}]`"
            >
              {{ tag.name }}
            </div>
          </div>

          <section class="flex items-center gap-4 w-full pt-4">
            <button class="btn btn-ghost btn-sm text-info rounded-full hover:bg-base-200 hover:border-base-200">
              <IconNote /> Agregar nota
            </button>
            <button class="btn btn-ghost btn-sm text-info rounded-full hover:bg-base-200 hover:border-base-200">
              <IconListCheck /> Agregar lista
            </button>
          </section>
        </div>
      </div>

      <div
        class="tooltip tooltip-bottom mx-auto rounded-full"
        data-tip="Agregar elemento"
      >
        <button
          class="btn btn-circle bg-base-100 btn-xl border-none"
          @click="addElement"
        >
          <IconPlus />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApp } from '@/composables/useApp'
import { useDate } from '@/composables/useDate'
import { IconListCheck, IconNote, IconPlus } from '@tabler/icons-vue'
import { computed, ref } from 'vue'
import { v4 as uuid } from 'uuid'
import {
  type Element,
  ElementStatus,
} from '@/app/modules/elements/domain/element.d'

const { dateCalendar } = useApp()

const showToday = computed(() => {
  return isToday(dateCalendar.value)
})

const { formatDate, isToday } = useDate()

// Elements
const elements = ref<Element[]>([
  {
    id: uuid(),
    title: 'Elemento 1',
    date: new Date(),
    status: ElementStatus.active,
    tags: [
      {
        id: uuid(),
        name: 'Tag 1',
        color: '#D51C1C',
      },
      {
        id: uuid(),
        name: 'Tag 2',
        color: '#232323',
      },
    ],
  },
])

const addElement = () => {
  elements.value.push({
    id: uuid(),
    title: ``,
    date: new Date(),
    status: ElementStatus.active,
    tags: [],
  })
}
</script>
