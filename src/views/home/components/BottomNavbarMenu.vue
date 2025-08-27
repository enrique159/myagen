<template>
  <div class="fixed bottom-0 left-0 right-0 w-full h-16 bg-base-100">
    <div class="grid grid-cols-5 gap-2 place-items-center h-full">
      <button v-for="option in menuOptions" :key="option.label" class="btn btn-circle btn-ghost">
        <component :is="option.icon" size="24" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconCalendar, IconListCheck, IconNote } from '@tabler/icons-vue'

const menuOptions = [
  {
    icon: IconCalendar,
    label: 'Calendario',
    action: () => {
      console.log('Calendario')
    }
  },
  {
    icon: IconListCheck,
    label: 'Lista',
    action: () => {
      console.log('Lista')
    }
  },
  {
    icon: IconNote,
    label: 'Nota',
    action: () => {
      console.log('Nota')
    }
  },
]
</script>