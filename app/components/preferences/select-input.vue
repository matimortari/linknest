<template>
  <div class="navigation-group w-full justify-between rounded-2xl border p-2">
    <label :for="id" class="text-caption" :class="[disabled ? 'text-muted line-through' : '']">
      {{ label }}
    </label>

    <select
      :id="id" :value="value"
      :disabled="disabled" class="text-label hover:scale-sm cursor-pointer bg-transparent p-2 text-end text-muted-foreground outline-none transition-all disabled:opacity-50"
      @change="$emit('update:value', $event.target && ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="option in options" :key="option.value" :value="option.value" class="bg-card">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string
  label: string
}

defineProps<{
  id: string
  label: string
  value: string | undefined
  options: Option[]
  disabled?: boolean
}>()

defineEmits(["update:value"])
</script>
