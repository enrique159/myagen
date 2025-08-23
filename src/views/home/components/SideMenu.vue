<template>
  <div class="p-6 space-y-6 relative h-full">
    <div class="flex items-center px-4">
      <img
        v-if="isDark"
        src="@/assets/logo_full_dark.svg"
        alt="Logo"
        class="w-30 cursor-pointer hover:translate-y-1 transition-all duration-100 ease-in-out"
      />
      <img
        v-else
        src="@/assets/logo_full_light.svg"
        alt="Logo"
        class="w-30 cursor-pointer hover:translate-y-1 transition-all duration-100 ease-in-out"
      />
    </div>

    <label
      for="search-input"
      class="flex items-center gap-2 bg-base-100 px-4 py-4 rounded-2xl"
    >
      <IconSearch class="text-base-300" />
      <input
        type="text"
        id="search-input"
        placeholder="Buscar"
        class="text-base-content placeholder:text-base-300 w-full outline-none"
      />
    </label>

    <DatePicker
      v-model="date"
      inline
      auto-apply
      :dark="isDark"
      :enable-time-picker="false"
      locale="es-MX"
    />

    <div class="flex justify-between items-center gap-2 bg-base-100 px-4 py-3 rounded-2xl">
      <div>
        <p class="text-base-content/60 text-sm">Proyecto</p>
        <p class="text-base-content text-lg font-semibold">Todos</p>
      </div>
      <button class="btn btn-circle btn-ghost">
        <IconSwipe />
      </button>
    </div>
    
    <span class="absolute bottom-4 left-6 text-xs text-base-300">
      creado por <a href="https://github.com/enrique159" target="_blank" class="text-primary hover:underline">enrique159</a>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useApp } from '@/composables/useApp'
import { useTheme } from '@/composables/useTheme'
import { IconSearch, IconSwipe } from '@tabler/icons-vue'
import { computed } from 'vue'
const { isDark } = useTheme()

const { dateCalendar, setDateCalendar } = useApp()

const date = computed({
  get: () => dateCalendar.value,
  set: (val: Date) => setDateCalendar(val),
})
</script>

<style lang="scss" scoped></style>
