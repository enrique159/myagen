<template>
  <div class="h-screen flex justify-center items-center px-4">
    <div class="fixed top-0 w-full h-fit px-6 py-4 flex justify-between">
      <img v-if="isDark" src="@/assets/logo_full_dark.svg" alt="Logo" class="w-30" />
      <img v-else src="@/assets/logo_full_light.svg" alt="Logo" class="w-30" />
      <ToggleTheme />
    </div>

    <div
      class="card rounded-3xl md:bg-base-200 w-full max-w-lg animate__animated animate__fadeInDown md:p-6"
    >
      <div class="card-body">
        <h2 class="card-title text-2xl">Crea tu cuenta 🚀</h2>
        <p class="text-sm text-base-content/50 mb-4">
          Registrate para poder disfrutar de myagen.
        </p>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- NAME -->
          <fieldset class="form-control">
            <label class="input w-full rounded-full">
              <IconUser class="text-gray-500" />
              <input
                v-model.trim="formData.name"
                type="text"
                class="grow"
                placeholder="Nombre"
              />
            </label>
            <input-errors :errors="v$.name.$errors" />
          </fieldset>

          <!-- LAST NAME -->
          <fieldset class="form-control">
            <label class="input w-full rounded-full">
              <IconUser class="text-gray-500" />
              <input
                v-model.trim="formData.lastName"
                type="text"
                class="grow"
                placeholder="Apellido"
              />
            </label>
            <input-errors :errors="v$.lastName.$errors" />
          </fieldset>

          <!-- EMAIL -->
          <fieldset class="form-control">
            <label class="input w-full rounded-full">
              <IconMail class="text-gray-500" />
              <input
                v-model.trim="formData.email"
                type="email"
                class="grow"
                placeholder="Correo electrónico"
                autocomplete="off"
              />
            </label>
            <input-errors :errors="v$.email.$errors" />
          </fieldset>

          <!-- PASSWORD -->
          <fieldset class="form-control">
            <label class="input w-full relative rounded-full">
              <IconLock class="text-gray-500" />
              <input
                v-model.trim="formData.password"
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
            <input-errors :errors="v$.password.$errors" />
            
            <!-- PASSWORD STRENGTH PROGRESS BAR -->
            <div class="mt-2 px-2 text-xs space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-base-content/70">Seguridad de contraseña:</span>
                <span :class="passwordStrengthTextClass">{{ passwordStrengthText }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  class="h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                  :class="passwordStrengthBarClass"
                  :style="{ width: `${passwordStrength}%` }"
                ></div>
              </div>
              <div class="text-xs text-base-content/50">
                <span>Incluye: mayúsculas, minúsculas, números y caracteres especiales (!@#$%^&*)</span>
              </div>
            </div>
          </fieldset>

          <!-- CONFIRM PASSWORD -->
          <fieldset class="form-control">
            <label class="input w-full relative rounded-full">
              <IconLock class="text-gray-500" />
              <input
                v-model.trim="formData.confirmPassword"
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
            <input-errors :errors="v$.confirmPassword.$errors" />
          </fieldset>

          <div class="form-control">
            <button
              type="submit"
              class="btn bg-secondary text-white hover:bg-secondary/80 w-full shadow-none rounded-full"
              :disabled="isLoading"
            >
              <span
                v-if="isLoading"
                class="loading loading-spinner loading-sm"
              ></span>
              Crear una cuenta
            </button>
          </div>

          <div class="flex justify-center">
            <router-link
              to="/auth/signin"
              class="text-sm text-secondary hover:underline"
            >
              Iniciar sesión
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IconUser,
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
} from '@tabler/icons-vue'
import { helpers, required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import InputErrors from '@/components/InputErrors.vue'
import { reactive, ref, computed } from 'vue'
import notify from '@/utils/notifications'
import { samePassword } from '@/utils/validators'
import { useUser } from '@/composables/useUser'
import { useRouter } from 'vue-router'
import type { Response } from '@/app/network/domain/interfaces'
import type { ISignInResponse } from '@/app/auth/domain/auth'
import type { ICreateUserPayload } from '@/app/modules/users/domain/user'
import ToggleTheme from '@/components/ToggleTheme.vue'
import { useTheme } from '@/composables/useTheme'
import { handleFetchErrors } from '@/utils/handleFetchErrors'

const { isDark } = useTheme()
const router = useRouter()

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)

// Computed properties for password strength
const hasUppercase = computed(() => /[A-Z]/.test(formData.password))
const hasLowercase = computed(() => /[a-z]/.test(formData.password))
const hasNumber = computed(() => /[0-9]/.test(formData.password))
const hasSpecialChar = computed(() => /[!@#$%^&*]/.test(formData.password))

// Calculate password strength percentage (0-100)
const passwordStrength = computed(() => {
  let strength = 0
  
  // Base points for length
  if (formData.password.length > 0) {
    strength += Math.min(30, formData.password.length * 3)
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

const formData = reactive({
  name: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const rules = {
  name: {
    required: helpers.withMessage('El nombre es requerido', required),
  },
  lastName: {
    required: helpers.withMessage('El apellido es requerido', required),
  },
  email: {
    required: helpers.withMessage(
      'El correo electrónico es requerido',
      required,
    ),
    email: helpers.withMessage('El correo electrónico es invalido', email),
  },
  password: {
    required: helpers.withMessage('La contraseña es requerida', required),
    // strongPassword: helpers.withMessage(
    //   'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
    //   strongPassword,
    // ),
  },
  confirmPassword: {
    required: helpers.withMessage(
      'La confirmación de contraseña es requerida',
      required,
    ),
    sameAsPassword: helpers.withMessage(
      'Las contraseñas no coinciden',
      (value: string) => samePassword(formData.password, value),
    ),
  },
}

const v$ = useVuelidate(rules, formData)

const { signUp, setUser } = useUser()
const handleSubmit = async () => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid)
    return notify.warning('Por favor, completa todos los campos.')

  const createUserPayload: ICreateUserPayload = {
    name: formData.name,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password,
  }

  isLoading.value = true
  await signUp(createUserPayload)
    .then((response: Response<ISignInResponse>) => {
      setUser(response.data)
      router.push({ name: 'Home' })
    })
    .catch((error) => handleFetchErrors(error))
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<style lang="scss" scoped></style>
