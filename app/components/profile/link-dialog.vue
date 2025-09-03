<template>
  <Dialog :is-open="isOpen" :title="props.selectedLink ? 'Edit Link' : 'Add Link'" @update:is-open="emit('close')">
    <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
      <div class="navigation-group">
        <label for="title" class="w-12 text-sm font-medium">Title</label>
        <input
          id="title" v-model="form.title"
          type="text" placeholder="Enter link title"
          class="flex-1"
        >
      </div>

      <div class="navigation-group">
        <label for="url" class="w-12 text-sm font-medium">URL</label>
        <input
          id="url" v-model="form.url"
          type="url" placeholder="https://example.com"
          class="flex-1"
        >
      </div>

      <footer class="flex flex-row items-center justify-between">
        <p class="text-warning">
          {{ linkStore.error || '' }}
        </p>

        <button class="btn-primary" type="submit" aria-label="Save Link">
          {{ props.selectedLink ? 'Update Link' : 'Add Link' }}
        </button>
      </footer>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { linkSchema } from "#shared/config/schemas"

const props = defineProps<{
  isOpen: boolean
  selectedLink?: LinkType | null
}>()

const emit = defineEmits<{
  (e: "close"): void
  (e: "save", payload: LinkType): void
}>()

const linkStore = useLinkStore()

const form = ref<LinkType>({
  title: "",
  url: "",
})

function handleSubmit() {
  linkStore.error = null

  try {
    const result = linkSchema.safeParse(form.value)
    if (!result.success) {
      return
    }

    emit("save", { ...form.value })
    emit("close")
  }
  catch (error: any) {
    console.error("Failed to save link:", error)
    linkStore.error = error.message
  }
}

watch(() => props.isOpen, (open) => {
  if (open) {
    form.value = props.selectedLink
      ? { ...props.selectedLink }
      : { title: "", url: "" }
    linkStore.error = null
  }
}, { immediate: true })
</script>
