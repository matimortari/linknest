<template>
  <Dialog :is-open="isOpen" title="Add Social Icon" @update:is-open="emit('close')">
    <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
      <span class="text-sm font-medium">Select Icon</span>

      <div class="scroll-area grid max-h-48 grid-cols-3 gap-1 overflow-y-auto pr-2 md:grid-cols-5">
        <button
          v-for="[label, iconName] in Object.entries(SOCIAL_ICONS)" :key="label"
          type="button" aria-label="Select Social Icon"
          class="hover:bg-muted active:bg-accent flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border p-2 transition-all"
          :class="{ 'bg-accent': form.platform === label }" @click="selectIcon(label, iconName)"
        >
          <icon :name="iconName" size="25" />
          <span class="truncate text-xs">{{ label }}</span>
        </button>
      </div>

      <div class="navigation-group">
        <label for="url" class="w-12 text-sm font-medium">URL</label>
        <input
          id="url" v-model="form.url"
          type="url" class="flex-1"
          placeholder="https://example.com"
        >
      </div>

      <footer class="flex flex-row items-center justify-between">
        <button class="btn-primary w-32" type="submit" aria-label="Save Link">
          Save
        </button>

        <p v-if="iconStore.error" class="text-warning">
          {{ iconStore.error }}
        </p>
      </footer>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { SOCIAL_ICONS } from "#shared/config/social-icons"
import { iconSchema } from "#shared/schemas/schemas"

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: "close"): void
  (e: "save", payload: IconType): void
}>()

const iconStore = useIconStore()

const form = ref<IconType>({
  platform: "",
  logo: "",
  url: "",
})

function selectIcon(label: string, iconName: string) {
  form.value.platform = label
  form.value.logo = iconName
  iconStore.error = null
}

function handleSubmit() {
  iconStore.error = null

  try {
    const result = iconSchema.safeParse(form.value)
    if (!result.success) {
      return
    }
    emit("save", { ...form.value })
    emit("close")
  }
  catch (error: any) {
    console.error("Failed to save social icon:", error)
    iconStore.error = error?.message
  }
}

watch(() => props.isOpen, (open) => {
  if (open) {
    form.value = { platform: "", logo: "", url: "" }
    iconStore.error = null
  }
}, { immediate: true })
</script>
