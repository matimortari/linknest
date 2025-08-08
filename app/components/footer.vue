<template>
  <footer class="flex flex-col items-center justify-between gap-2 p-8 md:flex-row">
    <p class="whitespace-nowrap text-sm text-muted-foreground">
      © {{ new Date().getFullYear() }} LinkNest. All rights reserved.
    </p>

    <span class="my-2 w-full border-b" />

    <div class="mx-4 flex items-center gap-4 whitespace-nowrap text-sm font-light text-muted-foreground">
      <nuxt-link to="/legal/privacy" class="underline hover:text-accent">
        Privacy Policy
      </nuxt-link>
      <nuxt-link to="/legal/terms" class="underline hover:text-accent">
        Terms of Service
      </nuxt-link>
      <nuxt-link to="https://github.com/matimortari/linknest" target="_blank" rel="noopener noreferrer">
        <icon name="simple-icons:github" size="25" class="hover:scale-md transition-all hover:text-accent" />
      </nuxt-link>
    </div>
  </footer>
</template>
