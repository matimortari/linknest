<template>
  <Dialog :is-open="isOpen" :title="dialogTitle" @update:is-open="emit('close')">
    <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
      <div class="navigation-group">
        <label for="title" class="w-12 text-sm font-medium">Title</label>
        <input
          id="title" v-model="form.title"
          type="text" placeholder="Enter link title"
          required
        >
      </div>

      <div class="navigation-group">
        <label for="url" class="w-12 text-sm font-medium">URL</label>
        <input
          id="url" v-model="form.url"
          type="url" placeholder="https://example.com"
          required
        >
      </div>

      <div v-if="hasErrors" class="flex max-w-sm flex-col gap-2 text-center">
        <span v-for="(msg, key) in formErrors" :key="key" class="text-caption text-danger-foreground">
          {{ msg }}
        </span>
      </div>

      <footer class="flex justify-end">
        <button class="btn-primary w-32" type="submit" :disabled="hasErrors">
          Save
        </button>
      </footer>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { linkSchema } from "~~/app/lib/schemas"

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
  url: "",
})

const formErrors = ref<{ [key: string]: string }>({})
const hasErrors = computed(() => Object.keys(formErrors.value).length > 0)

const dialogTitle = computed(() =>
  props.selectedLink ? "Edit Link" : "Add Link",
)

watch(() => props.isOpen, (open) => {
  if (open) {
    form.value = props.selectedLink
      ? { ...props.selectedLink }
      : { title: "", url: "" }
    formErrors.value = {}
  }
}, { immediate: true })

function handleSubmit() {
  formErrors.value = {}

  const result = linkSchema.safeParse(form.value)
  if (!result.success) {
    const firstError = result.error.errors[0]
    formErrors.value[firstError.path[0]] = firstError.message

    return
  }

  emit("save", { ...form.value })
  emit("close")
}
</script>
