<template>
  <div class="flex flex-col gap-2">
    <header class="my-2 flex flex-col gap-2">
      <h3>My Links</h3>
      <p class="text-caption text-muted-foreground">
        Manage your links.
      </p>
    </header>

    <Spinner v-if="isLoading" />

    <div v-else-if="!links.length" class="text-lead my-2 text-center text-muted-foreground">
      <p>No links yet. Add your first link!</p>
    </div>

    <ul v-else class="grid grid-cols-1 gap-2 md:grid-cols-2">
      <li v-for="link in links" :key="link.id" class="card">
        <div class="flex flex-col gap-2">
          <div class="flex flex-row items-center justify-between">
            <a :href="link.url" target="_blank" rel="noopener" class="max-w-[80%]">
              <h5 class="truncate">{{ link.title }}</h5>
            </a>

            <div class="flex flex-row items-center gap-1">
              <button @click="handleUpdateLink(link)">
                <Icon name="mdi:circle-edit-outline" size="20" class="scale-md text-accent" />
              </button>
              <button @click="handleDeleteLink(link.id!)">
                <Icon name="mdi:remove-circle-outline" size="20" class="scale-md text-danger-foreground" />
              </button>
            </div>
          </div>

          <p class="text-label text-muted-foreground truncate">
            {{ link.url }}
          </p>
        </div>
      </li>
    </ul>

    <div class="input-group justify-end">
      <button class="btn-primary" @click="openDialog">
        <Icon name="mdi:link-add" size="25" />
        <span>Add Link</span>
      </button>
    </div>
  </div>

  <ProfileLinkDialog :is-open="isDialogOpen" :selected-link="selectedLink" @close="closeDialog" @save="handleSaveLink" />
</template>

<script setup lang="ts">
import { useLinkStore } from "~/lib/stores/link-store"

const { links, isLoading } = storeToRefs(useLinkStore())

const isDialogOpen = ref(false)
const selectedLink = ref<LinkType | null>(null)

function openDialog() {
  selectedLink.value = null
  isDialogOpen.value = true
}
function closeDialog() {
  isDialogOpen.value = false
  selectedLink.value = null
}

onMounted(async () => {
  if (!links.value.length)
    await useLinkStore().getLinks()
})

async function handleDeleteLink(id: string) {
  try {
    await useLinkStore().deleteLink(id)
  }
  catch (error) {
    console.error("Failed to delete link:", error)
  }
}

function handleUpdateLink(link: LinkType) {
  try {
    selectedLink.value = link
    isDialogOpen.value = true
  }
  catch (error) {
    console.error("Failed to update link:", error)
  }
}

async function handleSaveLink(link: LinkType) {
  try {
    const existingLink = links.value.find(l => l.id === link.id)
    if (existingLink) {
      await useLinkStore().updateLink(link)
    }
    else {
      await useLinkStore().createLink(link)
    }
    closeDialog()
  }
  catch (error) {
    console.error("Failed to save link:", error)
  }
}
</script>
