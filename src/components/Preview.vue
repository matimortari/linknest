<template>
  <div class="my-6 flex max-h-[560px] select-none flex-col items-center justify-center">
    <!-- Mobile Preview Toggle -->
    <button class="btn fixed bottom-8 z-20 p-2 sm:bottom-36 md:bottom-12 lg:hidden" @click="isMobilePreviewVisible = !isMobilePreviewVisible">
      <Icon :name="isMobilePreviewVisible ? 'mdi:eye-off' : 'mdi:eye'" size="25" />
      <span>{{ isMobilePreviewVisible ? 'Close Preview' : 'Preview' }}</span>
    </button>

    <!-- Mobile Preview -->
    <div
      v-show="isMobilePreviewVisible"
      id="mobile-preview"
      class="fixed left-0 top-0 z-10 size-full overflow-y-auto bg-background p-12 lg:hidden"
      :style="backgroundStyle"
    >
      <div class="flex flex-col items-center justify-center gap-4 text-center lg:my-6">
        <img :src="user?.image ?? undefined" alt="Profile picture" width="100" height="100" :style="profilePictureStyle">

        <p class="line-clamp-3 max-w-sm truncate whitespace-break-spaces" :style="slugStyle">
          @{{ user?.slug }}
        </p>

        <p v-if="user?.description" class="line-clamp-3 max-w-sm truncate whitespace-break-spaces" :style="descriptionStyle">
          {{ user?.description }}
        </p>

        <div class="my-2 w-full">
          <ul v-if="icons.length" class="flex flex-row items-center justify-center gap-2">
            <UserIcon
              v-for="icon in icons"
              :key="icon.id"
              :url="icon.url"
              :icon="icon.icon"
              :preferences="preferences!"
              :icon-id="icon.id"
              :user-id="user?.id"
            />
          </ul>
        </div>

        <div class="w-full">
          <ul v-if="links?.length" class="flex flex-col items-center gap-4">
            <UserLink
              v-for="link in links"
              :key="link.id"
              :url="link.url"
              :title="link.title"
              :preferences="preferences!"
              :link-id="link.id"
              :user-id="user?.id"
            />
          </ul>

          <p v-else class="text-center text-muted-foreground">
            No links yet.
          </p>
        </div>
      </div>
    </div>

    <!-- Desktop Preview -->
    <div
      v-motion :initial="{ opacity: 0, x: 20 }" :visible="{ opacity: 1, x: 0 }" :duration="800" :style="backgroundStyle"
      class="relative border-4 border-black shadow-black shadow-lg hidden hide-scrollbar min-h-[550px] overflow-x-hidden rounded-[2.5rem] lg:block lg:w-10/12"
    >
      <div class="sticky top-2 left-1/2 z-10 h-2 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div class="sticky top-2 right-6 z-10 flex flex-row items-center justify-end gap-2 text-black">
        <Icon name="mdi:signal" size="15" />
        <Icon name="mdi:wifi" size="15" />
      </div>

      <div class="p-4 overflow-y-auto flex flex-col items-center justify-start gap-4 text-center pt-4">
        <img :src="user?.image ?? undefined" alt="Profile picture" width="80" height="80" :style="profilePictureStyle">

        <p class="line-clamp-3 max-w-sm truncate whitespace-break-spaces" :style="slugStyle">
          @{{ user?.slug }}
        </p>

        <p v-if="user?.description" class="line-clamp-3 leading-4 max-w-sm truncate whitespace-break-spaces" :style="descriptionStyle">
          {{ user?.description }}
        </p>

        <div class="my-2 w-full">
          <ul v-if="icons.length" class="flex flex-row items-center justify-center gap-2">
            <UserIcon
              v-for="icon in icons"
              :key="icon.id"
              :url="icon.url"
              :icon="icon.icon"
              :preferences="preferences!"
              :icon-id="icon.id"
              :user-id="user?.id"
            />
          </ul>
        </div>

        <div class="w-full">
          <ul v-if="links.length" class="flex flex-col items-center gap-4">
            <UserLink
              v-for="link in links"
              :key="link.id"
              :url="link.url"
              :title="link.title"
              :preferences="preferences!"
              :link-id="link.id"
              :user-id="user?.id"
            />
          </ul>

          <p v-else class="text-center text-muted-foreground">
            No links yet.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIconStore } from "~/lib/stores/icon-store"
import { useLinkStore } from "~/lib/stores/link-store"
import { usePreferencesStore } from "~/lib/stores/preferences-store"
import { useUserStore } from "~/lib/stores/user-store"

const { icons } = storeToRefs(useIconStore())
const { links } = storeToRefs(useLinkStore())
const { preferences } = storeToRefs(usePreferencesStore())
const { user } = storeToRefs(useUserStore())

onMounted(async () => {
  if (!preferences.value)
    await Promise.all([usePreferencesStore().getPreferences(), useUserStore().getUser()])
})

const isMobilePreviewVisible = ref(false)

const backgroundStyle = computed(() => {
  if (!preferences.value)
    return {}
  if (preferences.value.backgroundType === "GRADIENT") {
    return {
      background: `linear-gradient(to bottom, ${preferences.value.backgroundGradientStart}, ${preferences.value.backgroundGradientEnd})`,
    }
  }
  return { backgroundColor: preferences.value.backgroundColor }
})

const profilePictureStyle = computed(() => ({
  borderRadius: preferences.value?.profilePictureRadius,
}))

const slugStyle = computed(() => ({
  color: preferences.value?.slugTextColor,
  fontWeight: preferences.value?.slugTextWeight,
  fontSize: preferences.value?.slugTextSize,
}))

const descriptionStyle = computed(() => ({
  color: preferences.value?.headerTextColor,
  fontWeight: preferences.value?.headerTextWeight,
  fontSize: preferences.value?.headerTextSize,
}))
</script>

<style>
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
