<template>
  <div class="section-container flex flex-col gap-2">
    <header class="my-2 flex flex-col gap-1">
      <h3>
        My Links
      </h3>
      <p class="text-caption">
        Manage your links.
      </p>
    </header>

    <Spinner v-if="isLoading" />
    <p v-else-if="!links.length" class="text-lead m-8 text-center">
      Your links help visitors discover more about you. Add your first link!
    </p>

    <ul v-else class="grid grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-3">
      <li v-for="link in links" :key="link.id" class="card">
        <div class="flex flex-col gap-2">
          <div class="flex flex-row items-center justify-between">
            <nuxt-link :href="link.url" class="max-w-[80%] truncate font-semibold">
              {{ link.title }}
            </nuxt-link>

            <div class="flex flex-row items-center gap-1">
              <button aria-label="Update Link" class="flex items-center" @click="handleUpdateLink(link)">
                <icon name="mdi:circle-edit-outline" size="25" class="hover:scale-md text-primary transition-all" />
              </button>
              <button aria-label="Delete Link" class="flex items-center" @click="handleDeleteLink(link.id!)">
                <icon name="mdi:remove-circle-outline" size="25" class="hover:scale-md text-danger-foreground transition-all" />
              </button>
            </div>
          </div>

          <p class="text-caption truncate">
            {{ link.url }}
          </p>
        </div>
      </li>
    </ul>

    <button class="btn-primary self-end" aria-label="Add Link" @click="isDialogOpen = true">
      <icon name="mdi:link-add" size="25" />
      <span>Add Link</span>
    </button>
  </div>

  <ProfileLinkDialog :is-open="isDialogOpen" :selected-link="selectedLink" @close="closeDialog" @save="handleSaveLink" />
</template>

<script setup lang="ts">
const linkStore = useLinksStore()

const { links, loading } = storeToRefs(linkStore)
const isDialogOpen = ref(false)
const selectedLink = ref<Link | null>(null)

const isLoading = computed(() => loading.value.getLinks)

function closeDialog() {
  isDialogOpen.value = false
  selectedLink.value = null
}

function handleUpdateLink(link: Link) {
  linkStore.errors.updateLink = null

  try {
    selectedLink.value = link
    isDialogOpen.value = true
  }
  catch (error: any) {
    console.error("Failed to update link:", error)
    linkStore.errors.updateLink = error.message
  }
}

async function handleDeleteLink(id: string) {
  linkStore.errors.deleteLink = null
  try {
    await linkStore.deleteLink(id)
  }
  catch (error: any) {
    console.error("Failed to delete link:", error)
    linkStore.errors.deleteLink = error.message
  }
}

async function handleSaveLink(payload: { link: Link, isUpdate: boolean }) {
  const { link, isUpdate } = payload

  try {
    if (isUpdate) {
      console.log("Link updated successfully:", link.title)
    }
    else {
      console.log("Link created successfully:", link.title)
    }
    if (links.value.length === 0 || isUpdate) {
      await linkStore.getLinks()
    }
  }
  catch (error: any) {
    console.error("Failed to handle save link:", error)
  }
  finally {
    closeDialog()
  }
}
</script>
