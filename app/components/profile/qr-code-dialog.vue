<template>
  <Dialog :is-open="isOpen" title="My QR Code" @update:is-open="emit('close')">
    <div class="flex flex-col items-center gap-4">
      <p class="text-muted-foreground text-sm">
        Scan this QR code to visit your profile:
      </p>

      <QrcodeVue :value="props.slug" :size="150" level="M" class="!border-muted rounded-lg border bg-white p-2" />

      <button class="hover:underline" aria-label="Copy Profile Link" @click="() => copyToClipboard(`https://linknest-live.vercel.app/${props.slug}`)">
        @{{ props.slug }}
      </button>
    </div>

    <footer class="flex justify-end">
      <button class="btn-primary w-32" aria-label="Copy Profile Link" @click="() => copyToClipboard(`https://linknest-live.vercel.app/${props.slug}`)">
        Copy Link
      </button>
    </footer>
  </Dialog>
</template>

<script setup lang="ts">
import QrcodeVue from "qrcode.vue"

const props = defineProps({
  isOpen: Boolean,
  slug: String,
})

const emit = defineEmits(["close", "update:isOpen"])
</script>
