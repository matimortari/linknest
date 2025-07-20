<template>
  <footer class="flex flex-col items-center justify-between gap-2 p-8 lg:flex-row">
    <hr class="my-2 w-full">

    <div class="mx-4 whitespace-nowrap font-light text-muted-foreground">
      <p class="text-caption text-muted-foreground">
        © 2025 Matheus Mortari. All rights reserved.
      </p>
    </div>

    <div class="mx-4 flex flex-row gap-4 text-muted-foreground">
      <NuxtLink href="https://github.com/matimortari">
        <Icon name="simple-icons:github" size="25" class="hover:scale-md hover:text-accent" />
      </NuxtLink>
      <NuxtLink href="https://www.linkedin.com/in/matheus-mortari-19rt">
        <Icon name="simple-icons:linkedin" size="25" class="hover:scale-md hover:text-accent" />
      </NuxtLink>
    </div>
  </footer>
</template>
