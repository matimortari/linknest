<template>
  <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :duration="800">
    <header class="navigation-group border-b py-2">
      <h2>
        API Specification
      </h2>
    </header>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "API Specification",
  link: [{ rel: "canonical", href: "https://linknest.vercel.app/api-spec" }],
  meta: [{ name: "description", content: "LinkNest API Specification." }],
})
</script>
