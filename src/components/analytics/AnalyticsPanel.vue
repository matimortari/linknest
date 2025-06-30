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

    <AnalyticsBarChart v-else :chart-data="pageViewsChartData" />

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

const { user, isLoading } = storeToRefs(useUserStore())

const stats = ref<UserStats[]>([])

function groupByDate<T extends { date: string | Date }>(items: T[]) {
  const result: Record<string, number> = {}
  for (const item of items) {
    const date = new Date(item.date).toISOString().split("T")[0]
    result[date] = (result[date] || 0) + 1
  }
  return result
}

onMounted(async () => {
  await useUserStore().getUser()

  const viewsByDate = groupByDate(user.value?.views ?? [])

  const linkClicks = user.value?.links?.flatMap(link => link.linkClicks ?? []) ?? []
  const linkClicksByDate = groupByDate(linkClicks)

  const iconClicks = user.value?.icons?.flatMap(icon => icon.iconClicks ?? []) ?? []
  const iconClicksByDate = groupByDate(iconClicks)

  const allDates = new Set([
    ...Object.keys(viewsByDate),
    ...Object.keys(linkClicksByDate),
    ...Object.keys(iconClicksByDate),
  ])

  stats.value = [...allDates]
    .sort()
    .map(date => ({
      date,
      pageViews: viewsByDate[date] ?? 0,
      linkClicks: linkClicksByDate[date] ?? 0,
      iconClicks: iconClicksByDate[date] ?? 0,
    }))
})

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
const pageViewsChartData = computed(() => ({
  labels: stats.value.map(item => item.date),
  datasets: [{
    label: "Page Views",
    data: stats.value.map(item => item.pageViews),
    backgroundColor: "#31589c",
  }],
}))

const linkClicksChartData = computed(() => ({
  labels: stats.value.map(item => item.date),
  datasets: [{
    label: "Link Clicks",
    data: stats.value.map(item => item.linkClicks),
    borderColor: "#31589c",
    fill: false,
  }],
}))

const iconClicksChartData = computed(() => ({
  labels: stats.value.map(item => item.date),
  datasets: [{
    label: "Social Icon Clicks",
    data: stats.value.map(item => item.iconClicks),
    borderColor: "#31589c",
    fill: false,
  }],
}))
</script>
