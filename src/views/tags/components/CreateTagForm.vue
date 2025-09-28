<template>
  <basic-modal
    v-model="showModal"
    title="Crear tag"
    description="Llena los campos para crear tu tag"
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
      class="btn bg-primary text-white hover:bg-primary/80 w-full shadow-none rounded-full mb-6"
      :disabled="isLoading"
      @click="handleSubmit"
    >
      <LoadingSpinner v-if="isLoading" size="sm" />
      <span>Guardar</span>
    </button>
  </basic-modal>
</template>

<script setup lang="ts">
import notify from '@/utils/notifications'
import type { ICreateTagPayload } from '@/app/modules/tags/domain/tag'
import { IconHash, IconChevronDown, IconCheck } from '@tabler/icons-vue'
import { computed, ref, watch } from 'vue'
import { handleFetchErrors } from '@/utils/handleFetchErrors'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { PROJECT_COLORS } from '@/constants/colors'
import { useElement } from '@/composables/useElement'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const showModal = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const name = ref('')
const color = ref<string>(PROJECT_COLORS.AZUL)

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
    name.value = ''
    color.value = PROJECT_COLORS.AZUL
  }
  else {
    clearModal()
  }
})

const { createTag } = useElement()
const isLoading = ref(false)
const handleSubmit = async () => {
  if (name.value.length === 0 || color.value.length === 0) {
    notify.error('Por favor, completa todos los campos.')
    return
  }

  isLoading.value = true
  const payload: ICreateTagPayload = {
    name: name.value,
    color: color.value,
  }

  await createTag(payload)
    .then(() => {
      notify.success('Tag creado correctamente')
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
