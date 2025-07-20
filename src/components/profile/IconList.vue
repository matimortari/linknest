<template>
  <div class="flex flex-col gap-2">
    <header class="my-2 flex flex-col gap-2">
      <h3>My Social Icons</h3>
      <p class="text-caption text-muted-foreground">
        Manage your social icons.
      </p>
    </header>

    <Spinner v-if="isLoading" />

    <div v-else-if="!icons.length" class="text-lead my-2 text-center text-muted-foreground">
      <p>No social icons yet. Add your first social icon!</p>
    </div>

    <ul v-else class="flex flex-row gap-2">
      <li v-for="icon in icons" :key="icon.id" class="card relative size-20 flex items-center justify-center">
        <a :href="icon.url" target="_blank" rel="noopener">
          <Icon :name="icon.icon" :size="30" />
        </a>

        <button class="absolute bottom-0 right-0 p-1" @click="handleDeleteIcon(icon.id!)">
          <Icon name="mdi:remove-circle-outline" size="20" class="hover:scale-md text-danger-foreground" />
        </button>
      </li>
    </ul>

    <div class="input-group justify-end">
      <button class="btn-primary" @click="openDialog">
        <Icon name="mdi:favorite-add" size="25" />
        <span>Add Social Icon</span>
      </button>
    </div>
  </div>

  <ProfileIconDialog :is-open="isDialogOpen" @close="closeDialog" @save="handleCreateIcon" />
</template>

<script setup lang="ts">
import { useIconStore } from "~/lib/stores/icon-store"

const iconStore = useIconStore()

const { icons, isLoading } = storeToRefs(iconStore)
const isDialogOpen = ref(false)

function openDialog() {
  isDialogOpen.value = true
}
function closeDialog() {
  isDialogOpen.value = false
}

onMounted(async () => {
  if (!icons.value.length)
    await iconStore.getIcons()
})

async function handleDeleteIcon(id: string) {
  try {
    await iconStore.deleteIcon(id)
  }
  catch (error: any) {
    console.error("Failed to delete icon:", error)
  }
}

async function handleCreateIcon(savedIcon: IconType) {
  try {
    await iconStore.createIcon(savedIcon)
    closeDialog()
  }
  catch (error: any) {
    console.error("Failed to save icon:", error)
  }
}
</script>
