<template>
  <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :duration="800">
    <header class="navigation-group border-b py-2">
      <h2>
        Brand Assets
      </h2>
    </header>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Brand Assets",
  link: [{ rel: "canonical", href: "https://linknest.vercel.app/branding" }],
  meta: [{ name: "description", content: "LinkNest Brand Assets." }],
})
</script>
