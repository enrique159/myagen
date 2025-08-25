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
        <h2 class="card-title text-2xl">Bienvenido 👋</h2>
        <p class="text-sm text-base-content/50 mb-4">
          Ingresa tu correo electrónico y contraseña para iniciar sesión.
        </p>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- EMAIL -->
          <fieldset class="form-control">
            <label class="input w-full rounded-full">
              <IconMail class="text-gray-500" />
              <input
                v-model.trim="formData.email"
                type="email"
                class="grow"
                placeholder="Correo electrónico"
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
          </fieldset>

          <div class="flex justify-end">
            <router-link
              to="/auth/forgot-password"
              class="text-sm text-primary hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </router-link>
          </div>

          <div class="form-control">
            <button
              type="submit"
              class="btn bg-primary text-white hover:bg-primary/80 w-full shadow-none rounded-full"
              :disabled="isLoading"
            >
              <span
                v-if="isLoading"
                class="loading loading-spinner loading-sm"
              ></span>
              Iniciar Sesión
            </button>
          </div>

          <div class="flex justify-center">
            <router-link
              to="/auth/signup"
              class="text-sm text-primary hover:underline"
            >
              Crea una cuenta
            </router-link>
          </div>
        </form>
      </div>
    </div>

    <div class="fixed bottom-0 w-full h-fit px-6 py-4 flex justify-center">
      creado con 💜 por <span class="mx-1"> </span> <a href="https://github.com/enrique159" target="_blank" class="text-primary hover:underline">enrique159</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { helpers, required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import InputErrors from '@/components/InputErrors.vue'
import { IconMail, IconLock, IconEye, IconEyeOff } from '@tabler/icons-vue'
import { reactive } from 'vue'
import notify from '@/utils/notifications'
import { ref } from 'vue'
import { useTitle } from '@vueuse/core'
import type { ISignInPayload } from '@/app/auth/domain/auth'
import { useUser } from '@/composables/useUser'
import { useRouter } from 'vue-router'
import { handleFetchErrors } from '@/utils/handleFetchErrors'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const { isDark } = useTheme()

useTitle('Inicia sesión | mitienda')

const showPassword = ref(false)
const formData = reactive({
  email: '',
  password: '',
})

const rules = {
  email: {
    required: helpers.withMessage(
      'El correo electrónico es requerido',
      required,
    ),
    email: helpers.withMessage('El correo electrónico es invalido', email),
  },
  password: {
    required: helpers.withMessage('La contraseña es requerida', required),
  },
}

const v$ = useVuelidate(rules, formData)

const { signIn } = useUser()
const isLoading = ref(false)
const handleSubmit = async () => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid)
    return notify.warning('Por favor, completa todos los campos.')

  const credentials: ISignInPayload = {
    email: formData.email,
    password: formData.password,
  }

  isLoading.value = true
  await signIn(credentials)
    .then(() => {
      router.push({ name: 'Home' })
    })
    .catch((error) => handleFetchErrors(error))
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<style lang="scss" scoped></style>
