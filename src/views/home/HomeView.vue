<template>
  <div class="home-container">
    <!-- SIDE MENU  -->
    <side-menu />
    <!-- ELEMENTS CONTENT -->
    <elements-content />
    <!-- RIGHT MENU -->
    <div class="p-6 space-y-6 relative h-full">
      <div class="flex items-center gap-2 bg-base-100 px-4 py-4 rounded-2xl">
        he
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideMenu from './components/SideMenu.vue';
import ElementsContent from './components/ElementsContent.vue';
</script>

<style scoped>
.home-container {
  display: grid;
  grid-template-columns: 340px 1fr 340px;
  height: 100dvh;
}
</style>