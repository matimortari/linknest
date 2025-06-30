<template>
  <div class="flex flex-col gap-4">
    <header class="my-2 flex flex-col gap-2">
      <h3>Delete Account</h3>
      <p class="text-caption text-danger-foreground">
        This action is irreversible. All data will be lost.
      </p>
    </header>

    <div class="input-group justify-end lg:justify-start">
      <button title="Delete Account" class="btn-danger" @click="handleDeleteUser">
        <Icon name="mdi:user-remove" size="20" />
        <span>Delete Account</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/lib/stores/user-store"

const { signOut } = useAuth()

async function handleDeleteUser() {
  // eslint-disable-next-line no-alert
  if (!confirm("Are you sure you want to delete your account?"))
    return

  try {
    await useUserStore().deleteUser()
    await signOut({ callbackUrl: "/" })
  }
  catch (error) {
    console.error("Failed to delete user:", error)
  }
}
</script>
