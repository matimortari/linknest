<template>
  <footer class="flex flex-col items-center justify-between gap-2 p-8 md:flex-row">
    <span class="my-2 w-full border-b" />

    <div class="mx-4 whitespace-nowrap font-light text-muted-foreground">
      <p class="text-caption text-muted-foreground">
        © 2025 Matheus Mortari. All rights reserved.
      </p>
    </div>

    <div class="navigation-group mx-4 text-muted-foreground">
      <NuxtLink to="https://github.com/matimortari">
        <Icon name="simple-icons:github" size="25" class="hover:scale-md transition-all hover:text-accent" />
      </NuxtLink>
      <NuxtLink to="https://www.linkedin.com/in/matheus-mortari-19rt">
        <Icon name="simple-icons:linkedin" size="25" class="hover:scale-md transition-all hover:text-accent" />
      </NuxtLink>
    </div>
  </footer>
</template>
