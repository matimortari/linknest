<template>
  <div class="container mx-auto grid min-h-screen grid-cols-1 items-center gap-6 p-24 md:gap-12 lg:grid-cols-2">
    <div class="flex flex-col items-center gap-4 text-center md:items-start md:text-start">
      <p class="text-siga-700 text-4xl font-bold md:text-5xl md:whitespace-nowrap">
        {{ error.statusCode }} - {{ error.statusMessage || "An unexpected error has occurred." }}
      </p>

      <p class="text-muted-foreground flex flex-col text-lg">
        Please try going back to the homepage or refreshing the page.
      </p>

      <button class="group flex flex-row items-center gap-4 font-semibold" @click="handleError">
        <icon name="ph:arrow-left-bold" size="25" class="group-hover:scale-md" />
        <span>Go Back</span>
      </button>
    </div>

    <div class="flex items-center justify-center md:items-end md:justify-end">
      <icon :name="statusIcons[error.statusCode] || 'ph:smiley-sad-light'" size="180" class="md:hidden" />
      <icon :name="statusIcons[error.statusCode] || 'ph:smiley-sad-light'" size="300" class="hidden md:block" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app"

defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: "/" })

const statusIcons: Record<number, string> = {
  400: "ph:smiley-sad-light", // Bad Request
  401: "ph:warning-light", // Unauthorized
  403: "ph:shield-warning-light", // Forbidden
  404: "ph:smiley-sad-light", // Not Found
  500: "ph:cloud-warning-light", // Internal Server Error
  502: "ph:cloud-warning-light", // Bad Gateway
  503: "ph:cloud-x-light", // Service Unavailable
}
</script>
