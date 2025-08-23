<template>
  <div class="mx-auto w-full max-w-xl px-6">
    <div class="w-full flex justify-between items-center">
      <!-- PREVIOUS DAY  -->
      <button class="btn btn-circle btn-ghost text-base-content/40">
        <IconChevronLeft />
      </button>
      <div>
        <p class="text-base-content font-semibold text-center mt-4">
          {{ `${showToday ? 'Hoy, ' : ''}${formatDate(dateCalendar)}` }}
        </p>
        <p class="text-base-content/60 text-center text-sm mb-4">
          {{
            elements.length
              ? `${elements.length} elementos`
              : 'No hay elementos'
          }}
        </p>
      </div>
      <!-- NEXT DAY -->
      <button class="btn btn-circle btn-ghost text-base-content/40">
        <IconChevronRight />
      </button>
    </div>

    <div class="flex flex-col gap-4">
      <div
        v-for="element in sortedElements"
        :key="element.id"
        class="card bg-base-100 rounded-3xl"
      >
        <div class="card-body p-4">
          <div class="flex items-center gap-2">
            <input
              name="title"
              type="text"
              v-model="element.title"
              @input="() => handleTitleChange(element)"
              class="input input-ghost focus:outline-none w-full p-1 h-8 text-lg font-bold placeholder:text-base-300"
              placeholder="Escribe el titulo"
            />
            <div class="dropdown dropdown-end">
              <div
                tabindex="0"
                role="button"
                class="btn btn-xs btn-circle btn-ghost text-base-content"
              >
                <IconDots />
              </div>
              <ul
                tabindex="0"
                class="dropdown-content menu bg-base-100 rounded-xl z-1 w-52 p-2 shadow-xl"
              >
                <li>
                  <a> <IconArchive size="16" /> Archivar </a>
                </li>
                <li @click="fetchDeleteElement(element.id)">
                  <a class="text-red-400"> <IconTrash size="16" /> Eliminar </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <div
              v-for="tag in element.tags"
              :key="tag.id"
              class="text-sm px-2 py-1 rounded-full flex items-center gap-1"
              :style="{ backgroundColor: tag.color + '4D', color: tag.color }"
            >
              #{{ tag.name }}
              <button
                class="btn btn-xs btn-circle w-4 h-4 border-none tag-button shadow-none"
                :style="{
                  color: tag.color,
                  '--hover-bg-color': tag.color + '80',
                }"
                @click="removeTagFromElement(element.id, tag.id)"
              >
                <IconX :size="12" />
              </button>
            </div>
            <div class="dropdown">
              <div
                tabindex="0"
                role="button"
                class="btn btn-xs btn-circle btn-ghost text-base-300"
              >
                <IconPlus :size="16" />
              </div>
              <ul
                tabindex="0"
                class="dropdown-content menu bg-base-100 border border-base-200 rounded-xl z-1 w-60 p-2 shadow-lg"
              >
                <input
                  type="text"
                  placeholder="Buscar"
                  class="input input-sm bg-base-200 border-none focus:outline-none w-full mb-2"
                />
                <li
                  v-for="tag in tags"
                  :key="tag.id"
                  @click="addTagToElement(element.id, tag)"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="w-2 h-2 rounded-full"
                      :style="{ backgroundColor: tag.color }"
                    />
                    <a class="text-base-content/60">{{ tag.name }}</a>
                  </div>
                </li>
                <button
                  class="btn btn-sm btn-ghost text-xs"
                  @click="showNewTagForm"
                >
                  <IconPlus size="16" /> Agregar tag
                </button>
              </ul>
            </div>
          </div>

          <!-- CONTENT  -->
          <section class="flex flex-col gap-4"></section>

          <section class="flex items-center gap-4 w-full pt-4">
            <button
              class="btn btn-ghost btn-sm text-info rounded-full hover:bg-base-200 hover:border-base-200"
            >
              <IconNote /> Agregar nota
            </button>
            <button
              class="btn btn-ghost btn-sm text-info rounded-full hover:bg-base-200 hover:border-base-200"
            >
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
          class="btn btn-circle bg-base-100 btn-xl border-none duration-50"
          @click="createNewElement"
        >
          <IconPlus />
        </button>
      </div>
    </div>
  </div>

  <!-- NEW TAG -->
  <basic-modal
    v-model="showNewTagModal"
    title="Nuevo tag"
  >
    <input
      v-model="newTag.name"
      type="text"
      placeholder="Nombre del tag"
      class="input input-bordered w-full mb-2"
    />
    <div class="dropdown w-full mb-2">
      <div
        tabindex="0"
        role="button"
        class="input input-bordered w-full flex items-center justify-between"
      >
        <div class="flex items-center gap-2">
          <div
            class="w-5 h-5 rounded-full"
            :style="{ backgroundColor: newTag.color }"
          ></div>
          <span>{{ getColorName(newTag.color) }}</span>
        </div>
        <IconChevronDown size="18" />
      </div>
      <div
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full mt-1"
      >
        <div class="grid grid-cols-8 gap-2 p-2">
          <div
            v-for="color in tagColors"
            :key="color.value"
            class="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-all duration-200 flex items-center justify-center"
            :style="{ backgroundColor: color.value }"
            @click="selectColor(color.value)"
          >
            <IconCheck v-if="newTag.color === color.value" class="text-white" size="18" />
          </div>
        </div>
      </div>
    </div>

    <button
      class="btn btn-primary w-full btn-soft mb-6"
      @click="submitNewTag"
    >
      <span>Guardar</span>
    </button>
  </basic-modal>
