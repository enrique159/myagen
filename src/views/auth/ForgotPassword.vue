<template>
  <div class="h-screen flex justify-center items-center px-4">
    <div class="fixed top-0 w-full h-fit px-6 py-4 flex justify-between">
      <router-link to="/auth/signin">
        <img
          v-if="isDark"
          src="@/assets/logo_full_dark.svg"
          alt="Logo"
          class="w-30"
        />
        <img v-else src="@/assets/logo_full_light.svg" alt="Logo" class="w-30" />
      </router-link>
      <ToggleTheme />
    </div>
    <div
      class="card rounded-3xl md:bg-base-200 w-full max-w-lg animate__animated animate__fadeInDown md:p-6"
    >
      <div class="card-body">
        <h2 class="card-title text-2xl">Recupera tu contraseña 📨</h2>
        <p class="text-sm text-base-content/50 mb-4">
          Ingresa tu correo electrónico para validar tu cuenta, te enviaremos un
          correo con un enlace para restablecer tu contraseña.
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

          <div class="form-control">
            <button
              type="submit"
              class="btn bg-primary text-white hover:bg-primary/80 w-full shadow-none rounded-full"
              :disabled="isLoading || !isReadyToSend"
            >
              <span v-if="isLoading">Cargando...</span>
              <span v-else>Validar correo electrónico</span>
            </button>
          </div>

          <div v-if="remainingCooldown > 0" class="flex flex-col justify-center items-center text-center opacity-50">
            <p class="text-primary">Volver a intentar en:</p>
            <p class="text-sm text-primary">
              {{ remainingCooldown }} segundos
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { helpers, required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { IconMail } from '@tabler/icons-vue'
import { useTheme } from '@/composables/useTheme'
import { useUser } from '@/composables/useUser'
import notify from '@/utils/notifications'
import { handleFetchErrors } from '@/utils/handleFetchErrors'

const { isDark } = useTheme()
const { sendRecoveryPasswordEmail } = useUser()

const formData = reactive({
  email: '',
})

const rules = {
  email: {
    required: helpers.withMessage(
      'El correo electrónico es requerido',
      required,
    ),
    email: helpers.withMessage('El correo electrónico es invalido', email),
  },
}

const v$ = useVuelidate(rules, formData)

const isLoading = ref(false)
const remainingCooldown = ref(0)
const isReadyToSend = computed(() => remainingCooldown.value === 0)
const handleSubmit = async () => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid)
    return notify.warning('Por favor, completa todos los campos.')

  isLoading.value = true
  await sendRecoveryPasswordEmail({ email: formData.email })
    .then(() => {
      notify.success('Correo electrónico enviado correctamente')
      setRemainingCooldown(15)
    })
    .catch((error) => {
      handleFetchErrors(error)
    })
    .finally(() => {
      isLoading.value = false
    })
}

const setRemainingCooldown = (seconds: number) => {
  remainingCooldown.value = seconds
  const interval = setInterval(() => {
    remainingCooldown.value--
    if (remainingCooldown.value === 0) {
      clearInterval(interval)
    }
  }, 1000)
}
</script>

<style lang="scss" scoped></style>
