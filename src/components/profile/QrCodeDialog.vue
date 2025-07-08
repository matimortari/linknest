<template>
  <Dialog :is-open="isOpen" title="My QR Code" @update:is-open="emit('close')">
    <div class="flex flex-col items-center gap-4">
      <p class="text-sm text-muted-foreground">
        Scan this QR code to visit your profile:
      </p>

      <QrcodeVue :value="props.slug" :size="150" level="M" class="rounded-lg border border-muted p-2 bg-white" />

      <button class="hover:underline" @click="handleCopyToClipboard">
        @{{ props.slug }}
      </button>
    </div>

    <template #footer>
      <button class="btn-primary w-32" @click="handleCopyToClipboard">
        Copy Link
      </button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import QrcodeVue from "qrcode.vue"

const props = defineProps({
  isOpen: Boolean,
  slug: String,
})

const emit = defineEmits(["close", "update:isOpen"])

function handleCopyToClipboard() {
  navigator.clipboard.writeText(`https://linknest-live.vercel.app/${props.slug}`)
}
</script>
