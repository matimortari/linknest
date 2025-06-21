<template>
  <Dialog :is-open="isOpen" title="Add or Edit Link" @update:is-open="emit('close')">
    <form class="flex flex-col gap-4 p-4">
      <div class="form-group">
        <label for="title" class="text-sm font-medium w-12">Title</label>
        <input id="title" v-model="form.title" type="text" class="input flex-1" placeholder="Enter link title" required>
      </div>

      <div class="form-group">
        <label for="url" class="text-sm font-medium w-12">URL</label>
        <input id="url" v-model="form.url" type="url" class="input flex-1" placeholder="https://example.com" required>
      </div>
    </form>

    <template #footer>
      <button class="btn-danger" @click="emit('close')">
        Cancel
      </button>
      <button class="btn-success" @click="handleSave">
        Save
      </button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { createLink, updateLink } from "~/lib/services/links"

const props = defineProps<{
  isOpen: boolean
  selectedLink?: LinkType | null
}>()

const emit = defineEmits<{
  (e: "close"): void
  (e: "save", payload: LinkType): void
}>()

const form = ref<LinkType>({
  title: "",
  url: ""
})

watch(() => props.isOpen, (open) => {
  if (open) {
    if (props.selectedLink) {
      form.value = { ...props.selectedLink }
    }
    else {
      form.value = { title: "", url: "" }
    }
  }
}, { immediate: true })

async function handleSave() {
  try {
    let newLink: LinkType
    if (form.value.id) {
      newLink = await updateLink(form.value)
    }
    else {
      newLink = await createLink(form.value)
    }
    emit("save", newLink)
    emit("close")
  }
  catch (err) {
    console.error("Failed to save link:", err)
  }
}
</script>
