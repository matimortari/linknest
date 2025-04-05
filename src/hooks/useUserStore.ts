import { create } from "zustand"

interface Store {
	user: User | null
	setUser: (user: User) => void
	clearUser: () => void
	updateUser: (user: Partial<User>) => void
}

const useUserStore = create<Store>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	clearUser: () => set({ user: null }),
	updateUser: (userData) =>
		set((state) => ({
			user: { ...state.user, ...userData } as User
		}))
}))

export default useUserStore
