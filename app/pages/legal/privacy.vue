<template>
  <header class="flex flex-col items-start gap-2 border-b p-8 text-start">
    <h2>
      Privacy Policy
    </h2>
    <p class="text-muted-foreground">
      Learn how LinkNest collects, uses, and protects your data.
    </p>
  </header>

  <div class="mx-auto flex w-full flex-row justify-between gap-8 px-8 py-4 md:px-24">
    <article
      v-motion class="flex flex-col gap-4 p-4 text-left"
      :initial="{ opacity: 0 }" :visible="{ opacity: 1 }"
      :duration="800"
    >
      <p class="text-lg">
        <span class="font-semibold">Effective Date:</span> September 8, 2025
      </p>

      <section v-for="(section, index) in privacyContent" :key="index">
        <h3>
          {{ index + 1 }}. {{ section.title }}
        </h3>

        <p v-for="(para, i) in section.body" :key="`para-${i}`" class="text-muted-foreground" v-html="para" />
        <ul class="text-muted-foreground list-disc">
          <li v-for="(item, i) in section.list" :key="`li-${index}-${i}`">
            {{ item }}
          </li>
        </ul>
      </section>
    </article>

    <aside class="bg-card sticky top-24 hidden w-72 rounded-lg p-4 text-right shadow-2xl lg:block">
      <nav class="space-y-4">
        <h3 class="border-b py-4">
          On this page
        </h3>
        <ul class="text-muted-foreground space-y-2">
          <li v-for="(section, index) in privacyContent" :key="`toc-${index}`">
            <a :href="`#${section.title?.toLowerCase().replace(/\s+/g, '-')}`" class="hover:text-primary block transition-colors">
              {{ section.title }}
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts">
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