</template>

<script setup lang="ts">
import { useApp } from '@/composables/useApp'
import { useDate } from '@/composables/useDate'
import {
  IconArchive,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconDots,
  IconListCheck,
  IconNote,
  IconPlus,
  IconTrash,
  IconX,
} from '@tabler/icons-vue'
import { computed, ref, watch } from 'vue'
import type { Element } from '@/app/modules/elements/domain/element'
import { useElement } from '@/composables/useElement'
import { useProject } from '@/composables/useProject'
import { handleFetchErrors } from '@/utils/handleFetchErrors'
import { PROJECT_COLORS } from '@/constants/colors'

const { dateCalendar } = useApp()

const showToday = computed(() => {
  return isToday(dateCalendar.value)
})

const { formatDate, isToday, formatAssignedDate } = useDate()
const {
  elements,
  getElements,
  createElement,
  deleteElement,
  addTagToElement,
  removeTagFromElement,
  updateElement,
  tags,
  getTags,
  createTag,
} = useElement()

const sortedElements = computed(() => {
  return [...elements.value].sort((a, b) => {
    return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
  })
})

const { currentProject } = useProject()
watch(
  () => currentProject.value,
  () => {
    fetchElements()
  },
)

const isLoadingElements = ref(false)
const fetchElements = async () => {
  await getElements({
    projectId: currentProject.value?.id,
    assignedDate: formatAssignedDate(dateCalendar.value),
  })
    .catch((error) => {
      handleFetchErrors(error)
    })
    .finally(() => {
      isLoadingElements.value = false
    })
}
fetchElements()

const isLoadingTags = ref(false)
const fetchTags = async () => {
  await getTags()
    .catch((error) => {
      handleFetchErrors(error)
    })
    .finally(() => {
      isLoadingTags.value = false
    })
}
fetchTags()

// UPDATE TITLE ELEMENT
const titleUpdateTimeouts = ref<Record<string, number>>({})
const handleTitleChange = (element: Element) => {
  if (titleUpdateTimeouts.value[element.id]) {
    clearTimeout(titleUpdateTimeouts.value[element.id])
  }

  titleUpdateTimeouts.value[element.id] = setTimeout(() => {
    updateElement(element.id, { title: element.title }).catch((error) => {
      handleFetchErrors(error)
    })
    delete titleUpdateTimeouts.value[element.id]
  }, 2000) as unknown as number
}

// NEW ELEMENT
const isLoadingCreateElement = ref(false)
const createNewElement = async () => {
  const payload = {
    assignedDate: dateCalendar.value,
    projectId: currentProject.value?.id,
  }
  isLoadingCreateElement.value = true
  await createElement(payload)
    .catch((error) => {
      handleFetchErrors(error)
    })
    .finally(() => {
      isLoadingCreateElement.value = false
    })
}

// DELETE ELEMENT
const isLoadingDeleteElement = ref(false)
const fetchDeleteElement = async (elementId: string) => {
  isLoadingDeleteElement.value = true
  await deleteElement(elementId)
    .catch((error) => {
      handleFetchErrors(error)
    })
    .finally(() => {
      isLoadingDeleteElement.value = false
    })
}

// NEW TAG
const showNewTagModal = ref(false)
const newTag = ref({
  name: '',
  color: PROJECT_COLORS.CIAN as string,
})

const showNewTagForm = () => {
  showNewTagModal.value = true
}

const tagColors = ref([
  { name: 'Azul', value: PROJECT_COLORS.AZUL },
  { name: 'Rojo', value: PROJECT_COLORS.ROJO },
  { name: 'Verde', value: PROJECT_COLORS.VERDE },
  { name: 'Amarillo', value: PROJECT_COLORS.AMARILLO },
  { name: 'Púrpura', value: PROJECT_COLORS.PURPURA },
  { name: 'Rosa', value: PROJECT_COLORS.ROSA },
  { name: 'Indigo', value: PROJECT_COLORS.INDIGO },
  { name: 'Esmeralda', value: PROJECT_COLORS.ESMERALDA },
  { name: 'Naranja', value: PROJECT_COLORS.NARANJA },
  { name: 'Cian', value: PROJECT_COLORS.CIAN },
  { name: 'Lima', value: PROJECT_COLORS.LIMA },
  { name: 'Gris', value: PROJECT_COLORS.GRIS },
])

const selectColor = (color: string) => {
  newTag.value.color = color
}

const getColorName = (colorValue: string): string => {
  const color = tagColors.value.find((c) => c.value === colorValue)
  return color ? color.name : 'Color personalizado'
}

const submitNewTag = async () => {
  const payload = {
    name: newTag.value.name,
    color: newTag.value.color,
    projectId: currentProject.value?.id,
  }
  await createTag(payload)
    .catch((error) => {
      handleFetchErrors(error)
    })
    .finally(() => {
      showNewTagModal.value = false
    })
}
</script>

<style scoped>
.tag-button {
  background-color: transparent;
}
.tag-button:hover {
  background-color: var(--hover-bg-color) !important;
}
</style>
