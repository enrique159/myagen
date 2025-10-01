<template>
  <basic-modal
    v-model="showModal"
    title="Editar tag"
    description="Llena los campos para editar tu tag"
  >
    <!-- NAME -->
    <fieldset class="form-control mb-4">
      <label class="input w-full rounded-full">
        <IconHash class="text-gray-500" />
        <input
          v-model.trim="name"
          class="grow"
          placeholder="Nombre"
          autocomplete="off"
        />
      </label>
    </fieldset>

    <!-- CONFIRM PASSWORD -->
    <div class="dropdown w-full mb-4">
      <div
        tabindex="0"
        role="button"
        class="input input-bordered w-full flex items-center justify-between rounded-full"
      >
        <div class="flex items-center gap-2">
          <div
            class="w-5 h-5 rounded-full"
            :style="{ backgroundColor: color }"
          ></div>
          <span>{{ getColorName(color) }}</span>
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
            class="w-8 h-8 aspect-square rounded-full cursor-pointer hover:scale-110 transition-all duration-200 flex items-center justify-center"
            :style="{ backgroundColor: color.value }"
            @click="selectColor(color.value)"
          >
            <IconCheck
              v-if="currentColor?.value === color.value"
              class="text-white"
              size="18"
            />
          </div>
        </div>
      </div>
    </div>

    <button
      class="btn bg-primary text-white hover:bg-primary/80 w-full shadow-none rounded-full mb-2"
      :disabled="isLoading"
      @click="handleSubmit"
    >
      <LoadingSpinner v-if="isLoading" size="sm" />
      <span>Guardar</span>
    </button>

    <button
      class="btn btn-soft btn-error w-full shadow-none rounded-full mb-6"
      @click="handleDelete"
    >
      Eliminar
    </button>
  </basic-modal>
</template>

<script setup lang="ts">
import notify from '@/utils/notifications'
import { IconHash, IconChevronDown, IconCheck } from '@tabler/icons-vue'
import { computed, ref, watch } from 'vue'
import { handleFetchErrors } from '@/utils/handleFetchErrors'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import type { IUpdateTagPayload } from '@/app/modules/tags/domain/tag'
import { PROJECT_COLORS } from '@/constants/colors'
import type { Tag } from '@/app/modules/tags/domain/tag'
import { useElement } from '@/composables/useElement'

const props = defineProps<{
  modelValue: boolean
  tag: Tag | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const showModal = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const name = ref(props.tag?.name || '')
const color = ref(props.tag?.color || '')

const currentColor = computed(() => {
  return tagColors.value.find((c) => c.value === color.value)
})

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

const selectColor = (newColor: string) => {
  color.value = newColor
}

const getColorName = (colorValue: string): string => {
  const color = tagColors.value.find((c) => c.value === colorValue)
  return color ? color.name : 'Color personalizado'
}

watch(showModal, (value) => {
  if (value) {
    name.value = props.tag?.name || ''
    color.value = props.tag?.color || ''
  }
  else {
    clearModal()
  }
})

const { updateTag, deleteTag } = useElement()
const isLoading = ref(false)
const handleSubmit = async () => {
  if (name.value.length === 0 || color.value.length === 0) {
    notify.error('Por favor, completa todos los campos.')
    return
  }

  isLoading.value = true
  const payload: IUpdateTagPayload = {
    name: name.value,
    color: color.value,
  }

  await updateTag(props.tag?.id || '', payload)
    .then(() => {
      notify.success('Tag editado correctamente')
      showModal.value = false
    })
    .catch((error) => {
      handleFetchErrors(error)
    })
    .finally(() => {
      isLoading.value = false
    })
}

const handleDelete = async () => {
  isLoading.value = true
  await deleteTag(props.tag?.id || '')
    .then(() => {
      notify.success('Tag eliminado correctamente')
      showModal.value = false
    })
    .catch((error) => {
      handleFetchErrors(error)
    })
    .finally(() => {
      isLoading.value = false
    })
}

const clearModal = () => {
  name.value = ''
  color.value = ''
}
</script>
