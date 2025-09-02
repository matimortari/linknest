<template>
  <nuxt-link to="/" class="hover:scale-sm fixed top-4 left-4 z-50 flex flex-row items-center gap-2 transition-all select-none">
    <img src="/assets/logo.png" alt="Logo" width="35" height="35">
  </nuxt-link>

  <Spinner v-if="isLoading" />

  <div v-else-if="!user || !user.id" class="flex min-h-screen flex-col items-center justify-between gap-12 p-12">
    <p class="text-lead text-center">
      User {{ slug }} not found.
    </p>
  </div>

  <div v-else class="min-h-screen p-12 pb-28" :style="backgroundStyle">
    <div class="flex flex-col items-center justify-center gap-4 text-center">
      <SupportBanner
        v-if="user.preferences?.supportBanner && user.preferences.supportBanner !== 'NONE'"
        :type="user.preferences.supportBanner"
      />

      <img
        v-if="user.image" :src="user.image"
        alt="Avatar" class="size-24 object-cover"
        :style="profilePictureStyle"
      >

      <p :style="slugStyle">
        {{ `@${user.slug}` }}
      </p>

      <p v-if="user.description" class="max-w-sm truncate leading-4 whitespace-break-spaces" :style="descriptionStyle">
        {{ user.description }}
      </p>

      <ul v-if="user.icons?.length && user.preferences" class="my-2 flex flex-row items-center justify-center gap-2">
        <UserIcon
          v-for="icon in user.icons" :key="icon.id"
          :url="icon.url" :logo="icon.logo"
          :preferences="user.preferences" @click="handleClick(icon.id ?? '', 'icon')"
        />
      </ul>

      <ul v-if="user.links?.length && user.preferences" class="flex flex-col items-center gap-4">
        <UserLink
          v-for="link in user.links" :key="link.id"
          :url="link.url" :title="link.title"
          :preferences="user.preferences" @click="handleClick(link.id ?? '', 'link')"
        />
      </ul>

      <p v-else class="text-muted-foreground">
        No links yet.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()

const route = useRoute()
const slug = route.params.slug as string
const { user, isLoading } = storeToRefs(userStore)
const preferences = computed(() => user.value?.preferences)

const { backgroundStyle, profilePictureStyle, slugStyle, descriptionStyle } = useDynamicStyles(preferences)

async function handleClick(id: string, type: "link" | "icon") {
  if (!user.value)
    return

  try {
    await userStore.trackClick(id, type, user.value.id ?? "")
  }
  catch (error: any) {
    console.error(`Failed to track ${type} click:`, error)
  }
}

watch(() => route.params.slug, async (newSlug) => {
  if (!newSlug)
    return

  await userStore.getUserBySlug(newSlug as string)

  const user = userStore.user
  if (user?.id) {
    await userStore.trackPageVisit(user.id)

    useHead({
      title: `@${user.slug} - LinkNest`,
      link: [{ rel: "canonical", href: `https://linknest.app/${user.slug}` }, { rel: "icon", href: "/favicon.svg" }],
      meta: [{ name: "description", content: `@${user.slug} profile on LinkNest.` }],
    })

    useSeoMeta({
      title: `@${user.slug} - LinkNest`,
      description: `@${user.slug} profile on LinkNest.`,
    })
  }
}, { immediate: true })

definePageMeta({
  layout: "user",
})
</script>
