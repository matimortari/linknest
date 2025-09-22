export function useActiveHeading() {
  const activeSection = ref<string | null>(null)

  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
          }
        })
      },
      {
        root: null,
        rootMargin: "0px 0px -70% 0px",
        threshold: 0,
      },
    )

    document.querySelectorAll("article section h3").forEach((heading) => {
      observer.observe(heading)
    })

    onBeforeUnmount(() => observer.disconnect())
  })

  return { activeSection }
}
