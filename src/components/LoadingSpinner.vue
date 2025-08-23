<template>
  <span :class="`loading loading-spinner loading-${size}`"></span>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'sm',
  },
})
</script>
