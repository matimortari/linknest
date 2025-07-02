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

    <div ref="dropdownWrapper" class="input-group relative">
      <button title="See sharing options" class="btn-secondary" @click="toggleDropdown">
        <Icon name="mdi:share-variant" size="20" />
        <span>Share Now</span>
      </button>

      <transition name="dropdown-fade">
        <div v-if="isDropdownOpen" class="popover absolute right-0 top-full">
          <div class="flex flex-col items-start gap-2 text-xs font-semibold">
            <button class="flex flex-row items-center gap-2 rounded-2xl p-2 whitespace-nowrap hover:bg-muted" @click="handleCopyToClipboard">
              <Icon name="mdi:clipboard-multiple-outline" size="20" />
              <span>Copy Link</span>
            </button>
            <button class="flex flex-row items-center gap-2 rounded-2xl p-2 whitespace-nowrap hover:bg-muted" @click="handleShareTwitter">
              <Icon name="simple-icons:x" size="20" />
              <span>Share on X</span>
            </button>
            <button class="flex flex-row items-center gap-2 rounded-2xl p-2 whitespace-nowrap hover:bg-muted" @click="openDialog">
              <Icon name="mdi:qrcode" size="20" />
              <span>Get QR Code</span>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>

  <ProfileQrCodeDialog :is-open="isDialogOpen" :slug="user?.slug ?? ''" @close="closeDialog" />
</template>

<script setup lang="ts">
import { useUserStore } from "~/lib/stores/user-store"

const { user } = storeToRefs(useUserStore())

const isDialogOpen = ref(false)
const isDropdownOpen = ref(false)
const dropdownWrapper = ref<HTMLElement | null>(null)

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function openDialog() {
  isDialogOpen.value = true
}
function closeDialog() {
  isDialogOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (dropdownWrapper.value && !dropdownWrapper.value.contains(e.target as Node)) {
    if (isDropdownOpen.value)
      isDropdownOpen.value = false
    if (isDialogOpen.value)
      closeDialog()
  }
}

watch(isDialogOpen, (newVal) => {
  if (newVal) {
    document.addEventListener("click", handleClickOutside)
  }
  else {
    document.removeEventListener("click", handleClickOutside)
  }
})

function handleCopyToClipboard() {
  navigator.clipboard.writeText(`https://linknest-live.vercel.app/${user.value?.slug}`)
  isDropdownOpen.value = false
}

function handleShareTwitter() {
  const tweet = `🚀 Check out my #LinkNest profile! 🌟\n\n🔗 ${`https://linknest-live.vercel.app/${user.value?.slug}`}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`
  window.open(twitterUrl, "_blank")
  isDropdownOpen.value = false
}

watch([isDropdownOpen, isDialogOpen], ([dropdownOpen, dialogOpen]) => {
  if (dropdownOpen || dialogOpen) {
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
