<template>
  <Dialog :is-open="isOpen" title="Add Social Icon" @update:is-open="emit('close')">
    <form class="flex flex-col gap-4" @submit.prevent="handleSave">
      <label class="text-sm font-medium">Select Icon</label>
      <div class="grid max-h-48 grid-cols-3 gap-1 overflow-y-auto md:grid-cols-5 pr-2 scrollbar">
        <button
          v-for="[label, iconName] in iconEntries"
          :key="label"
          type="button"
          class="flex flex-col items-center justify-center gap-1 rounded-lg border p-2 hover:bg-muted active:bg-accent"
          :class="{ 'bg-accent': form.platform === label }"
          @click="selectIcon(label, iconName)"
        >
          <Icon :name="iconName" size="25" />
          <span class="text-xs truncate">{{ label }}</span>
        </button>
      </div>

      <div class="form-group">
        <label for="url" class="text-sm font-medium w-12">URL</label>
        <input
          id="url"
          v-model="form.url"
          type="url"
          class="input flex-1"
          placeholder="https://example.com"
          required
        >
      </div>

      <div v-if="hasErrors" class="flex flex-col gap-2 text-center max-w-sm">
        <span
          v-for="(msg, key) in formErrors"
          :key="key"
          class="text-caption text-danger-foreground"
        >
          {{ msg }}
        </span>
      </div>

      <footer class="flex justify-end">
        <button class="btn-primary w-32" type="submit" @click="handleSave">
          Save
        </button>
      </footer>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { SOCIAL_ICONS } from "~/lib/config/social-icons"
import { iconSchema } from "~/lib/schemas"

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: "close"): void
  (e: "save", payload: IconType): void
}>()

const form = ref<IconType>({
  platform: "",
  icon: "",
  url: "",
})

const iconEntries = computed(() => Object.entries(SOCIAL_ICONS))

const formErrors = ref<{ [key: string]: string }>({})
const hasErrors = computed(() => Object.keys(formErrors.value).length > 0)

function selectIcon(label: string, iconName: string) {
  form.value.platform = label
  form.value.icon = iconName
}

watch(() => props.isOpen, (open) => {
  if (open) {
    form.value = { platform: "", icon: "", url: "" }
    formErrors.value = {}
  }
})

function handleSave() {
  formErrors.value = {}

  const result = iconSchema.safeParse(form.value)
  if (!result.success) {
    const firstError = result.error.errors[0]
    formErrors.value[firstError.path[0]] = firstError.message

    return
  }

  emit("save", { ...form.value })
  emit("close")
}
</script>

<style scoped>
  .scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--border) var(--background);
}
</style>
