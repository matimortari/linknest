import { computed, onMounted } from "vue"

export function useTheme() {
  const colorMode = useState<"light" | "dark">("theme", () => "light")

  const updateHtmlClass = () => {
    const html = document.documentElement
    if (colorMode.value === "dark") {
      html.classList.add("dark")
    }
    else {
      html.classList.remove("dark")
    }
  }

  const syncThemeFromLocalStorage = () => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark" || saved === "light") {
      colorMode.value = saved
    }
    updateHtmlClass()
  }

  const toggleTheme = () => {
    colorMode.value = colorMode.value === "dark" ? "light" : "dark"
    localStorage.setItem("theme", colorMode.value)
    updateHtmlClass()
  }

  onMounted(() => {
    syncThemeFromLocalStorage()
  })

  const themeIcon = computed(() =>
    colorMode.value === "light" ? "ph:moon" : "ph:sun"
  )

  return {
    colorMode,
    toggleTheme,
    themeIcon,
  }
}
