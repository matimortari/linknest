<template>
  <div v-if="!user || !user.id || !user.preferences" class="flex min-h-screen flex-col items-center justify-between gap-12 p-12">
    <p class="text-lead text-center text-muted-foreground">
      User {{ slug }} not found.
    </p>

    <NuxtLink href="/" class="flex flex-row items-center gap-2 scale-sm">
      <img src="/logo.png" alt="LinkNest Logo" width="35" height="35" class="rounded-full">
      <span class="text-2xl font-chau">LinkNest</span>
    </NuxtLink>
  </div>

  <div v-else class="min-h-screen p-12" :style="backgroundStyle">
    <div class="flex flex-col items-center justify-center gap-4 text-center">
      <SupportBanner v-if="user.preferences?.supportBanner && user.preferences.supportBanner !== 'NONE'" :type="user.preferences.supportBanner" />

      <img
        v-if="user.image"
        :src="user.image"
        alt="Profile picture"
        class="size-20"
        :style="{ borderRadius: user.preferences?.profilePictureRadius }"
      >

      <p
        :style="{
          color: user.preferences?.slugTextColor,
          fontWeight: user.preferences?.slugTextWeight,
          fontSize: user.preferences?.slugTextSize,
        }"
      >
        {{ `@${user.slug}` }}
      </p>

      <p
        v-if="user.description"
        class="max-w-sm truncate whitespace-break-spaces"
        :style="{
          color: user.preferences?.headerTextColor,
          fontWeight: user.preferences?.headerTextWeight,
          fontSize: user.preferences?.headerTextSize,
        }"
      >
        {{ user.description }}
      </p>

      <ul v-if="user.icons?.length" class="my-2 flex flex-row items-center justify-center gap-2">
        <UserIcon
          v-for="icon in user.icons"
          :key="icon.id"
          :url="icon.url"
          :icon="icon.icon"
          :preferences="user.preferences"
          :icon-id="icon.id"
          :user-id="user.id"
          @click="handleClick(icon.id, 'icon')"
        />
      </ul>

      <ul v-if="user.links?.length" class="flex flex-col items-center gap-4">
        <UserLink
          v-for="link in user.links"
          :key="link.id"
          :url="link.url"
          :title="link.title"
          :preferences="user.preferences"
          :link-id="link.id"
          :user-id="user.id"
          @click="handleClick(link.id, 'link')"
        />
      </ul>

      <p v-else class="text-muted-foreground">
        No links yet.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { trackClick, trackPageVisit } from "~/lib/services/user-service"

const route = useRoute()
const slug = route.params.slug as string

const { data: user } = await useFetch(`/api/user/${slug}`, {
  headers: useRequestHeaders(["cookie"]),
})

watch(() => user.value?.id, async (id) => {
  if (id) {
    try {
      await trackPageVisit(id)
    }
    catch (error) {
      console.error("Failed to track page visit:", error)
    }
  }
}, { immediate: true })

const backgroundStyle = computed(() => {
  if (!user.value?.preferences)
    return {}
  const prefs = user.value.preferences

  return prefs.backgroundType === "GRADIENT"
    ? {
        background: `linear-gradient(to bottom, ${prefs.backgroundGradientStart}, ${prefs.backgroundGradientEnd})`,
      }
    : { backgroundColor: prefs.backgroundColor }
})

async function handleClick(id: string, type: "link" | "icon") {
  if (!user.value)
    return
  try {
    await trackClick(id, type, user.value.id)
  }
  catch (error) {
    console.error(`Failed to track ${type} click:`, error)
  }
}

useHead({
  title: `@${user?.value?.slug || slug} – LinkNest`,
  link: [
    { rel: "canonical", href: `https://linknest.app/${user?.value?.slug || slug}` },
    { rel: "icon", href: "/favicon.ico" }
  ],
  meta: [
    { name: "description", content: `@${user?.value?.slug || slug} profile on LinkNest.` }
  ],
})

useSeoMeta({
  title: `@${user?.value?.slug || slug} – LinkNest`,
  description: `@${user?.value?.slug || slug} profile on LinkNest.`,
})

definePageMeta({
  layout: "user"
})
</script>
