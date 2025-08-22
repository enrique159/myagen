<template>
  <div class="flex flex-col">
    <span
      v-for="error in errors"
      :key="error.$uid"
      class="text-xs text-brand-pink"
    >
      {{ error.$message }}
    </span>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any
defineProps<{ errors: any }>()
</script>

<style lang="scss" scoped></style>
