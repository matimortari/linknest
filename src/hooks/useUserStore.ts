import { create } from "zustand"

interface Store {
	user: User | null
	setUser: (user: User) => void
	clearUser: () => void
	updateUser: (user: Partial<User>) => void
}

const useUserStore = create<Store>((set) => ({
	user: null, // Initially, the user is null
	setUser: (user) => set({ user }), // Set user data
	clearUser: () => set({ user: null }), // Clear user data (e.g., for logout)
	updateUser: (userData) =>
		set((state) => ({
			user: { ...state.user, ...userData } as User // Merge user data
		}))
}))

export default useUserStore
