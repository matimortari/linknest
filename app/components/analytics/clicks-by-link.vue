<template>
  <div class="section-container flex flex-col gap-4">
    <header class="my-2 flex flex-col gap-1">
      <h3>
        Clicks By Link
      </h3>
      <p class="text-caption">
        Your most visited links & social icons.
      </p>
    </header>

    <Spinner v-if="isIconsLoading || isLinksLoading" />
    <p v-else-if="!links.length && !icons.length" class="text-lead m-8 text-center">
      No links or social icons available yet.
    </p>

    <ul v-else class="grid grid-cols-1 gap-2 md:grid-cols-3">
      <li v-for="item in mergedItems" :key="item.url" class="card">
        <div class="mb-2 flex flex-row items-center gap-1">
          <icon v-if="item.type === 'icon' && item.icon" :name="item.icon" size="20" class="text-muted-foreground" />
          <h5 class="text-muted-foreground truncate">
            {{ item.type === 'link' ? item.title : item.platform }}
          </h5>
          <span class="text-caption whitespace-nowrap">
            - {{ item.clicks }} clicks
          </span>
        </div>

        <div class="flex flex-col gap-1">
          <p class="text-caption truncate">
            {{ item.url }}
          </p>
          <p class="text-caption text-muted-foreground">
            Created at {{ item.formattedDate }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const linkStore = useLinkStore()
const iconStore = useIconStore()

const { links, isLoading: isLinksLoading } = storeToRefs(linkStore)
const { icons, isLoading: isIconsLoading } = storeToRefs(iconStore)

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
    icon: icon.logo,
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
