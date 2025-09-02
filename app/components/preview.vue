<template>
  <div class="my-6 flex h-[520px] flex-col items-center justify-center select-none">
    <!-- Mobile Preview Toggle -->
    <button
      class="btn fixed bottom-8 z-20 sm:bottom-36 md:!hidden"
      aria-label="Toggle Mobile Preview" @click="isMobilePreviewVisible = !isMobilePreviewVisible"
    >
      <icon :name="isMobilePreviewVisible ? 'mdi:eye-off' : 'mdi:eye'" size="25" />
      <span>{{ isMobilePreviewVisible ? 'Close Preview' : 'Preview' }}</span>
    </button>

    <!-- Mobile Preview -->
    <div
      v-show="isMobilePreviewVisible" id="mobile-preview"
      class="fixed top-0 left-0 z-10 size-full overflow-y-auto p-12 md:hidden" :style="backgroundStyle"
    >
      <div class="flex flex-col items-center justify-center gap-4 text-center md:my-6">
        <img :src="user?.image ?? undefined" alt="Avatar" class="size-28 object-cover" :style="profilePictureStyle">

        <p class="line-clamp-3 max-w-sm truncate whitespace-break-spaces" :style="slugStyle">
          @{{ user?.slug }}
        </p>

        <p v-if="user?.description" class="line-clamp-3 max-w-sm truncate whitespace-break-spaces" :style="descriptionStyle">
          {{ user?.description }}
        </p>

        <div class="my-2 w-full">
          <ul v-if="icons.length" class="flex flex-row items-center justify-center gap-2">
            <UserIcon
              v-for="icon in icons" :key="icon.id"
              :url="icon.url" :logo="icon.logo"
              :preferences="preferences!" :icon-id="icon.id"
              :user-id="user?.id"
            />
          </ul>
        </div>

        <div class="w-full">
          <ul v-if="links?.length" class="flex flex-col items-center gap-4">
            <UserLink
              v-for="link in links" :key="link.id"
              :url="link.url" :title="link.title"
              :preferences="preferences!" :link-id="link.id"
              :user-id="user?.id"
            />
          </ul>

          <p v-else class="text-muted-foreground text-center">
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
      class="hide-scrollbar relative hidden min-h-[550px] overflow-x-hidden rounded-[2.5rem] border-4 !border-black shadow-lg shadow-black md:block md:w-10/12"
    >
      <div class="sticky top-2 left-1/2 z-10 h-2 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div class="absolute top-2 right-6 z-10 flex flex-row items-center justify-end gap-2 text-black">
        <icon name="mdi:signal" size="15" />
        <icon name="mdi:wifi" size="15" />
      </div>

      <div class="flex flex-col items-center justify-start gap-4 overflow-y-auto p-4 text-center">
        <img :src="user?.image ?? undefined" alt="Avatar" class="size-24 object-cover" :style="profilePictureStyle">

        <p class="line-clamp-3 max-w-sm truncate whitespace-break-spaces" :style="slugStyle">
          @{{ user?.slug }}
        </p>

        <p v-if="user?.description" class="line-clamp-3 max-w-sm truncate leading-4 whitespace-break-spaces" :style="descriptionStyle">
          {{ user?.description }}
        </p>

        <div class="my-2 w-full">
          <ul v-if="icons.length" class="flex flex-row items-center justify-center gap-2">
            <UserIcon
              v-for="icon in icons" :key="icon.id"
              :url="icon.url" :logo="icon.logo"
              :preferences="preferences!"
            />
          </ul>
        </div>

        <div class="w-full">
          <ul v-if="links.length" class="flex flex-col items-center gap-4">
            <UserLink
              v-for="link in links" :key="link.id"
              :url="link.url" :title="link.title"
              :preferences="preferences!"
            />
          </ul>

          <p v-else class="text-muted-foreground text-center">
            No links yet.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  if (preferences.value?.backgroundType === "GRADIENT") {
    return {
      background: `linear-gradient(to bottom, ${preferences.value.backgroundGradientStart}, ${preferences.value.backgroundGradientEnd})`,
    }
  }

  return { backgroundColor: preferences.value?.backgroundColor }
})

const profilePictureStyle = computed(() => ({
  borderRadius: preferences.value?.profilePictureRadius,
  borderColor: preferences.value?.profilePictureBorderColor,
  borderWidth: preferences.value?.profilePictureBorderWidth,
}))

const slugStyle = computed(() => ({
  color: preferences.value?.slugTextColor,
  fontWeight: preferences.value?.slugTextWeight,
  fontSize: preferences.value?.slugTextSize,
  fontFamily: preferences.value?.slugFontFamily,
}))

const descriptionStyle = computed(() => ({
  color: preferences.value?.headerTextColor,
  fontWeight: preferences.value?.headerTextWeight,
  fontSize: preferences.value?.headerTextSize,
  fontFamily: preferences.value?.headerFontFamily,
}))
</script>
