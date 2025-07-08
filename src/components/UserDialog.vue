<template>
  <Dialog :is-open="isOpen" title="Edit Profile Info" @update:is-open="emit('close')">
    <form class="flex flex-col gap-4" @submit.prevent="handleSave">
      <div class="flex flex-col items-center border-b pb-4">
        <div class="relative w-24 h-24">
          <img v-if="form.image" :src="form.image" alt="Profile preview" class="w-full h-full rounded-full border object-cover">
          <input
            id="image"
            type="file"
            accept="image/*"
            class="absolute opacity-0 top-0 left-0 w-full h-full"
            @change="handleImageChange"
          >
          <label class="btn absolute -bottom-2 -left-2" for="image">
            <Icon name="ph:upload" size="20" />
          </label>
        </div>
      </div>

      <div class="form-group">
        <label for="slug" class="text-sm font-medium w-20">Slug</label>
        <input id="slug" v-model="form.slug" type="text" placeholder="Enter your slug" required>
      </div>

      <div class="form-group">
        <label for="description" class="text-sm font-medium w-20">Description</label>
        <input id="description" v-model="form.description" type="text" placeholder="Enter your description">
      </div>

      <div v-if="hasErrors" class="flex flex-col gap-2 text-center max-w-sm">
        <span v-for="(msg, key) in formErrors" :key="key" class="text-caption text-danger-foreground">{{ msg }} </span>
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
import { userDataSchema } from "~/lib/schemas"
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

const formErrors = ref<{ [key: string]: string }>({})

const hasErrors = computed(() => Object.keys(formErrors.value).length > 0)

const { user } = storeToRefs(useUserStore())

watch(() => props.isOpen, (open) => {
  if (open) {
    form.value = {
      slug: props.slug || "",
      description: props.description || "",
      image: props.image || "",
    }
    formErrors.value = {}
  }
  else {
    form.value = { slug: "", description: "", image: "" }
    formErrors.value = {}
  }
}, { immediate: true })

async function handleImageChange(event: Event) {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (!file)
    return

  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/user/image-upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    const data = await response.json()
    form.value.image = data.url
  }
  catch (err) {
    console.error("Upload failed", err)
    formErrors.value.image = "Failed to upload image."
  }
}

async function handleSave() {
  formErrors.value = {}
  const result = userDataSchema.safeParse(form.value)
  if (!result.success) {
    const firstError = result.error.errors[0]
    formErrors.value[firstError.path[0]] = firstError.message

    return
  }
  try {
    await useUserStore().updateUser({
      ...user.value!,
      ...form.value,
    })
    user.value = { ...form.value }
    emit("close")
  }
  catch (error) {
    console.error("Failed to update user data:", error)
  }
}
</script>
