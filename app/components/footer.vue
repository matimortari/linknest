<template>
  <footer class="flex flex-col items-center justify-between gap-2 p-8 md:flex-row">
    <p class="whitespace-nowrap text-sm text-muted-foreground">
      © {{ new Date().getFullYear() }} LinkNest. All rights reserved.
    </p>

    <span class="my-2 w-full border-b" />

    <div class="mx-4 flex items-center gap-4 whitespace-nowrap text-sm font-light text-muted-foreground">
      <NuxtLink to="/legal/privacy" class="underline hover:text-accent">
        Privacy Policy
      </NuxtLink>
      <NuxtLink to="/legal/terms" class="underline hover:text-accent">
        Terms of Service
      </NuxtLink>
      <NuxtLink to="https://github.com/matimortari/linknest" target="_blank" rel="noopener noreferrer">
        <Icon name="simple-icons:github" size="25" class="hover:scale-md transition-all hover:text-accent" />
      </NuxtLink>
    </div>
  </footer>
</template>
