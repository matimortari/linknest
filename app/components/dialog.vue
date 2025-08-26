<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80" @mousedown.self="closeDialog">
        <div class="popover min-w-[400px]">
          <header class="flex flex-row items-center justify-between gap-2">
            <h2>
              {{ title }}
            </h2>

            <button aria-label="Close Dialog" @mousedown="closeDialog">
              <icon name="ph:x-bold" size="30" class="text-muted-foreground" />
            </button>
          </header>

          <section class="m-4">
            <slot />
          </section>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
const props = defineProps({
  isOpen: Boolean,
  title: {
    type: String,
    default: "Dialog Title",
  },
})

const emit = defineEmits(["update:isOpen", "confirm"])

const dialogRef = ref<HTMLElement | null>(null)

function closeDialog() {
  emit("update:isOpen", false)
}

useClickOutside(dialogRef, () => {
  if (props.isOpen) {
    closeDialog()
  }
}, { escapeKey: true })
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
