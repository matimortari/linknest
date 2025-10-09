<template>
  <div class="bg-card sticky top-0 z-30 border-b px-4 py-8 md:px-12">
    <header class="flex flex-col items-start gap-2">
      <div class="flex flex-row items-center gap-4">
        <nuxt-link to="/" aria-label="Go back" class="hover:text-primary transition-colors">
          <icon name="mdi:arrow-left" size="30" />
        </nuxt-link>
        <h2>
          Terms of Service
        </h2>
      </div>
      <p class="text-muted-foreground text-sm leading-5">
        Review the rules and terms for using LinkNest.
      </p>
    </header>
    <button class="btn absolute top-4 right-4" aria-label="Toggle Theme" @click="toggleTheme">
      <icon :name="themeIcon" size="20" />
    </button>
  </div>

  <div class="mx-auto flex w-full flex-row justify-between px-8 md:pl-20">
    <article
      v-motion class="flex flex-col gap-4 px-4 py-12 text-start md:px-12"
      :initial="{ opacity: 0 }" :visible="{ opacity: 1 }"
      :duration="800"
    >
      <p class="text-sm">
        <span class="font-semibold">Effective Date:</span> September 8, 2025
      </p>

      <section v-for="(section, index) in termsContent" :key="index" class="my-4 space-y-2">
        <h3 :id="section.title.toLowerCase().replace(/\s+/g, '-')">
          {{ index + 1 }}. {{ section.title }}
        </h3>

        <p v-for="(para, i) in section.body" :key="`para-${i}`" class="text-muted-foreground" v-html="para" />
        <ul v-if="section.list" class="text-muted-foreground list-disc space-y-1 pl-6">
          <li v-for="(item, i) in section.list" :key="`li-${index}-${i}`">
            {{ item }}
          </li>
        </ul>
      </section>
    </article>

    <aside class="sticky top-24 hidden w-72 min-w-72 self-start rounded-b-lg p-4 text-end md:block">
      <nav class="my-8 space-y-4">
        <h4 class="border-b py-4">
          On this page
        </h4>
        <ul class="text-muted-foreground space-y-2">
          <li v-for="(section, index) in termsContent" :key="`toc-${index}`">
            <a
              :href="`#${section.title?.toLowerCase().replace(/\s+/g, '-')}`" class="hover:text-primary block transition-colors"
              :class="{ 'text-primary border-primary border-r-4 pr-2 font-semibold': activeSection === section.title.toLowerCase().replace(/\s+/g, '-') }"
            >
              {{ index + 1 }}. {{ section.title }}
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts">
const { toggleTheme, themeIcon } = useTheme()
const { activeSection } = useActiveHeading()

const termsContent = [
  {
    title: "Introduction",
    body: [
      "Welcome to LinkNest! By accessing or using our service, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use LinkNest.",
      "In these Terms, “we”, “us”, and “our” refer to LinkNest and its affiliates, and “you” and “your” refer to users. These Terms govern your access to and use of LinkNest, including all features, websites, and applications.",
    ],
  },
  {
    title: "Use of Service & Data",
    body: [
      "LinkNest helps users create and share a personal landing page. You agree not to misuse the service or engage in prohibited activities. You retain ownership of the content you add, while granting us a limited license to host and display it solely for service purposes. LinkNest collects analytics and data required for authentication and functionality; see our Privacy Policy for details.",
    ],
    list: [
      "Do not upload or link to illegal content.",
      "Do not interfere with other users pages or the platform.",
      "Do not use LinkNest for phishing, spamming, or distributing malware.",
    ],
  },
  {
    title: "Disclaimers & Termination",
    body: [
      "LinkNest is provided on an \"as-is\" basis. We do not guarantee uninterrupted access, error-free performance, or analytics accuracy. We may suspend or terminate your account if you violate these Terms or engage in harmful activity. You may also delete your account at any time.",
      "Accounts may be suspended or terminated in cases including, but not limited to:",
    ],
    list: [
      "Violating these Terms or applicable laws.",
      "Uploading content that is illegal, harmful, or infringes third-party rights.",
      "Attempting to hack, exploit, or disrupt the platform.",
      "Spamming or sending unsolicited communications through LinkNest.",
    ],
  },
  {
    title: "Governing Law",
    body: [
      "These Terms are governed by the laws of the jurisdiction where LinkNest operates. Any disputes will be resolved in the competent courts of that jurisdiction.",
    ],
  },
  {
    title: "Changes to Terms",
    body: [
      "We may update these Terms from time to time. Continued use of LinkNest constitutes acceptance of the updated Terms. We encourage you to review the Terms periodically.",
    ],
  },
  {
    title: "Contact",
    body: [
      `If you have any questions about the Terms of Service, email the maintainer at 
      <a href="mailto:matheus.felipe.19rt@gmail.com" class='text-primary hover:underline'>
        matheus.felipe.19rt@gmail.com
      </a>.`,
    ],
  },
]

useHead({
  title: "Terms of Service",
  link: [{ rel: "canonical", href: "https://linknest.vercel.app/legal/terms" }],
  meta: [{ name: "description", content: "Read the terms and conditions for using LinkNest." }],
})
</script>
