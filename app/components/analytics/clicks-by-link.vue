<template>
  <div class="section-container flex flex-col gap-4">
    <header class="my-2 flex flex-col gap-2">
      <h3>
        Clicks By Link
      </h3>
      <p class="text-caption text-muted-foreground">
        Your most visited links & social icons.
      </p>
    </header>

    <Spinner v-if="isIconsLoading || isLinksLoading" />
    <p v-else-if="!links.length && !icons.length" class="text-lead my-2 text-center text-muted-foreground">
      No links or social icons available yet.
    </p>

    <ul v-else class="grid grid-cols-1 gap-2 md:grid-cols-3">
      <li v-for="item in mergedItems" :key="item.url" class="card">
        <div class="mb-2 flex flex-row items-center gap-1">
          <icon v-if="item.type === 'icon' && item.icon" :name="item.icon" size="20" class="text-muted-foreground" />
          <h5 class="truncate text-muted-foreground">
            {{ item.type === 'link' ? item.title : item.platform }}
          </h5>
          <span class="text-label whitespace-nowrap">
            - {{ item.clicks }} clicks
          </span>
        </div>

        <div class="flex flex-col gap-1">
          <p class="text-label truncate">
            {{ item.url }}
          </p>
          <p class="text-label text-muted-foreground">
            Created at {{ item.formattedDate }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useIconStore } from "~/lib/stores/icon-store"
import { useLinkStore } from "~/lib/stores/link-store"

const linkStore = useLinkStore()
const iconStore = useIconStore()

const { links, isLoading: isLinksLoading } = storeToRefs(linkStore)
const { icons, isLoading: isIconsLoading } = storeToRefs(iconStore)

onMounted(async () => {
  if (!icons.value || !links.value) {
    await Promise.all([linkStore.getLinks(), iconStore.getIcons()])
  }
})

interface MergedLinkItem {
  type: "link"
  formattedDate: string
  title: string
  url: string
  createdAt?: Date
  updatedAt?: Date
  clicks: number
}

interface MergedIconItem {
  type: "icon"
  formattedDate: string
  platform: string
  icon: string
  url: string
  createdAt?: Date
  updatedAt?: Date
  clicks: number
}

type MergedItem = MergedLinkItem | MergedIconItem

const mergedItems = computed<MergedItem[]>(() => {
  const typedLinks: MergedLinkItem[] = links.value.map(link => ({
    ...link,
    type: "link",
    clicks: link.clicks ?? 0,
    formattedDate: new Date(link.createdAt ?? 0).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  }))

  const typedIcons: MergedIconItem[] = icons.value.map(icon => ({
    ...icon,
    type: "icon",
    clicks: icon.clicks ?? 0,
    formattedDate: new Date(icon.createdAt ?? 0).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  }))

  return [...typedLinks, ...typedIcons]
})
</script>
