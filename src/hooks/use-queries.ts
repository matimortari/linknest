import { getAnalytics, getClicksByLink } from "@/src/services/analytics"
import { getIcons } from "@/src/services/icons"
import { getLinks } from "@/src/services/links"
import { getPreferences } from "@/src/services/preferences"
import { useQuery } from "@tanstack/react-query"

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
