import { useQuery } from "@tanstack/react-query"
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
