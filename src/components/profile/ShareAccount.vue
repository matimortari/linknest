<template>
  <div class="relative mt-2 flex max-w-lg flex-row justify-between gap-2 rounded-2xl border bg-muted p-2">
    <div class="flex w-full flex-col gap-1 overflow-x-hidden">
      <h5 class="text-foreground">
        Share your Page:
      </h5>
      <NuxtLink :to="`/${session?.user?.slug}`" :title="`linknest-live.vercel.app/${session?.user?.slug}`" class="text-label truncate hover:underline">
        linknest-live.vercel.app/{{ session?.user?.slug }}
      </NuxtLink>
    </div>

    <div ref="dropdownWrapper" class="input-group relative">
      <button title="See sharing options" class="btn-secondary" @click="toggleDropdown">
        <Icon name="mdi:share-variant" size="20" />
        <span>Share Now</span>
      </button>

      <div v-if="isDropdownOpen" class="popover absolute right-0 top-full">
        <div class="flex flex-col items-start gap-2 text-xs font-semibold">
          <button class="flex flex-row items-center gap-2 rounded-2xl p-2 whitespace-nowrap hover:bg-muted" @click="handleCopy">
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
    </div>
  </div>

  <ProfileQrCodeDialog :is-open="isDialogOpen" :slug="session?.user?.slug ?? ''" @close="closeDialog" @save="handleSave" />
</template>

<script setup lang="ts">
const { data: session } = useAuth()

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

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside)
})

function handleCopy() {
  const pageUrl = `https://linknest-live.vercel.app/${session.value?.user?.slug}`
  navigator.clipboard.writeText(pageUrl)
  isDropdownOpen.value = false
}

function handleShareTwitter() {
  const pageUrl = `https://linknest-live.vercel.app/${session.value?.user?.slug}`
  const tweetText = `🚀 Check out my #LinkNest profile! 🌟\n\n🔗 ${pageUrl}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`
  window.open(twitterUrl, "_blank")
  isDropdownOpen.value = false
}

function handleSave() {
  isDialogOpen.value = false
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
