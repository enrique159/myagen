<template>
  <dialog ref="changeLogModal" class="modal">
    <div class="modal-box w-full max-w-[90%] h-[90%]">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">Registro de cambios</h3>
      <p class="py-4">Press ESC key or click on ✕ button to close</p>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const changeLogModal = ref<HTMLDialogElement | null>(null)

const openModal = () => {
  changeLogModal.value?.showModal()
}

defineExpose({
  openModal,
})
</script>
