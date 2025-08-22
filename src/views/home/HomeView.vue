<template>
  <div class="home-container">
    <!-- SIDE MENU  -->
    <side-menu />
    <!-- ELEMENTS CONTENT -->
    <elements-content />
    <!-- RIGHT MENU -->
    <div>
      <toggle-theme />
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