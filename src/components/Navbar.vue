<template>
  <nav class="flex w-full items-center justify-between px-4 pt-4">
    <NuxtLink href="/" class="flex flex-row items-center gap-2 scale-sm">
      <img src="/logo.png" alt="LinkNest Logo" width="35" height="35" class="rounded-full">
      <span class="text-2xl font-chau">LinkNest</span>
    </NuxtLink>

    <div class="flex flex-row items-center justify-end gap-2">
      <button class="btn" @click="toggleTheme">
        <Icon :name="themeIcon" size="25" />
      </button>

      <NuxtLink href="/sign-in" title="Sign In" class="btn">
        <Icon name="material-symbols:login" size="25" />
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { toggleTheme, themeIcon } = useTheme()
</script>
