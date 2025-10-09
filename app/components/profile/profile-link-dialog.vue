<template>
  <Dialog :is-open="isOpen" :title="isUpdateMode ? 'Edit Link' : 'Add Link'" @update:is-open="emit('close')">
    <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
      <div class="navigation-group">
        <label for="title" class="w-12 text-sm font-medium">Title</label>
        <input
          id="title" v-model="form.title"
          type="text" placeholder="Enter link title"
          class="flex-1"
          :disabled="isLoading"
        >
      </div>

      <div class="navigation-group">
        <label for="url" class="w-12 text-sm font-medium">URL</label>
        <input
          id="url" v-model="form.url"
          type="url" placeholder="https://example.com"
          class="flex-1"
          :disabled="isLoading"
        >
      </div>

      <footer class="flex flex-row items-center justify-between">
        <p class="text-warning">
          {{ errorMessage }}
        </p>

        <div class="flex gap-2">
          <button
            type="button"
            class="btn-secondary"
            aria-label="Cancel"
            :disabled="isLoading"
            @click="emit('close')"
          >
            Cancel
          </button>
          <button
            class="btn-primary"
            type="submit"
            aria-label="Save Link"
            :disabled="isLoading || !isFormValid"
          >
            <Spinner v-if="isLoading" size="sm" />
            <span v-else>{{ isUpdateMode ? 'Update Link' : 'Add Link' }}</span>
          </button>
        </div>
      </footer>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import type { CreateUserLinkInput, UpdateUserLinkInput } from "~~/shared/schemas/link"
import { createUserLinkSchema, updateUserLinkSchema } from "~~/shared/schemas/link"

const props = defineProps<{
  isOpen: boolean
  selectedLink?: Link | null
}>()

const emit = defineEmits<{
  (e: "close"): void
  (e: "save", payload: { link: Link, isUpdate: boolean }): void
}>()

const linkStore = useLinksStore()

const form = ref<Link>({
  title: "",
  url: "",
})

const isLoading = ref(false)

const isUpdateMode = computed(() => {
  return !!(props.selectedLink?.id)
})

const isFormValid = computed(() => {
  return form.value.title.trim() !== "" && form.value.url.trim() !== ""
})

const errorMessage = computed(() => {
  return isUpdateMode.value
    ? linkStore.errors.updateLink
    : linkStore.errors.createLink
})

const hasFormChanged = computed(() => {
  if (!isUpdateMode.value)
    return true

  const original = props.selectedLink
  if (!original)
    return true

  return original.title !== form.value.title || original.url !== form.value.url
})

async function handleSubmit() {
  if (!isFormValid.value) {
    const errorKey = isUpdateMode.value ? "updateLink" : "createLink"
    linkStore.errors[errorKey] = "Title and URL are required."
    return
  }

  if (isUpdateMode.value && !hasFormChanged.value) {
    emit("close")
    return
  }

  isLoading.value = true

  // Clear previous errors
  linkStore.errors.createLink = null
  linkStore.errors.updateLink = null

  try {
    if (isUpdateMode.value) {
      await handleUpdateLink()
    }
    else {
      await handleCreateLink()
    }
  }
  catch (error: any) {
    console.error("Failed to save link:", error)
    const errorKey = isUpdateMode.value ? "updateLink" : "createLink"
    linkStore.errors[errorKey] = error.message || "Failed to save link"
  }
  finally {
    isLoading.value = false
  }
}

async function handleCreateLink() {
  const validation = createUserLinkSchema.safeParse(form.value)
  if (!validation.success) {
    linkStore.errors.createLink = "Please check your input and try again."
    return
  }

  const createData: CreateUserLinkInput = validation.data
  await linkStore.createLink(createData)

  emit("save", { link: form.value, isUpdate: false })
  emit("close")
}

async function handleUpdateLink() {
  if (!props.selectedLink?.id) {
    linkStore.errors.updateLink = "Link ID is required for updates."
    return
  }

  // Prepare update data - only include changed fields
  const updateData: UpdateUserLinkInput = {}

  if (form.value.title !== props.selectedLink.title) {
    updateData.title = form.value.title
  }

  if (form.value.url !== props.selectedLink.url) {
    updateData.url = form.value.url
  }

  // If no changes, just close
  if (Object.keys(updateData).length === 0) {
    emit("close")
    return
  }

  const validation = updateUserLinkSchema.safeParse(updateData)
  if (!validation.success) {
    linkStore.errors.updateLink = "Please check your input and try again."
    return
  }

  await linkStore.updateLink(props.selectedLink.id, validation.data)

  emit("save", { link: { ...props.selectedLink, ...updateData }, isUpdate: true })
  emit("close")
}

function resetForm() {
  form.value = props.selectedLink
    ? { ...props.selectedLink }
    : { title: "", url: "" }

  // Clear errors when opening dialog
  linkStore.errors.createLink = null
  linkStore.errors.updateLink = null
  isLoading.value = false
}

watch(() => props.isOpen, (open) => {
  if (open) {
    resetForm()
  }
}, { immediate: true })

// Watch for selectedLink changes to update form
watch(() => props.selectedLink, () => {
  if (props.isOpen) {
    resetForm()
  }
}, { deep: true })
</script>
