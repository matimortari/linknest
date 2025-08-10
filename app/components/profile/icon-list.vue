<template>
  <div class="section-container flex flex-col gap-2">
    <header class="my-2 flex flex-col gap-2">
      <h3>
        My Social Icons
      </h3>
      <p class="text-caption text-muted-foreground">
        Manage your social icons.
      </p>
    </header>

    <Spinner v-if="isLoading" />
    <div v-else-if="!icons.length" class="text-lead my-2 text-center text-muted-foreground">
      <p>No social icons yet. Add your first social icon!</p>
    </div>

    <ul v-else class="flex flex-row gap-2">
      <li v-for="icon in icons" :key="icon.id" class="card relative flex size-20 items-center justify-center">
        <a :href="icon.url" target="_blank" rel="noopener">
          <icon :name="icon.icon" :size="30" />
        </a>

        <button class="absolute bottom-0 right-0 p-1" aria-label="Delete Social Icon" @click="handleDeleteIcon(icon.id!)">
          <icon name="mdi:remove-circle-outline" size="20" class="hover:scale-md text-danger-foreground transition-all" />
        </button>
      </li>
    </ul>

    <div class="navigation-group justify-end">
      <button class="btn-primary" aria-label="Add Social Icon" @click="isDialogOpen = true">
        <icon name="mdi:favorite-add" size="25" />
        <span>Add Social Icon</span>
      </button>
    </div>
  </div>

  <ProfileIconDialog :is-open="isDialogOpen" @close="isDialogOpen = false" @save="handleCreateIcon" />
</template>

<script setup lang="ts">
import { useIconStore } from "~/lib/stores/icon-store"

const iconStore = useIconStore()

const { icons, isLoading } = storeToRefs(iconStore)
const isDialogOpen = ref(false)

async function handleCreateIcon(icon: IconType) {
  try {
    await iconStore.createIcon(icon)
    isDialogOpen.value = false
  }
  catch (error: any) {
    console.error("Failed to save icon:", error)
  }
}

async function handleDeleteIcon(id: string) {
  try {
    await iconStore.deleteIcon(id)
  }
  catch (error: any) {
    console.error("Failed to delete icon:", error)
  }
}

onMounted(async () => {
  if (!icons.value.length)
    await iconStore.getIcons()
})
</script>
