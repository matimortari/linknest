<template>
  <div class="relative mt-2 flex max-w-lg flex-row justify-between gap-2 rounded-2xl border bg-muted p-2">
    <div class="flex w-full flex-col gap-1 overflow-x-hidden">
      <h5 class="text-foreground">
        Share your Page:
      </h5>
      <NuxtLink :to="`/${user?.slug}`" :title="`linknest-live.vercel.app/${user?.slug}`" class="text-label truncate hover:underline">
        linknest-live.vercel.app/{{ user?.slug }}
      </NuxtLink>
    </div>

    <div ref="dropdownWrapper" class="navigation-group relative">
      <button title="See sharing options" class="btn-secondary" @click="toggleDropdown">
        <Icon name="mdi:share-variant" size="20" />
        <span>Share Now</span>
      </button>

      <transition name="dropdown-fade">
        <div v-if="isDropdownOpen" class="popover absolute right-0 top-full">
          <div class="flex flex-col items-start gap-2 text-xs font-semibold">
            <button class="flex flex-row items-center gap-2 whitespace-nowrap rounded-2xl p-2 hover:bg-muted" @click="() => { copyToClipboard(`https://linknest-live.vercel.app/${user?.slug}`); isDropdownOpen = false }">
              <Icon name="mdi:clipboard-multiple-outline" size="20" />
              <span>Copy Link</span>
            </button>
            <button class="flex flex-row items-center gap-2 whitespace-nowrap rounded-2xl p-2 hover:bg-muted" @click="handleShareTwitter">
              <Icon name="simple-icons:x" size="20" />
              <span>Share on X</span>
            </button>
            <button class="flex flex-row items-center gap-2 whitespace-nowrap rounded-2xl p-2 hover:bg-muted" @click="isDialogOpen = true">
              <Icon name="mdi:qrcode" size="20" />
              <span>Get QR Code</span>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>

  <ProfileQrCodeDialog :is-open="isDialogOpen" :slug="user?.slug ?? ''" @close="isDialogOpen = false" />
</template>

<script setup lang="ts">
import { useUserStore } from "~/lib/stores/user-store"
import { copyToClipboard } from "~/lib/utils"

const userStore = useUserStore()

const { user } = storeToRefs(userStore)
const isDialogOpen = ref(false)
const isDropdownOpen = ref(false)
const dropdownWrapper = ref<HTMLElement | null>(null)

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function handleClickOutside(e: MouseEvent) {
  const target = e.target as Node

  const clickedOutsideDropdown = dropdownWrapper.value && !dropdownWrapper.value.contains(target)
  const clickedInsideQrDialog = isDialogOpen.value
  if (isDropdownOpen.value && clickedOutsideDropdown && !clickedInsideQrDialog) {
    isDropdownOpen.value = false
  }
}

function handleShareTwitter() {
  const tweet = `🚀 Check out my #LinkNest profile! 🌟\n\n🔗 ${`https://linknest-live.vercel.app/${user.value?.slug}`}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`
  window.open(twitterUrl, "_blank")
  isDropdownOpen.value = false
}

watch(isDropdownOpen, (open) => {
  if (open) {
    document.addEventListener("click", handleClickOutside)
  }
  else {
    document.removeEventListener("click", handleClickOutside)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside)
})
</script>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition:
    opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
.dropdown-fade-enter-to,
.dropdown-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
