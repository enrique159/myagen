<template>
  <basic-modal
    v-model="showModal"
    title="Editar usuario"
    description="Llena los campos para editar tu usuario"
  >
    <!-- NAME -->
    <fieldset class="form-control mb-4">
      <label class="input w-full rounded-full">
        <IconLock class="text-gray-500" />
        <input
          v-model.trim="name"
          class="grow"
          placeholder="Nombre"
          autocomplete="off"
        />
      </label>
    </fieldset>

    <!-- CONFIRM PASSWORD -->
    <fieldset class="form-control mb-6">
      <label class="input w-full relative rounded-full">
        <IconLock class="text-gray-500" />
        <input
          v-model.trim="lastName"
          class="grow"
          placeholder="Apellido"
          autocomplete="off"
        />
      </label>
    </fieldset>

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
import { IconLock } from '@tabler/icons-vue'
import { computed, ref, watch } from 'vue'
import type { IUpdateUserPayload } from '@/app/modules/users/domain/user'
import { handleFetchErrors } from '@/utils/handleFetchErrors'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useUser } from '@/composables/useUser'

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
const lastName = ref('')

watch(showModal, (value) => {
  if (!value) {
    clearModal()
  }
})

const { updateUser } = useUser()
const isLoading = ref(false)
const handleSubmit = async () => {
  if (name.value.length === 0 || lastName.value.length === 0) {
    notify.error('Por favor, completa todos los campos.')
    return
  }

  isLoading.value = true
  const payload: IUpdateUserPayload = {
    name: name.value,
    lastName: lastName.value,
  }

  await updateUser(payload)
    .then(() => {
      notify.success('Contraseña actualizada correctamente')
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
  lastName.value = ''
}
</script>
