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
            <a :href="link.url" target="_blank" rel="noopener">
              <h5 class="truncate">{{ link.title }}</h5>
            </a>

            <div class="flex flex-row items-center gap-1">
              <button @click="editLink(link)">
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

  <ProfileLinkDialog :is-open="isDialogOpen" :selected-link="selectedLink" @close="closeDialog" @save="handleSave" />
</template>

<script setup lang="ts">
import { deleteLink, getLinks } from "~/lib/services/links"

const links = ref<LinkType[]>([])
const isLoading = ref(true)
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
  try {
    links.value = await getLinks()
  }
  catch (error) {
    console.error("Failed to load links", error)
  }
  finally {
    isLoading.value = false
  }
})

async function handleDeleteLink(id: string) {
  try {
    await deleteLink(id)
    links.value = links.value.filter(link => link.id !== id)
  }
  catch (error) {
    console.error("Failed to delete link", error)
  }
}
function editLink(link: LinkType) {
  selectedLink.value = link
  isDialogOpen.value = true
}

function handleSave(savedLink: LinkType) {
  const index = links.value.findIndex(link => link.id === savedLink.id)
  if (index > -1) {
    links.value[index] = savedLink
  }
  else {
    links.value.push(savedLink)
  }
  closeDialog()
}
</script>
