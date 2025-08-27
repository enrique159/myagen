<template>
  <div class="home-container">
    <!-- SIDE MENU  -->
    <side-menu v-if="isDesktop" />
    <!-- ELEMENTS CONTENT -->
    <elements-content />
    <!-- RIGHT MENU -->
    <right-side-menu v-if="isDesktop" />
    <!-- BOTTOM MENU -->
    <bottom-navbar-menu v-if="!isDesktop" />
  </div>
</template>

<script setup lang="ts">
import SideMenu from './components/SideMenu.vue';
import ElementsContent from './components/ElementsContent.vue';
import RightSideMenu from './components/RightSideMenu.vue';
import BottomNavbarMenu from './components/BottomNavbarMenu.vue';
import { useWindowSize } from '@vueuse/core';
import { computed } from 'vue';

const { width } = useWindowSize()

const isDesktop = computed(() => width.value >= 1024)
</script>

<style scoped>
.home-container {
  display: grid;
  grid-template-columns: 340px 1fr 340px;
  height: 100dvh;
}

@media (max-width: 1024px) {
  .home-container {
    grid-template-columns: 1fr;
  }
}
</style>