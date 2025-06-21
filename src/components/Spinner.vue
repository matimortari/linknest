<template>
  <div class="flex size-full items-center justify-center p-12">
    <div
      v-motion class="size-8 rounded-full border-t-2 border-solid border-accent"
      :initial="{ rotate: 0 }" :visible="{
        rotate: 360,
        transition: {
          duration: 800,
          repeat: Infinity,
          ease: 'linear',
        },
      }"
    />
  </div>
</template>
