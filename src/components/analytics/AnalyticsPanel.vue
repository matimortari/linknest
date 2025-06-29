<template>
  <div class="flex flex-col gap-4">
    <header class="my-2 flex flex-col gap-2">
      <h3>Analytics Summary</h3>
      <p class="text-caption text-muted-foreground">
        Your Key Metrics.
      </p>
    </header>

    <Spinner v-if="isLoading" />

    <div v-else class="my-2 grid grid-cols-2 gap-4 md:grid-cols-4 md:place-items-center">
      <div class="flex flex-row items-center gap-2">
        <Icon name="material-symbols:table-eye" size="25" class="text-accent" />
        <div class="flex flex-col items-start">
          <p class="text-caption text-muted-foreground">
            Total Page Views
          </p>
          <p class="font-semibold md:text-lg">
            {{ totalViews }}
          </p>
        </div>
      </div>

      <div class="flex flex-row items-center gap-2">
        <Icon name="material-symbols:ads-click" size="25" class="text-accent" />
        <div class="flex flex-col items-start">
          <p class="text-caption text-muted-foreground">
            Total Link Clicks
          </p>
          <p class="font-semibold md:text-lg">
            {{ totalClicks }}
          </p>
        </div>
      </div>

      <div class="flex flex-row items-center gap-2">
        <Icon name="material-symbols:percent" size="25" class="text-accent" />
        <div class="flex flex-col items-start">
          <p class="text-caption text-muted-foreground">
            Click Rate
          </p>
          <p class="font-semibold md:text-lg">
            {{ clickRate }}%
          </p>
        </div>
      </div>

      <div class="flex flex-row items-center gap-2">
        <Icon name="material-symbols:calendar-month" size="25" class="text-accent" />
        <div class="flex flex-col items-start">
          <p class="text-caption text-muted-foreground">
            Joined On
          </p>
          <p class="font-semibold md:text-lg">
            {{ createdAt }}
          </p>
        </div>
      </div>
    </div>

    <hr class="my-2 w-full">

    <header class="my-2 flex flex-col gap-2">
      <h3>Profile Views</h3>
      <p class="text-caption text-muted-foreground">
        Total views for your page over the last 30 days.
      </p>
    </header>

    <Spinner v-if="isLoading" />

    <div v-else-if="stats.length <= 1" class="text-lead my-2 text-center text-muted-foreground">
      <p>Not enough data yet.</p>
    </div>

    <AnalyticsBarChart v-else :chart-data="barChartData" />

    <hr class="my-2 w-full">

    <div class="my-2 flex flex-col justify-between gap-2 md:flex-row">
      <div class="flex w-full flex-col gap-2">
        <header class="my-2 flex flex-col gap-2">
          <h3>Link Clicks</h3>
          <p class="text-caption text-muted-foreground">
            Total link clicks over the last 30 days.
          </p>
        </header>

        <Spinner v-if="isLoading" />

        <div v-else-if="stats.length <= 1" class="text-lead my-2 text-center text-muted-foreground">
          <p>Not enough data yet.</p>
        </div>

        <AnalyticsLineChart v-else :chart-data="linkClicksChartData" />
      </div>

      <div class="flex w-full flex-col gap-2">
        <header class="my-2 flex flex-col gap-2">
          <h3>Social Icon Clicks</h3>
          <p class="text-caption text-muted-foreground">
            Total social icon clicks over the last 30 days.
          </p>
        </header>

        <Spinner v-if="isLoading" />

        <div v-else-if="stats.length <= 1" class="text-lead my-2 text-center text-muted-foreground">
          <p>Not enough data yet.</p>
        </div>

        <AnalyticsLineChart v-else :chart-data="iconClicksChartData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/lib/stores/user-store"

const userStore = useUserStore()

const stats = ref<UserStats[]>([])

onMounted(async () => {
  if (!userStore.user) {
    await userStore.fetchUser()
  }

  stats.value = [
    { date: "2025-06-01", pageViews: 1, linkClicks: 3, iconClicks: 1 },
    { date: "2025-06-02", pageViews: 5, linkClicks: 1, iconClicks: 0 },
    // ...
  ]
})

// Use store state and computed getters
const isLoading = computed(() => userStore.isLoading)
const user = computed(() => userStore.user)

// Analytics computations
const totalViews = computed(() => user.value?.views?.length ?? 0)
const totalClicks = computed(() => {
  const linkClicks = user.value?.links?.reduce((acc, link) => acc + (link.clicks ?? 0), 0) ?? 0
  const iconClicks = user.value?.icons?.reduce((acc, icon) => acc + (icon.clicks ?? 0), 0) ?? 0
  return linkClicks + iconClicks
})
const clickRate = computed(() => {
  const views = totalViews.value
  if (views === 0)
    return 0
  return ((totalClicks.value / views) * 100).toFixed(2)
})
const createdAt = computed(() => {
  if (!user.value?.createdAt)
    return "Unknown"
  return new Date(user.value.createdAt).toLocaleDateString()
})

// Chart data
const barChartData = computed(() => ({
  labels: stats.value.map(item => item.date),
  datasets: [{
    label: "Page Views",
    data: stats.value.map(item => item.pageViews),
    backgroundColor: "#4f46e5",
  }],
}))

const linkClicksChartData = computed(() => ({
  labels: stats.value.map(item => item.date),
  datasets: [{
    label: "Link Clicks",
    data: stats.value.map(item => item.linkClicks),
    borderColor: "#9333ea",
    fill: false,
  }],
}))

const iconClicksChartData = computed(() => ({
  labels: stats.value.map(item => item.date),
  datasets: [{
    label: "Icon Clicks",
    data: stats.value.map(item => item.iconClicks),
    borderColor: "#10b981",
    fill: false,
  }],
}))
</script>
