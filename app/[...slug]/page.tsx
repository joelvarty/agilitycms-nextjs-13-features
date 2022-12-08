import { getAgilityPage } from "#/lib/cms-content/getAgilityPage"
import { getPageTemplate } from "#/components/agility-pageTemplates"

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

	const AgilityPageTemplate = getPageTemplate(agilityData.pageTemplateName || "")

	// if (dynamicPageItem?.seo?.metaDescription) {
	// 	page.seo.metaDescription = dynamicPageItem.seo.metaDescription
	// }

	return (
		<>
			{/* <h1>{agilityData.page.title}</h1>
			<div>slug: {JSON.stringify(params)}</div>
			<div>searchParams: {JSON.stringify(searchParams)}</div> */}
			{AgilityPageTemplate && <AgilityPageTemplate {...agilityData} />}
			{!AgilityPageTemplate && <div>The template {agilityData.pageTemplateName} could not be found.</div>}
		</>
	)
}
