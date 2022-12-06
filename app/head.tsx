import { getAgilityPage, GetPageProps } from "#/lib/cms-content/getAgilityPage"

export default async function Head(props: GetPageProps) {
	const agilityPage = await getAgilityPage(props)
	console.log("ROOT HEAD PROPS", agilityPage.page?.title)
	return (
		<>
			<title>Agility / Next.js App Directory Playground</title>
			<meta name="description" content="A playground to explore new Next.js 13 app directory features with Agility." />
		</>
	)
}

