<template>
  <router-view />

  <bottom-navbar-menu v-if="!isDesktop" />

  <drawer-projects />
</template>

<script setup lang="ts">
import BottomNavbarMenu from '@/components/BottomNavbarMenu.vue';
import DrawerProjects from '@/components/DrawerProjects.vue';
import { useBreakpoints } from '@/composables/useBreakpoints';

const { isDesktop } = useBreakpoints()
</script>