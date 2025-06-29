<template>
  <Dialog :is-open="isOpen" title="Add Social Icon" @update:is-open="emit('close')">
    <form class="flex flex-col gap-4 p-4">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Select Icon</label>

        <div class="grid max-h-48 grid-cols-3 gap-1 overflow-y-auto md:grid-cols-5 pr-2 preview-scrollbar">
          <button
            v-for="[label, iconName] in iconEntries" :key="label" type="button"
            class="flex flex-col items-center justify-center rounded-lg border p-2 hover:bg-muted active:bg-accent"
            :class="{ 'bg-accent': form.platform === label }" @click="selectIcon(label, iconName)"
          >
            <Icon :name="iconName" size="25" />
            <span class="text-xs truncate">{{ label }}</span>
          </button>
        </div>
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
import { SOCIAL_ICONS } from "~/lib/config/social-icons"

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
  url: ""
})

const iconEntries = computed(() => Object.entries(SOCIAL_ICONS))

function selectIcon(label: string, iconName: string) {
  form.value.platform = label
  form.value.icon = iconName
}

watch(() => props.isOpen, (open) => {
  if (open) {
    form.value = {
      platform: "",
      icon: "",
      url: ""
    }
  }
}, { immediate: true })

function handleSave() {
  emit("save", { ...form.value })
  emit("close")
}
</script>
