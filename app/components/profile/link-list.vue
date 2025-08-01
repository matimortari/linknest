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
                <Icon name="mdi:circle-edit-outline" size="20" class="hover:scale-md text-accent transition-all" />
              </button>
              <button @click="handleDeleteLink(link.id!)">
                <Icon name="mdi:remove-circle-outline" size="20" class="hover:scale-md text-danger-foreground transition-all" />
              </button>
            </div>
          </div>

          <p class="text-label truncate text-muted-foreground">
            {{ link.url }}
          </p>
        </div>
      </li>
    </ul>

    <div class="navigation-group justify-end">
      <button class="btn-primary" @click="isDialogOpen = true">
        <Icon name="mdi:link-add" size="25" />
        <span>Add Link</span>
      </button>
    </div>
  </div>

  <ProfileLinkDialog :is-open="isDialogOpen" :selected-link="selectedLink" @close="isDialogOpen = false" @save="handleSaveLink" />
</template>

<script setup lang="ts">
import { useLinkStore } from "~~/app/lib/stores/link-store"

const linkStore = useLinkStore()

const { links, isLoading } = storeToRefs(linkStore)
const isDialogOpen = ref(false)
const selectedLink = ref<LinkType | null>(null)

function handleUpdateLink(link: LinkType) {
  try {
    selectedLink.value = link
    isDialogOpen.value = true
  }
  catch (error: any) {
    console.error("Failed to update link:", error)
  }
}

async function handleDeleteLink(id: string) {
  try {
    await linkStore.deleteLink(id)
  }
  catch (error: any) {
    console.error("Failed to delete link:", error)
  }
}

async function handleSaveLink(link: LinkType) {
  try {
    const existingLink = links.value.find(l => l.id === link.id)
    if (existingLink) {
      await linkStore.updateLink(link)
    }
    else {
      await linkStore.createLink(link)
    }
    closeDialog()
  }
  catch (error: any) {
    console.error("Failed to save link:", error)
  }
}

onMounted(async () => {
  if (!links.value.length)
    await linkStore.getLinks()
})
</script>
