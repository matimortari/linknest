<template>
  <header class="flex flex-col items-center gap-4 border-b p-8 text-center">
    <img src="/assets/logo.png" alt="Logo" width="100" height="100">
    <h2 class="font-bowlby">
      Terms of Service
    </h2>
    <p class="text-muted-foreground text-center">
      Please read these terms carefully before using LinkNest.
    </p>
  </header>

  <div
    v-motion class="mx-auto flex max-w-3xl flex-col items-center p-6"
    :initial="{ opacity: 0, y: 20 }" :visible="{ opacity: 1, y: 0 }"
    :duration="800"
  >
    <section v-for="section in termsContent" :key="section.title">
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
const termsContent = [
  {
    title: "Acceptance of Terms",
    description:
      "By using LinkNest, you agree to comply with and be bound by these Terms of Service.",
  },
  {
    title: "Use of Service",
    description:
      "You agree to use LinkNest only for lawful purposes and not to misuse the service in any way.",
    list: [
      "No fraudulent, harmful, or illegal activity.",
      "Respect other users and their content.",
      "Keep your account credentials secure.",
    ],
  },
  {
    title: "Content Ownership",
    description:
      "You retain ownership of the links and information you add. We do not claim any ownership of your content.",
  },
  {
    title: "Account Termination",
    description:
      "We reserve the right to suspend or terminate accounts that violate our policies or pose risks to the service.",
  },
  {
    title: "Limitation of Liability",
    description:
      "LinkNest is provided as-is without warranties. We are not liable for any damages arising from your use of the service.",
  },
  {
    title: "Contact Us",
    description:
      "If you have any questions about these Terms, please email us at <a href=\"mailto:matheus.felipe.19rt@gmail.com\" class=\"text-link underline\">matheus.felipe.19rt@gmail.com</a>.",
  },
]

useHead({
  title: "Terms of Service - LinkNest",
  link: [{ rel: "canonical", href: "https://linknest-live.vercel.app/legal/terms" }, { rel: "icon", href: "/favicon.ico" }],
  meta: [{ name: "description", content: "Terms and conditions for using LinkNest." }],
})

useSeoMeta({
  title: "Terms of Service - LinkNest",
  description: "Terms and conditions for using LinkNest.",
})
</script>
