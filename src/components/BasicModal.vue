<template>
  <div
    v-if="showModal"
    class="absolute top-0 left-0 w-full h-full bg-base-content/20 overflow-hidden z-50"
    @click.self="showModal = false"
  >
    <div
      class="relative min-w-[460px] w-full md:w-fit h-full md:h-fit min-h-[200px] bg-base-100 md:rounded-2xl top-0 left-0 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 custom-animate max-md:overflow-auto"
    >
      <div class="flex justify-between items-start gap-2 p-4">
        <div class="flex flex-col pl-2">
          <h2 class="text-lg font-semibold text-base-content">
            {{ title }}
          </h2>
          <p v-if="description" class="text-sm text-base-content/50">
            {{ description }}
          </p>
        </div>
        <button
          class="btn btn-xs btn-circle gap-2 text-base-content/60"
          @click="showModal = false"
        >
          <IconX size="16" />
        </button>
      </div>

      <div class="px-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'
import { onKeyStroke } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Modal',
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
})

const emits = defineEmits(['update:modelValue'])

const showModal = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emits('update:modelValue', value),
})

onKeyStroke('Escape', () => (showModal.value = false))
</script>

<style scoped>
.custom-animate {
  animation: fadeInUp 0.3s ease-in-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
