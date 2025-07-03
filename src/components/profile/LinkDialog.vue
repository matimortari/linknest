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

    <div v-if="hasErrors" class="flex flex-col gap-2 text-center max-w-sm">
      <span v-for="(msg, key) in formErrors" :key="key" class="text-caption text-danger-foreground">{{ msg }}</span>
    </div>

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
import { linkSchema } from "~/lib/schemas"

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

watch(() => props.isOpen, (open) => {
  if (open) {
    form.value = props.selectedLink
      ? { ...props.selectedLink }
      : { title: "", url: "" }
    formErrors.value = {}
  }
}, { immediate: true })

function handleSave() {
  formErrors.value = {}
  const result = linkSchema.safeParse(form.value)
  if (!result.success) {
    for (const err of result.error.errors) {
      formErrors.value[err.path[0]] = err.message
    }
    return
  }

  emit("save", { ...form.value })
  emit("close")
}
</script>
