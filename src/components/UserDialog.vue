<template>
  <Dialog :is-open="isOpen" title="Edit Profile Info" @update:is-open="emit('close')">
    <form class="flex flex-col gap-4 p-4">
      <div class="form-group">
        <label for="slug" class="text-sm font-medium w-20">Slug</label>
        <input id="slug" v-model="form.slug" type="text" placeholder="Enter your slug" required>
      </div>

      <div class="form-group">
        <label for="description" class="text-sm font-medium w-20">Description</label>
        <input id="description" v-model="form.description" type="text" placeholder="Enter your description">
      </div>

      <div class="form-group">
        <label for="image" class="text-sm font-medium w-20">Image URL</label>
        <input id="image" v-model="form.image" type="url" placeholder="https://example.com/image.jpg">
      </div>
    </form>

    <div v-if="hasErrors" class="flex flex-col gap-2 text-center max-w-sm">
      <span v-for="(msg, key) in formErrors" :key="key" class="text-caption text-danger-foreground">{{ msg }} </span>
    </div>

    <template #footer>
      <button class="btn-primary w-full" @click="handleSave">
        Save
      </button>
    </template>
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
