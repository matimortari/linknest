<template>
  <div class="bg-card sticky top-0 z-30 border-b px-4 py-8 md:px-12">
    <header class="flex flex-col items-start gap-2">
      <div class="flex flex-row items-center gap-4">
        <nuxt-link to="/" aria-label="Go back" class="hover:text-primary transition-colors">
          <icon name="mdi:arrow-left" size="30" />
        </nuxt-link>
        <h2>
          Privacy Policy
        </h2>
      </div>
      <p class="text-muted-foreground text-sm leading-5">
        Learn how LinkNest collects, uses, and protects your data.
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

      <section v-for="(section, index) in privacyContent" :key="index" class="my-4 space-y-2">
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
          <li v-for="(section, index) in privacyContent" :key="`toc-${index}`">
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

const privacyContent = [
  {
    title: "Introduction",
    body: [
      "This Privacy Policy explains how LinkNest collects, uses, and protects your personal information when you access or use our services.",
      "In this Policy, “we”, “us”, and “our” refer to LinkNest and its affiliates, and “you” and “your” refer to users of our services.",
    ],
  },
  {
    title: "Information We Collect",
    body: [
      "We collect information to provide and improve our services, including:",
    ],
    list: [
      "Account information from OAuth providers (Google, GitHub).",
      "Content you create or share on your LinkNest page.",
      "Usage analytics such as page views, clicks, and interactions.",
      "Technical data such as device type, browser, IP address, and cookies.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "We use the information we collect to:",
    ],
    list: [
      "Provide, maintain, and improve the service.",
      "Authenticate users and secure accounts.",
      "Analyze usage trends and generate analytics for users.",
      "Communicate important updates, including policy changes.",
    ],
  },
  {
    title: "Sharing and Disclosure",
    body: [
      "We do not sell your personal information. We may share information in the following situations:",
    ],
    list: [
      "With service providers that help us operate the platform.",
      "When required by law, legal process, or governmental request.",
      "To protect rights, safety, or property of LinkNest and our users.",
    ],
  },
  {
    title: "Cookies and Tracking",
    body: [
      "LinkNest uses cookies and similar technologies to enhance your experience, measure usage, and improve our services.",
    ],
    list: [
      "Essential cookies to enable account login and security.",
      "Analytics cookies to monitor traffic and feature usage.",
      "Optional cookies for personalized preferences and improvements.",
    ],
  },
  {
    title: "Data Retention and Security",
    body: [
      "We retain personal data as long as necessary to provide our services or comply with legal obligations. We implement technical and organizational measures to protect data from unauthorized access, disclosure, or misuse.",
    ],
  },
  {
    title: "Your Rights",
    body: [
      "Depending on your jurisdiction, you may have rights regarding your personal data, including:",
    ],
    list: [
      "Accessing or correcting your personal information.",
      "Requesting deletion of your personal information.",
      "Objecting to or restricting certain processing activities.",
      "Withdrawing consent where applicable.",
    ],
  },
  {
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. Continued use of LinkNest constitutes acceptance of the updated policy. We encourage you to review this page periodically.",
    ],
  },
  {
    title: "Contact",
    body: [
      `If you have any questions about the Privacy Policy, email the maintainer at 
      <a href="mailto:matheus.felipe.19rt@gmail.com" class='text-primary hover:underline'>
        matheus.felipe.19rt@gmail.com
      </a>.`,
    ],
  },
]

useHead({
  title: "Privacy Policy - LinkNest",
  link: [{ rel: "canonical", href: "https://LinkNest.vercel.app/legal/privacy" }, { rel: "icon", href: "/favicon.svg" }],
  meta: [{ name: "description", content: "Read the privacy policy for LinkNest." }],
})

useSeoMeta({
  title: "Privacy Policy - LinkNest",
  description: "Read the privacy policy for LinkNest.",
})
</script>
