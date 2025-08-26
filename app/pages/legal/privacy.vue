<template>
  <header class="flex flex-col items-center gap-4 border-b p-8 text-center">
    <img src="/assets/logo.png" alt="Logo" width="100" height="100">
    <h2>
      Privacy Policy
    </h2>
    <p class="text-muted-foreground text-center">
      Learn how LinkNest collects, uses, and protects your data.
    </p>
  </header>

  <div
    v-motion class="mx-auto flex max-w-3xl flex-col items-center p-6"
    :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
    :duration="800"
  >
    <section v-for="section in privacyContent" :key="section.title">
      <h3>
        {{ section.title }}
      </h3>

      <p v-html="section.description" />
      <ul v-if="section.list" class="text-muted-foreground list-inside list-disc space-y-1">
        <li v-for="item in section.list" :key="item" v-html="item" />
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
const privacyContent = [
  {
    title: "Information We Collect",
    description:
      "We collect information you provide when creating your account, managing your links, and interacting with our services.",
    list: [
      "Name and email address.",
      "Authentication data via Google or GitHub.",
      "Usage data including clicks on your links and page views.",
    ],
  },
  {
    title: "How We Use Your Data",
    description:
      "Your data helps us provide and improve LinkNest services, communicate with you, and personalize your experience.",
    list: [
      "Manage and display your link pages.",
      "Send important notifications and updates.",
      "Analyze usage patterns for service improvements.",
    ],
  },
  {
    title: "Data Protection",
    description:
      "We employ industry-standard security measures to protect your data, including encryption and secure authentication.",
  },
  {
    title: "Sharing and Disclosure",
    description:
      "We do not sell your personal information. Data may be shared with third parties only to provide essential services or comply with legal requirements.",
  },
  {
    title: "Your Rights",
    description:
      "You can update your profile information and manage your links anytime. Contact us to request data deletion or export.",
    list: [
      "Email us at <a href=\"mailto:matheus.felipe.19rt@gmail.com\" class=\"text-link underline\">matheus.felipe.19rt@gmail.com</a> for any privacy concerns.",
    ],
  },
]

useHead({
  title: "Privacy Policy - LinkNest",
  link: [{ rel: "canonical", href: "https://linknest-live.vercel.app/legal/privacy" }, { rel: "icon", href: "/favicon.svg" }],
  meta: [{ name: "description", content: "Learn how LinkNest collects and protects your data." }],
})

useSeoMeta({
  title: "Privacy Policy - LinkNest",
  description: "Learn how LinkNest collects and protects your data.",
})
</script>
