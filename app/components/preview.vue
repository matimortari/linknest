<template>
  <div class="my-6 flex max-h-[560px] select-none flex-col items-center justify-center">
    <!-- Mobile Preview Toggle -->
    <button
      class="btn fixed bottom-8 z-20 p-2 sm:bottom-36 md:bottom-12 md:hidden"
      aria-label="Toggle Mobile Preview" @click="isMobilePreviewVisible = !isMobilePreviewVisible"
    >
      <icon :name="isMobilePreviewVisible ? 'mdi:eye-off' : 'mdi:eye'" size="25" />
      <span>{{ isMobilePreviewVisible ? 'Close Preview' : 'Preview' }}</span>
    </button>

    <!-- Mobile Preview -->
    <div
      v-show="isMobilePreviewVisible"
      id="mobile-preview"
      class="fixed left-0 top-0 z-10 size-full overflow-y-auto bg-background p-12 md:hidden"
      :style="backgroundStyle"
    >
      <div class="flex flex-col items-center justify-center gap-4 text-center md:my-6">
        <img :src="user?.image ?? undefined" alt="Avatar" class="size-28 rounded-full object-cover" :style="profilePictureStyle">

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
      v-motion :initial="{ opacity: 0, x: 20 }"
      :visible="{ opacity: 1, x: 0 }" :duration="800"
      :style="backgroundStyle"
      class="hide-scrollbar relative hidden min-h-[550px] overflow-x-hidden rounded-[2.5rem] border-4 border-[#000000] shadow-lg shadow-[#000000] md:block md:w-10/12"
    >
      <div class="sticky left-1/2 top-2 z-10 h-2 w-24 -translate-x-1/2 rounded-full bg-[#000000]" />
      <div class="absolute right-6 top-2 z-10 flex flex-row items-center justify-end gap-2 text-[#000000]">
        <icon name="mdi:signal" size="15" />
        <icon name="mdi:wifi" size="15" />
      </div>

      <div class="flex flex-col items-center justify-start gap-4 overflow-y-auto p-4 text-center">
        <img :src="user?.image ?? undefined" alt="Avatar" class="size-24 rounded-full object-cover" :style="profilePictureStyle">

        <p class="line-clamp-3 max-w-sm truncate whitespace-break-spaces" :style="slugStyle">
          @{{ user?.slug }}
        </p>

        <p v-if="user?.description" class="line-clamp-3 max-w-sm truncate whitespace-break-spaces leading-4" :style="descriptionStyle">
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

const linkStore = useLinkStore()
const iconStore = useIconStore()
const preferencesStore = usePreferencesStore()
const userStore = useUserStore()

const { links } = storeToRefs(linkStore)
const { icons } = storeToRefs(iconStore)
const { preferences } = storeToRefs(preferencesStore)
const { user } = storeToRefs(userStore)
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

onMounted(async () => {
  if (!preferences.value || !user.value || !icons.value || !links.value) {
    await Promise.all([preferencesStore.getPreferences(), userStore.getUser()])
  }
})
</script>
