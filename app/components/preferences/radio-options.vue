<template>
  <div class="flex w-full flex-col gap-4 p-2">
    <p class="text-caption">
      {{ label }}
    </p>

    <div class="space-y-2">
      <label v-for="option in options" :key="option.value" class="flex flex-row items-center gap-2">
        <input
          type="radio" :name="name"
          :value="option.value" :checked="value === option.value"
          class="hover:scale-sm transition-all" @change="$emit('update:value', option.value)"
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
