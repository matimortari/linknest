<template>
  <Dialog :is-open="isOpen" title="QR Code for Your Page" @update:is-open="emit('close')">
    <div class="flex flex-col items-center gap-4">
      <QrcodeVue :value="props.slug" :size="150" level="M" class="rounded-lg border border-muted p-2 bg-white" />
      <p class="text-center text-sm text-muted-foreground truncate">
        <button class="hover:underline" @click="handleCopyToClipboard">
          {{ props.slug }}
        </button>
      </p>
    </div>

    <template #footer>
      <button class="btn-secondary" @click="handleCopyToClipboard">
        Copy Link
      </button>
      <button class="btn-primary" @click="emit('close')">
        Close
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
