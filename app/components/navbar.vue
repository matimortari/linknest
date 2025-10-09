<template>
  <nav class="flex w-full flex-row items-center justify-between gap-2 p-4">
    <div class="flex flex-row items-center gap-2">
      <nuxt-link to="/">
        <icon name="simple-icons:nuxt" size="35" class="text-primary" />
      </nuxt-link>

      <div v-if="userStore.user" class="flex flex-row items-center gap-2">
        <p class="text-sm">
          Hi, <span class="text-primary font-semibold">{{ userStore.user?.name }}</span>
        </p>

        <input
          v-model="nameInput"
          type="text"
          placeholder="Update your name"
          class="rounded border px-2 py-1 text-sm"
        >
        <button class="btn" @click="updateName">
          Update
        </button>

        <button class="btn" @click="signOut">
          Logout
        </button>
      </div>

      <div v-else class="flex flex-row items-center gap-2">
        <p class="text-sm">
          Unauthenticated
        </p>
        <nuxt-link to="/sign-in" class="btn">
          Sign In
        </nuxt-link>
      </div>
    </div>

    <div class="flex flex-row items-center gap-2">
      <nuxt-link to="https://github.com/matimortari/nuxtjs-starter" class="btn">
        <icon name="simple-icons:github" size="20" />
      </nuxt-link>

      <button class="btn" @click="toggleTheme">
        <icon :name="themeIcon" size="20" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { clear } = useUserSession()
const { toggleTheme, themeIcon } = useTheme()
const userStore = useUserStore()

const nameInput = ref("")

onMounted(async () => {
  try {
    await userStore.getUser()
    nameInput.value = userStore.user?.name || ""
  }
  catch (error) {
    console.error("Failed to fetch user:", error)
  }
})

async function updateName() {
  if (!nameInput.value.trim())
    return
  try {
    await userStore.updateUser({ name: nameInput.value.trim() })
    await userStore.getUser() // Refresh the store after update
    console.log("User name updated successfully")
  }
  catch (error) {
    console.error("Failed to update name:", error)
  }
}

function signOut() {
  clear()
  navigateTo("/")
}
</script>
