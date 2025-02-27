import { useQuery } from "@tanstack/react-query"
import { getAnalytics, getClicksByLink } from "../services/analyticsService"
import { getIcons } from "../services/iconsService"
import { getLinks } from "../services/linksService"
import { getPreferences } from "../services/preferencesService"
import { getUserData } from "../services/userService"

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
