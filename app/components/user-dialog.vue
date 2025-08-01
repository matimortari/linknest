<template>
  <Dialog :is-open="isOpen" title="Edit Profile Info" @update:is-open="emit('close')">
    <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
      <div class="flex flex-col items-center border-b pb-4">
        <div class="relative size-24">
          <img v-if="form.image" :src="form.image" alt="Profile preview" class="size-full rounded-full border object-cover">
          <input
            id="image"
            type="file"
            accept="image/*"
            class="absolute left-0 top-0 size-full opacity-0"
            @change="handleImageChange"
          >
          <label class="btn absolute -bottom-2 -left-2" for="image">
            <Icon name="ph:upload" size="20" />
          </label>
        </div>
      </div>

      <div class="navigation-group">
        <label for="slug" class="w-20 text-sm font-medium">Slug</label>
        <input
          id="slug" v-model="form.slug"
          type="text" placeholder="Enter your slug"
          required
        >
      </div>

      <div class="navigation-group">
        <label for="description" class="w-20 text-sm font-medium">Description</label>
        <input id="description" v-model="form.description" type="text" placeholder="Enter your description">
      </div>

      <div v-if="hasErrors" class="flex max-w-sm flex-col gap-2 text-center">
        <span v-for="(msg, key) in formErrors" :key="key" class="text-caption text-danger-foreground">{{ msg }} </span>
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
import { useUserStore } from "~~/app/lib/stores/user-store"
import { userDataSchema } from "~~/shared/lib/schemas"

const props = defineProps<{
  isOpen: boolean
  slug?: string
  description?: string
  image?: string
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const userStore = useUserStore()

const form = ref({
  slug: "",
  description: "",
  image: "",
})

const formErrors = ref<{ [key: string]: string }>({})

const hasErrors = computed(() => Object.keys(formErrors.value).length > 0)

const { user } = storeToRefs(userStore)

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
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0)
    return

  const file = input.files[0]
  if (!file)
    return

  const formData = new FormData()
  formData.append("file", file, file.name)
  formData.append("type", "avatar")

  try {
    const response = await userStore.updateUserImage(formData)
    form.value.image = response.imageUrl
    if (user.value) {
      user.value.image = response.imageUrl
    }
  }
  catch (error: any) {
    console.error("Image upload failed:", error)
  }
}

async function handleSubmit() {
  formErrors.value = {}
  const result = userDataSchema.safeParse(form.value)
  if (!result.success) {
    const firstError = result.error.errors[0]
    formErrors.value[firstError.path[0]] = firstError.message

    return
  }
  try {
    await userStore.updateUser({
      ...user.value!,
      ...form.value,
    })
    user.value = { ...form.value }
    emit("close")
  }
  catch (error: any) {
    console.error("Failed to update user data:", error)
  }
}
</script>
