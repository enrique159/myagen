<template>
  <label class="toggle">
    <input
      type="checkbox"
      class="theme-controller"
      @change="toggleTheme"
      :checked="isDark"
    />

    <IconSun />

    <IconMoon />
  </label>
</template>

<script setup lang="ts">
import IconSun from '@/assets/customs/IconSun.vue'
import IconMoon from '@/assets/customs/IconMoon.vue'
import { useTheme } from '@/composables/useTheme'

// Usar el composable useTheme
const { isDark, toggleTheme } = useTheme()
</script>
