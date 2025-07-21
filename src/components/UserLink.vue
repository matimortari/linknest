<template>
  <li
    class="relative flex w-full min-w-32 max-w-80 flex-row items-center justify-center"
    :style="linkStyle"
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
      <span class="mx-2 inline-block truncate px-4 text-center" :style="linkInnerStyle">
        {{ title }}
      </span>
    </a>
    <button
      v-if="preferences?.showCopyButton"
      class="hover:scale-md absolute right-2 flex-shrink-0"
      @click.stop="handleCopyToClipBoard"
    >
      <Icon
        :name="copied ? 'mdi:check' : 'mdi:content-copy'"
        size="15"
        :style="{ color: preferences?.linkTextColor }"
      />
    </button>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<({
  url: string
  title: string
  preferences: UserPreferencesType
})>()

defineEmits(["click"])

const isHovered = ref(false)
const copied = ref(false)

const linkStyle = computed(() => {
  const bgColor = isHovered.value
    ? props.preferences?.linkHoverBackgroundColor
    : props.preferences?.linkBackgroundColor

  let boxShadow = "none"
  if (props.preferences?.isLinkShadow) {
    const weight = props.preferences.linkShadowWeight
    const color = props.preferences.linkShadowColor

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
    borderRadius: props.preferences?.linkBorderRadius,
    padding: props.preferences?.linkPadding,
    transition: "background-color 0.4s ease, box-shadow 0.4s ease",
  }
})

const linkInnerStyle = computed(() => {
  return {
    color: props.preferences?.linkTextColor,
    fontWeight: props.preferences?.linkTextWeight,
    fontSize: props.preferences?.linkTextSize,
  }
})

function handleCopyToClipBoard() {
  navigator.clipboard.writeText(props.url ?? "").then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1000)
  })
}
</script>
