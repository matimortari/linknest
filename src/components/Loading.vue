<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-4">
    <div class="relative h-1 w-1/2 overflow-hidden rounded-full bg-muted">
      <div class="absolute h-full w-1/2 animate-bar bg-gradient-to-r from-primary to-secondary rounded-full" />
    </div>
    <p class="text-caption text-muted-foreground">
      Loading<span class="dot one">.</span><span class="dot two">.</span><span class="dot three">.</span>
    </p>
  </div>
</template>

<style scoped>
/* Loading Dots */
.dot {
  opacity: 0;
  animation: fadeIn 1.2s infinite;
}
.dot.one {
  animation-delay: 0s;
}
.dot.two {
  animation-delay: 0.2s;
}
.dot.three {
  animation-delay: 0.4s;
}

@keyframes fadeIn {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

/* Bar Animation */
@keyframes slideBar {
  0% {
    left: -50%;
  }
  100% {
    left: 100%;
  }
}

.animate-bar {
  animation: slideBar 2s linear infinite;
  position: absolute;
  top: 0;
  left: -50%;
}
</style>
