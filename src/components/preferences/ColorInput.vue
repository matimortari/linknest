<template>
  <div class="flex w-full flex-row items-center justify-between gap-4 rounded-2xl border p-2">
    <label :for="id" class="text-caption" :class="[disabled ? 'text-muted line-through' : '']">
      {{ label }}
    </label>

    <div class="hover:scale-sm flex cursor-pointer flex-row items-center gap-2">
      <span class="text-label text-muted-foreground">{{ value }}</span>
      <input
        :id="id" type="color"
        :value="value" :disabled="disabled"
        @input="$emit('update:value', ($event.target as HTMLInputElement)?.value)"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: String,
  label: String,
  value: {
    type: String,
    default: "#000000",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(["update:value"])
</script>
