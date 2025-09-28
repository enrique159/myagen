<template>
  <div class="container mx-auto p-6">
    <header class="flex items-center justify-between gap-2 w-full">
      <router-link to="/" class="flex items-center gap-2">
        <IconArrowLeft stroke="2" />
        {{ isDesktop ? 'Volver' : '' }}
      </router-link>
    </header>

    <section class="container mx-auto max-w-md space-y-8 mt-6">
      <div>
        <h1 class="text-2xl font-semibold">Tags</h1>
        <p class="textsm text-base-content/80">
          Toca algún tag para editarlo o eliminarlo.
        </p>
      </div>
      <div v-if="tags.length === 0" class="flex items-center justify-center">
        <p class="text-base-content/60">No hay tags</p>
      </div>
      <div v-else class="grid grid-cols-1 gap-2">
        <div
          v-if="tags?.length"
          v-for="tag in tags"
          :key="tag.id"
          class="flex items-center gap-2 bg-base-100 rounded-2xl px-4 py-2 cursor-pointer hover:opacity-80 transition-all duration-300"
          @click="openEditTagModal(tag)"
        >
          <div
            class="w-2 h-2 rounded-full"
            :style="{ backgroundColor: tag.color }"
          />
          <span class="text-base-content/60">{{ tag.name }}</span>
        </div>
        <div v-else class="h-80 grid place-items-center">
          <span>No hay tags aún</span>
        </div>

        <button class="btn btn-ghost btn-primary rounded-full" @click="showCreateTagModal = true">
          <IconPlus />
          <span>Agregar tag</span>
        </button>
      </div>
    </section>
  </div>

  <!-- EDIT TAG -->
  <EditTagForm v-model="showEditTagModal" :tag="selectedTag" />

  <!-- CREATE TAG -->
  <CreateTagForm v-model="showCreateTagModal" />
</template>

<script setup lang="ts">
import EditTagForm from './components/EditTagForm.vue'
import CreateTagForm from './components/CreateTagForm.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'
import { IconArrowLeft, IconPlus } from '@tabler/icons-vue'
import { useElement } from '@/composables/useElement'
import { onMounted, ref } from 'vue'
import { handleFetchErrors } from '@/utils/handleFetchErrors'
import type Exception from '@/app/shared/error/Exception'
import type { Tag } from '@/app/modules/tags/domain/tag'

const { isDesktop } = useBreakpoints()
const { tags, getTags } = useElement()

const fetchTags = async () => {
  getTags().catch((error: Exception) => {
    handleFetchErrors(error)
  })
}

const showEditTagModal = ref(false)
const selectedTag = ref<Tag | null>(null)

const openEditTagModal = (tag: Tag) => {
  selectedTag.value = tag
  showEditTagModal.value = true
}

const showCreateTagModal = ref(false)

onMounted(() => {
  fetchTags()
})
</script>

<style lang="scss" scoped></style>
