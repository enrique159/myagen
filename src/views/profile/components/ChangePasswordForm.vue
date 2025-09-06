<template>
  <basic-modal
    v-model="showModal"
    title="Nueva contraseña"
    description="Llena los campos para cambiar tu contraseña"
  >
    <!-- PASSWORD -->
    <fieldset class="form-control mb-4">
      <label class="input w-full relative rounded-full">
        <IconLock class="text-gray-500" />
        <input
          v-model.trim="newPassword"
          :type="showPassword ? 'text' : 'password'"
          class="grow"
          placeholder="Contraseña"
          autocomplete="off"
        />
        <button
          tabindex="-1"
          type="button"
          class="btn btn-ghost btn-circle btn-sm absolute right-2 text-content"
          @click="showPassword = !showPassword"
        >
          <IconEye v-if="showPassword" :size="18" />
          <IconEyeOff v-else :size="18" />
        </button>
      </label>

      <!-- PASSWORD STRENGTH PROGRESS BAR -->
      <div class="mt-2 px-2 text-xs space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-base-content/70">Seguridad de contraseña:</span>
          <span :class="passwordStrengthTextClass">{{
            passwordStrengthText
          }}</span>
        </div>
        <div class="w-full bg-base-200 rounded-full h-2.5">
          <div
            class="h-2.5 rounded-full transition-all duration-300 ease-in-out"
            :class="passwordStrengthBarClass"
            :style="{ width: `${passwordStrength}%` }"
          ></div>
        </div>
        <div class="text-xs text-base-content/50">
          <span
            >Incluye: mayúsculas, minúsculas, números y caracteres especiales
            (!@#$%^&*)</span
          >
        </div>
      </div>
    </fieldset>

    <!-- CONFIRM PASSWORD -->
    <fieldset class="form-control mb-6">
      <label class="input w-full relative rounded-full">
        <IconLock class="text-gray-500" />
        <input
          v-model.trim="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          class="grow"
          placeholder="Confirmar contraseña"
        />
        <button
          tabindex="-1"
          type="button"
          class="btn btn-ghost btn-circle btn-sm absolute right-2 text-content"
          @click="showConfirmPassword = !showConfirmPassword"
        >
          <IconEye v-if="showConfirmPassword" :size="18" />
          <IconEyeOff v-else :size="18" />
        </button>
      </label>
    </fieldset>

    <button
      class="btn bg-primary text-white hover:bg-primary/80 w-full shadow-none rounded-full mb-6"
      :disabled="isNewPasswordLoading"
      @click="handleSubmitNewPassword"
    >
      <LoadingSpinner v-if="isNewPasswordLoading" size="sm" />
      <span>Guardar</span>
    </button>
  </basic-modal>
</template>

<script setup lang="ts">
import notify from '@/utils/notifications'
import {
  IconEye,
  IconEyeOff,
  IconLock,
} from '@tabler/icons-vue'
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


const showPassword = ref(false)
const showConfirmPassword = ref(false)

watch(showModal, (value) => {
  if (!value) {
    clearNewPasswordModal()
  }
})

const newPassword = ref('')
const confirmPassword = ref('')

// Computed properties for password strength
const hasUppercase = computed(() => /[A-Z]/.test(newPassword.value))
const hasLowercase = computed(() => /[a-z]/.test(newPassword.value))
const hasNumber = computed(() => /[0-9]/.test(newPassword.value))
const hasSpecialChar = computed(() => /[!@#$%^&*]/.test(newPassword.value))

// Calculate password strength percentage (0-100)
const passwordStrength = computed(() => {
  let strength = 0
  
  // Base points for length
  if (newPassword.value.length > 0) {
    strength += Math.min(30, newPassword.value.length * 3)
  }
  
  // Additional points for complexity
  if (hasUppercase.value) strength += 15
  if (hasLowercase.value) strength += 15
  if (hasNumber.value) strength += 15
  if (hasSpecialChar.value) strength += 25
  
  return Math.min(100, strength)
})

// Text representation of password strength
const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength === 0) return 'Vacío'
  if (strength < 30) return 'Muy débil'
  if (strength < 50) return 'Débil'
  if (strength < 70) return 'Moderada'
  if (strength < 90) return 'Fuerte'
  return 'Muy fuerte'
})

// CSS class for the strength text
const passwordStrengthTextClass = computed(() => {
  const strength = passwordStrength.value
  if (strength === 0) return 'text-base-content/50'
  if (strength < 30) return 'text-error'
  if (strength < 50) return 'text-warning'
  if (strength < 70) return 'text-warning'
  if (strength < 90) return 'text-success'
  return 'text-success'
})

// CSS class for the progress bar
const passwordStrengthBarClass = computed(() => {
  const strength = passwordStrength.value
  if (strength === 0) return 'bg-base-content/20'
  if (strength < 30) return 'bg-error'
  if (strength < 50) return 'bg-warning'
  if (strength < 70) return 'bg-warning'
  if (strength < 90) return 'bg-success'
  return 'bg-success'
})

const { updateUser } = useUser()
const isNewPasswordLoading = ref(false)
const handleSubmitNewPassword = async () => {
  if (newPassword.value.length === 0 || confirmPassword.value.length === 0) {
    notify.error('Por favor, completa todos los campos.')
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    notify.error('Las contraseñas no coinciden')
    return
  }

  isNewPasswordLoading.value = true
  const payload: IUpdateUserPayload = {
    password: newPassword.value,
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
      isNewPasswordLoading.value = false
    })
}

const clearNewPasswordModal = () => {
  newPassword.value = ''
  confirmPassword.value = ''
  showPassword.value = false
  showConfirmPassword.value = false
}
</script>
