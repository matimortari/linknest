<template>
  <Dialog :is-open="isOpen" title="Edit Profile Info" @update:is-open="emit('close')">
    <form class="flex flex-col gap-4 p-4">
      <div class="form-group">
        <label for="slug" class="text-sm font-medium w-20">Slug</label>
        <input id="slug" v-model="form.slug" type="text" class="input flex-1" placeholder="Enter your slug" required>
      </div>

      <div class="form-group">
        <label for="description" class="text-sm font-medium w-20">Description</label>
        <input id="description" v-model="form.description" type="text" class="input flex-1" placeholder="Enter your description">
      </div>

      <div class="form-group">
        <label for="image" class="text-sm font-medium w-20">Image URL</label>
        <input id="image" v-model="form.image" type="url" class="input flex-1" placeholder="https://example.com/image.jpg">
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
import { useUserStore } from "~/lib/stores/user-store"

const props = defineProps<{
  isOpen: boolean
  slug?: string
  description?: string
  image?: string
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const form = ref({
  slug: "",
  description: "",
  image: "",
})

const { user } = storeToRefs(useUserStore())

watch(() => props.isOpen, (open) => {
  if (open) {
    form.value = {
      slug: props.slug || "",
      description: props.description || "",
      image: props.image || "",
    }
  }
  else {
    form.value = { slug: "", description: "", image: "" }
  }
}, { immediate: true })

async function handleSave() {
  try {
    await useUserStore().updateUser({
      ...user.value!,
      slug: form.value.slug,
      description: form.value.description,
      image: form.value.image,
    })

    user.value = { ...form.value }

    emit("close")
  }
  catch (error) {
    console.error("Failed to update user data:", error)
  }
}
</script>
