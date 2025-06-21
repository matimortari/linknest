<template>
  <div class="my-2 space-y-4">
    <p class="text-caption">
      {{ label }}
    </p>

    <div class="space-y-1">
      <label v-for="option in options" :key="option.value" class="flex flex-row items-center gap-2 text-xs">
        <input
          type="radio" :name="name" :value="option.value" :checked="value === option.value"
          class="scale-sm" @change="$emit('update:value', option.value)"
        >

        <span class="text-label">{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string
  label: string
}

defineProps<{
  options: Option[]
  name?: string
  value?: string
  label?: string
}>()

defineEmits(["update:value"])
</script>
