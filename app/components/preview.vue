<template>
  <div v-if="user" class="my-6 flex-col items-center justify-center select-none md:h-[520px]">
    <!-- Mobile Preview Toggle -->
    <button class="btn fixed bottom-8 left-1/2 z-20 -translate-x-1/2 md:!hidden" aria-label="Toggle Mobile Preview" @click="isMobilePreviewVisible = !isMobilePreviewVisible">
      <icon :name="isMobilePreviewVisible ? 'mdi:eye-off' : 'mdi:eye'" size="25" />
      <span>{{ isMobilePreviewVisible ? 'Close Preview' : 'Preview' }}</span>
    </button>

    <!-- Mobile Preview -->
    <div v-show="isMobilePreviewVisible" id="mobile-preview" class="fixed top-0 left-0 z-10 size-full overflow-y-auto p-12 md:hidden" :style="backgroundStyle">
      <div class="flex flex-col items-center justify-center gap-4 text-center md:my-6">
        <img :src="user.image ?? undefined" alt="Avatar" class="size-28 object-cover" :style="profilePictureStyle">

        <p class="line-clamp-3 max-w-sm truncate whitespace-break-spaces" :style="slugStyle">
          @{{ user.slug }}
        </p>

        <p v-if="user.description" class="line-clamp-3 max-w-sm truncate whitespace-break-spaces" :style="descriptionStyle">
          {{ user.description }}
        </p>

        <ul v-if="icons.length" class="my-2 flex w-full flex-row items-center justify-center gap-2">
          <UserIcon
            v-for="icon in icons" :key="icon.id"
            :url="icon.url" :logo="icon.logo"
            :preferences="preferences!"
          />
        </ul>

        <ul v-if="links.length" class="flex w-full flex-col items-center gap-4">
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

    <!-- Desktop Preview -->
    <div
      v-motion :initial="{ opacity: 0, x: 20 }"
      :visible="{ opacity: 1, x: 0 }" :duration="800"
      :style="backgroundStyle"
      class="hide-scrollbar relative mx-auto hidden min-h-[550px] overflow-x-hidden rounded-[2.5rem] border-4 !border-black shadow-lg shadow-black md:block md:w-10/12 2xl:w-8/12"
    >
      <div class="sticky top-2 left-1/2 z-10 h-2 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div class="absolute top-2 right-6 z-10 flex flex-row items-center justify-end gap-2 text-black">
        <icon name="mdi:signal" size="15" />
        <icon name="mdi:wifi" size="15" />
      </div>

      <div class="flex flex-col items-center justify-start gap-4 overflow-y-auto p-4 text-center">
        <img :src="user.image ?? undefined" alt="Avatar" class="size-24 object-cover" :style="profilePictureStyle">

        <p class="line-clamp-3 max-w-sm truncate whitespace-break-spaces" :style="slugStyle">
          @{{ user.slug }}
        </p>

        <p v-if="user.description" class="line-clamp-3 max-w-sm truncate leading-4 whitespace-break-spaces" :style="descriptionStyle">
          {{ user.description }}
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
const userStore = useUserStore()
const preferencesStore = usePreferencesStore()
const linkStore = useLinkStore()
const iconStore = useIconStore()

const { user } = storeToRefs(userStore)
const { preferences } = storeToRefs(preferencesStore)
const { links } = storeToRefs(linkStore)
const { icons } = storeToRefs(iconStore)
const isMobilePreviewVisible = ref(false)

const {
  backgroundStyle,
  profilePictureStyle,
  slugStyle,
  descriptionStyle,
} = useDynamicStyles(toRef(preferencesStore, "preferences"))
</script>
