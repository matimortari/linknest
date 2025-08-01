<template>
  <nav class="flex w-full items-center justify-between px-4 pt-4">
    <NuxtLink to="/" class="hover:scale-sm flex flex-row items-center gap-2 transition-all">
      <img
        src="../public/logo.png" alt="Logo"
        width="35" height="35"
        class="rounded-full"
      >
      <span class="font-chau text-2xl">LinkNest</span>
    </NuxtLink>

    <div class="flex flex-row items-center justify-end gap-2">
      <button class="btn" @click="toggleTheme">
        <Icon :name="themeIcon" size="25" />
      </button>
      <NuxtLink to="/sign-in" title="Sign In" class="btn">
        <Icon name="material-symbols:login" size="25" />
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { toggleTheme, themeIcon } = useTheme()
</script>
