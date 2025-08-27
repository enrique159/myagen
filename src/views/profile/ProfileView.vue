<template>
  <div class="container mx-auto p-6">
    <header class="flex items-center gap-2 w-full">
      <router-link to="/" class="flex items-center gap-2 text-lg">
        <IconArrowLeft stroke="2" />
        Volver
      </router-link>
    </header>
  </div>
</template>

<script setup lang="ts">
import { IconArrowLeft } from '@tabler/icons-vue';
</script>