import SiteHeader from "#/components/common/SiteHeader"
import {getModule} from "#/components/agility-pageModules"
import {ComponentWithInit} from "@agility/nextjs"
import {getAgilityPageProps, getAgilityPaths} from "@agility/nextjs/node"
import { getAgilityPage } from "#/lib/cms-content/getAgilityPage"

export const revalidate = 10 // revalidate this page every 10 seconds

export default async function Page({
	params,
	searchParams,

}: {
	params: {slug: string[]}
	searchParams?: {[key: string]: string | string[] | undefined}

}) {

	const agilityData = await getAgilityPage({params})

	if (!agilityData.page) return null
	console.log("LOAD PAGE", agilityData.page.title)

	return (
		<main>
			<h1>{agilityData.page.title}</h1>
			<div>slug: {JSON.stringify(params)}</div>
			<div>searchParams: {JSON.stringify(searchParams)}</div>
		</main>
	)
}
