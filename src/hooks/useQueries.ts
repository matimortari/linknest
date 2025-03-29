import { getAnalytics, getClicksByLink } from "@/src/services/analyticsService"
import { getIcons } from "@/src/services/iconsService"
import { getLinks } from "@/src/services/linksService"
import { getPreferences } from "@/src/services/preferencesService"
import { getUserData } from "@/src/services/userService"
import { useQuery } from "@tanstack/react-query"

export function useGetUserData() {
	return useQuery({
		queryKey: ["getUserData"],
		queryFn: getUserData
	})
}

export function useGetLinks() {
	return useQuery({
		queryKey: ["getLinks"],
		queryFn: getLinks
	})
}

export function useGetIcons() {
	return useQuery({
		queryKey: ["getIcons"],
		queryFn: getIcons
	})
}

export function useGetPreferences() {
	return useQuery({
		queryKey: ["getPreferences"],
		queryFn: getPreferences
	})
}

export function useGetAnalytics() {
	return useQuery({
		queryKey: ["getAnalytics"],
		queryFn: getAnalytics
	})
}

export function useGetClicksByLink() {
	return useQuery({
		queryKey: ["getClicksByLink"],
		queryFn: getClicksByLink
	})
}
