<template>
  <div class="min-h-screen p-8">
    <h1 class="mb-8 text-3xl font-bold">
      Font Test Page
    </h1>

    <div class="space-y-4">
      <div v-for="font in fonts" :key="font.label" class="rounded border p-4">
        <h3 class="mb-2 text-lg font-semibold">
          {{ font.label }}
        </h3>
        <p :style="{ fontFamily: font.value, fontSize: '18px' }">
          The quick brown fox jumps over the lazy dog. 1234567890
        </p>
        <p class="mt-1 text-sm text-gray-600">
          CSS: {{ font.value }}
        </p>
      </div>
    </div>

    <div class="mt-8 rounded border bg-yellow-50 p-4">
      <h3 class="mb-2 text-lg font-semibold">
        Dynamic Style Test
      </h3>
      <p :style="dynamicStyle">
        This text should use the selected font: {{ selectedFont }}
      </p>
      <select v-model="selectedFont" class="mt-2 rounded border p-2">
        <option v-for="font in fonts" :key="font.label" :value="font.value">
          {{ font.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FONT_FAMILIES } from "#shared/config/appearance-options"

const fonts = FONT_FAMILIES
const selectedFont = ref("'Roboto', sans-serif")

const dynamicStyle = computed(() => ({
  fontFamily: selectedFont.value,
  fontSize: "18px",
  fontWeight: "500",
}))

useHead({
  title: "Font Test",
})
</script>
