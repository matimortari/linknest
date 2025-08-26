<template>
  <nav class="flex w-full items-center justify-between px-4 pt-4">
    <nuxt-link to="/" class="hover:scale-sm flex flex-row items-center gap-2 transition-all select-none">
      <img src="/assets/logo.png" alt="Logo" width="35" height="35">
      <span class="font-display text-2xl">LinkNest</span>
    </nuxt-link>

    <div class="flex flex-row items-center justify-end gap-2">
      <button class="btn" aria-label="Toggle Theme" @click="toggleTheme">
        <icon :name="themeIcon" size="25" />
      </button>
      <nuxt-link to="/sign-in" title="Sign In" class="btn" aria-label="Sign In">
        <icon name="material-symbols:login" size="25" />
      </nuxt-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { toggleTheme, themeIcon } = useTheme()
</script>
