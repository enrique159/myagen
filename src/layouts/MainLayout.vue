<template>
  <router-view />

  <bottom-navbar-menu v-if="!isDesktop" />
</template>

<script setup lang="ts">
import BottomNavbarMenu from '@/components/BottomNavbarMenu.vue';
import { useBreakpoints } from '@/composables/useBreakpoints';

const { isDesktop } = useBreakpoints()
</script>