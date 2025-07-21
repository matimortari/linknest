<template>
  <li
    class="flex size-10 flex-row items-center justify-center rounded-full"
    :style="iconStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <a
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      class="flex size-full items-center justify-center"
      @click="$emit('click')"
    >
      <Icon :name="icon" size="20" :style="iconInnerStyle" />
    </a>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<({
  url: string
  icon: string
  preferences: UserPreferencesType
})>()

defineEmits(["click"])

const isHovered = ref(false)

const iconStyle = computed(() => {
  const bgColor = isHovered.value
    ? props.preferences?.iconHoverBackgroundColor
    : props.preferences?.iconBackgroundColor

  let boxShadow = "none"
  if (props.preferences?.isIconShadow) {
    const weight = props.preferences.iconShadowWeight
    const color = props.preferences.iconShadowColor

    boxShadow
      = weight === "none"
        ? "none"
        : weight === "light"
          ? `0px 1px 2px ${color}`
          : weight === "medium"
            ? `0 2px 6px ${color}`
            : `1px 3px 10px ${color}`
  }

  return {
    backgroundColor: bgColor,
    boxShadow,
    transition: "background-color 0.4s ease, box-shadow 0.4s ease",
  }
})

const iconInnerStyle = computed(() => {
  return {
    color: props.preferences?.iconIconColor,
  }
})
</script>
