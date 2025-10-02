<template>
  <Navbar />

  <section id="hero" class="flex min-h-screen flex-col items-center justify-center overflow-hidden border-b-2 px-8 pt-16 md:flex-row md:px-24 md:pt-0 2xl:min-h-[60vh]">
    <header
      v-motion :initial="{ opacity: 0, y: -40 }"
      :visible="{ opacity: 1, y: 0 }" :duration="800"
      class="flex flex-col items-center gap-4 text-center md:items-start md:text-start"
    >
      <h5 class="text-secondary">
        Your link-in-bio page 🪺
      </h5>
      <h1 class="max-w-md">
        Keep all your stuff together!
      </h1>
      <p class="text-muted-foreground max-w-lg font-semibold">
        Welcome to <span class="text-secondary font-bold">LinkNest</span>! Your links, profiles, contact info, and more
        in one place. Create and customize your page and share it with your audience.
      </p>
      <nuxt-link to="/sign-in" class="btn-primary">
        <span>Get Started Now!</span>
        <icon name="ri:arrow-right-line" size="20" />
      </nuxt-link>
    </header>

    <Carousel />
  </section>

  <section id="features" class="relative flex flex-col items-center justify-center gap-12 p-12 text-center md:p-20">
    <h2 class="!font-display">
      Why Choose LinkNest?
    </h2>

    <div class="container mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-4">
      <div
        v-for="(feature, index) in features" :key="index"
        v-motion :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0 }" :duration="800"
        :delay="200 * index" class="card flex flex-col gap-2 text-start"
      >
        <div class="flex flex-row items-center gap-2">
          <span class="from-primary to-secondary flex size-10 items-center justify-center rounded-full bg-gradient-to-br p-2">
            <icon :name="feature.icon" size="25" class="text-[#ebe8e8]" />
          </span>
          <h5>
            {{ feature.title }}
          </h5>
        </div>
        <p class="text-muted-foreground text-sm">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </section>

  <section id="cta" class="bg-card relative z-10 flex min-h-[50vh] flex-col items-center justify-center gap-12 border-y p-12 text-center md:p-20">
    <div class="cta-grid" />
    <div
      v-motion :initial="{ opacity: 0 }"
      :visible="{ opacity: 1 }" :duration="800"
      class="cta-vignette"
    />

    <div class="flex flex-col items-center gap-4">
      <h2 class="!font-display">
        Ready to Try?
      </h2>
      <p class="text-lg font-semibold">
        Create an account and build your page today!
      </p>
      <nuxt-link to="/sign-in" class="btn-secondary">
        <span>Get Started</span>
        <icon name="ri:arrow-right-line" size="20" />
      </nuxt-link>
    </div>

    <p
      v-if="randomQuote" v-motion
      class="text-sm italic" :initial="{ opacity: 0, x: 60 }"
      :visible="{ opacity: 1, x: 0 }" :duration="800"
    >
      "{{ randomQuote.quote }}" - <span class="text-primary font-semibold">{{ randomQuote.author }}</span>
    </p>
  </section>
</template>

<script setup lang="ts">
const randomQuote = ref<{
  quote: string
  author: string
}>()

onMounted(() => {
  randomQuote.value = QUOTES[Math.floor(Math.random() * QUOTES.length)]
})

const features = [
  {
    title: "Unlimited Links",
    description: "Add as many links or social icons as you want.",
    icon: "ri:infinity-fill",
  },
  {
    title: "Fully Customizable",
    description: "Customize the colors, layouts and more for your page.",
    icon: "ri:paint-brush-fill",
  },
  {
    title: "Detailed Analytics",
    description: "Track your page views, clicks, and more with analytics.",
    icon: "ri:line-chart-fill",
  },
  {
    title: "Free to Use!",
    description: "LinkNest is completely free to use, with no hidden fees.",
    icon: "ri:price-tag-3-fill",
  },
]

useHead({
  title: "LinkNest - Your Link-in-Bio Page!",
  link: [{ rel: "canonical", href: "https://linknest-live.vercel.app" }],
  meta: [{ name: "description", content: "Create your own landing page for sharing links to your social media profiles, websites, and more!" }],
})

definePageMeta({
  middleware: guest,
})
</script>
