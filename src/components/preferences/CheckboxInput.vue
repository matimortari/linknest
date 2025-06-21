<template>
  <div class="flex w-full flex-row items-center justify-between gap-4 rounded-2xl border p-2 text-sm">
    <label :for="id" class="text-caption">{{ label }}</label>

    <div class="scale-sm flex cursor-pointer flex-row items-center gap-2">
      <input
        :id="id" type="checkbox" :checked="value"
        @change="emit('update:value', ($event.target as HTMLInputElement).checked)"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: String,
  label: String,
  value: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: "update:value", value: boolean): void
}>()
</script>
