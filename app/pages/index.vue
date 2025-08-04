<template>
  <Navbar />

  <section
    id="hero" v-motion
    class="relative flex min-h-screen flex-col items-center justify-center p-8 md:justify-start md:pt-0" :initial="{ opacity: 0, y: 20 }"
    :visible="{ opacity: 1, y: 0 }" :duration="800"
  >
    <div class="absolute left-1/4 top-20 -z-10 size-64 rounded-full bg-primary opacity-20 blur-3xl" />
    <div class="absolute bottom-20 right-1/4 -z-10 size-64 rounded-full bg-primary opacity-20 blur-3xl" />

    <div class="container mx-auto flex min-h-screen flex-col items-center justify-between gap-12 md:flex-row">
      <div
        v-motion class="flex max-w-lg flex-col items-center gap-4 text-center md:w-1/2 md:items-start md:text-start"
        :initial="{ opacity: 0, x: 20 }" :visible="{ opacity: 1, x: 0 }"
        :duration="800"
      >
        <h4 class="font-lato font-bold text-accent">
          Your link-in-bio page 🔗🪺
        </h4>
        <h1 class="font-bowlby text-5xl">
          Keep all your stuff together!
        </h1>
        <p class="font-lato font-semibold text-muted-foreground">
          Welcome to <span class="font-bold text-accent">LinkNest</span>! Your links, profiles, contact info, and more
          in one place. Create and customize your page and share it with your audience.
        </p>
        <a href="/sign-in" class="btn-primary">
          <span>Get Started Now!</span>
          <Icon name="ri:arrow-right-line" size="20" />
        </a>
      </div>

      <div
        v-motion class="md:w-1/2"
        :initial="{ opacity: 0, x: 20 }" :visible="{ opacity: 1, x: 0 }"
        :duration="800"
      >
        <Carousel />
      </div>
    </div>
  </section>

  <section id="features" class="relative flex flex-col items-center justify-center gap-12 p-12 text-center">
    <div class="absolute inset-0 -z-10 h-44 w-10/12 rounded-full bg-primary opacity-20 blur-3xl" />
    <h2
      v-motion class="font-bowlby"
      :initial="{ opacity: 0 }" :visible="{ opacity: 1 }"
      :duration="800"
    >
      Why Choose LinkNest?
    </h2>

    <div class="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-4">
      <div
        v-for="feature, index in features" :key="feature.id"
        v-motion class="card space-y-2 text-start"
        :description="feature.description" :icon="feature.icon"
        :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
        :duration="800" :delay="100 * index"
      >
        <div class="flex flex-row items-center gap-2">
          <span class="flex size-10 items-center justify-center rounded-full bg-accent bg-gradient-to-bl from-primary to-secondary p-2">
            <Icon :name="feature.icon" size="25" class="text-[#ebe8e8]" />
          </span>
          <h5>
            {{ feature.title }}
          </h5>
        </div>
        <p class="text-sm text-muted-foreground">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </section>

  <section
    id="cta" v-motion
    :initial="{ opacity: 0 }" :visible="{ opacity: 1 }"
    :duration="800"
    class="relative z-10 flex flex-col items-center justify-center gap-6 border-y bg-card p-12 text-center"
  >
    <div
      v-motion
      :initial="{ opacity: 0 }" :visible="{ opacity: 1 }"
      :duration="800"
      class="absolute inset-0 -z-10 m-6 bg-[length:60px_60px] bg-center opacity-60" :style="{
        backgroundImage:
          'linear-gradient(to right, var(--muted) 1px, transparent 1px), linear-gradient(to bottom, var(--muted) 1px, transparent 1px)',
      }"
    />
    <h2 class="font-bowlby">
      Ready to Try?
    </h2>
    <p class="text-lg">
      Create an account and build your page today!
    </p>
    <a href="/sign-in" class="btn-secondary">Get Started</a>
    <p
      v-motion class="text-xs font-semibold italic"
      :initial="{ opacity: 0, x: 60 }" :visible="{ opacity: 1, x: 0 }"
      :duration="800"
    >
      "{{ randomQuote?.quote }}" -
      <span class="text-accent">{{ randomQuote?.author }}</span>
    </p>
  </section>
</template>

<script setup lang="ts">
import { QUOTES } from "~/lib/config/quotes.js"
import guest from "~/lib/middleware/guest"

const randomQuote = ref(QUOTES[0])

onMounted(() => {
  const index = Math.floor(Math.random() * QUOTES.length)
  randomQuote.value = QUOTES[index]
})

const features = [
  {
    id: 1,
    title: "Unlimited Links",
    description: "Add as many links or social buttons as you want to your page.",
    icon: "ri:infinity-fill",
  },
  {
    id: 2,
    title: "Fully Customizable",
    description: "Customize the colors, layouts and more for your page.",
    icon: "ri:paint-brush-fill",
  },
  {
    id: 3,
    title: "Detailed Analytics",
    description: "Track your page views, clicks, and more with analytics.",
    icon: "ri:line-chart-fill",
  },
  {
    id: 4,
    title: "Free to Use!",
    description: "Linknest is completely free to use, with no hidden fees.",
    icon: "ri:price-tag-3-fill",
  },
]

useHead({
  title: "LinkNest – Your Link-in-Bio Page!",
  link: [{ rel: "canonical", href: "https://linknest-live.vercel.app" }, { rel: "icon", href: "/favicon.ico" }],
  meta: [
    { name: "description", content: "Create your own landing page for sharing links to your social media profiles, websites, and more!" },
    { property: "og:title", content: "LinkNest – Your Link-in-Bio Page!" },
    { property: "og:description", content: "Create your own landing page for sharing links to your social media profiles, websites, and more!" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://linknest-live.vercel.app/og-image.png" },
    { property: "og:url", content: "https://linknest-live.vercel.app" },
    { name: "google-site-verification", content: "2j0bcfhh8FCYPpzFylzbiPjl3Pa0X7lMuG060ctsCsA" },
  ],
})

useSeoMeta({
  title: "LinkNest – Your Link-in-Bio Page!",
  description: "Create your own landing page for sharing links to your social media profiles, websites, and more!",
  ogTitle: "LinkNest – Your Link-in-Bio Page!",
  ogDescription: "Create your own landing page for sharing links to your social media profiles, websites, and more!",
  ogImage: "https://linknest-live.vercel.app/og-image.png",
  ogUrl: "https://linknest-live.vercel.app",
})

definePageMeta({
  middleware: guest,
})
</script>
