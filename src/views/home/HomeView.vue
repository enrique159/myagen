<template>
  <div class="home-container">
    <!-- SIDE MENU  -->
    <side-menu />
    <!-- ELEMENTS CONTENT -->
    <elements-content />
    <!-- RIGHT MENU -->
    <right-side-menu />
  </div>
</template>

<script setup lang="ts">
import SideMenu from './components/SideMenu.vue';
import ElementsContent from './components/ElementsContent.vue';
import RightSideMenu from './components/RightSideMenu.vue';
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