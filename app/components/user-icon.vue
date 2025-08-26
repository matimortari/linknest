<template>
  <li
    class="flex size-10 items-center justify-center rounded-full" :style="iconStyle"
    @mouseenter="isHovered = true" @mouseleave="isHovered = false"
  >
    <nuxt-link
      :to="url"
      class="flex size-full items-center justify-center"
      @click="$emit('click')"
    >
      <icon :name="logo" size="20" :style="iconInnerStyle" />
    </nuxt-link>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<({
  url: string
  logo: string
  preferences: UserPreferencesType
})>()

defineEmits(["click"])

const iconStore = useIconStore()

const isHovered = ref(false)

const iconStyle = computed(() => {
  return iconStore.getIconStyle(props.preferences, isHovered.value)
})
const iconInnerStyle = computed(() => {
  return iconStore.getIconInnerStyle(props.preferences)
})
</script>
