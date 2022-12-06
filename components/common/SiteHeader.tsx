"use client"

import React, {useState} from "react"
import Link from "next/link"
import head from "next/head"
import Image from "next/image"
import {AgilityImage, ComponentWithInit, ContentItem, CustomInitPropsArg, ImageField} from "@agility/nextjs"

interface ILink {
	title: string
	path: string
}

interface ICustomData {
	siteName: string
	logo: ImageField
	links: ILink[]
}

const SiteHeader: ComponentWithInit<ICustomData | null> = ({globalData, sitemapNode, page}) => {
	// open / close mobile nav
	const [open, setOpen] = useState(false)

	// get header data
	const header: ICustomData = globalData ? globalData["header"] : null

	if (!header) {
		return (
			<header className="relative p-8 text-center">
				<p className="text-gray-400 font-bold">No Header Available</p>
			</header>
		)
	}
	return (
		<header className="relative w-full mx-auto bg-white px-8">
			<div className="max-w-screen-xl mx-auto">
				<div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
					<div className="lg:w-0 lg:flex-1">
						<Link href="/" className="flex items-center">
							<AgilityImage
								className="h-14 sm:h-20 w-auto z-50"
								src={header.logo.url}
								alt={header.logo.label}
								width={header.logo.height}
								height={header.logo.width}
								fill={false}
							/>
							<p className="font-bold text-xl text-secondary-500 ml-3 mt-2">{header.siteName}</p>
						</Link>
					</div>
					<div className="-mr-2 -my-2 md:hidden">
						<button
							onClick={() => setOpen(!open)}
							aria-label="Toggle Menu"
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
						>
							{/* <!-- Heroicon name: menu --> */}
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
					<nav className="hidden md:flex space-x-10">
						{header.links.map((navitem, index) => {
							return (
								<Link
									href={navitem.path}
									key={`mobile-${index}`}
									className="text-base leading-6 font-medium text-secondary-500 hover:text-primary-500 border-transparent border-b-2 hover:border-primary-500 hover:border-b-primary hover:border-b-2 focus:outline-none focus:text-primary-500 transition duration-300"
								>
									{navitem.title}
								</Link>
							)
						})}
					</nav>
				</div>
			</div>

			<div
				className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-20"
				style={{display: open ? "block" : "none"}}
			>
				<div className="rounded-lg shadow-lg">
					<div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
						<div className="pt-5 pb-6 px-5 space-y-6">
							<div className="flex items-center justify-end">
								<div className="-mr-2">
									<button
										onClick={() => setOpen(!open)}
										aria-label="Toggle Menu"
										type="button"
										className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-300"
									>
										{/* <!-- Heroicon name: x --> */}
										<svg
											className="h-6 w-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								</div>
							</div>
							<div>
								<nav className="grid gap-y-8">
									{header.links.map((navitem, index) => {
										return (
											<Link
												key={`nav-${index}`}
												href={navitem.path}
												onClick={() => setOpen(false)}
												className="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition duration-300"
											>
												{/* <!-- Heroicon name: view-grid --> */}
												<svg
													className="flex-shrink-0 h-6 w-6 text-primary-600"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
													/>
												</svg>
												<div className="text-base leading-6 font-medium text-gray-900">{navitem.title}</div>
											</Link>
										)
									})}
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

interface IHeader {
	siteName: string
	logo: ImageField
}

SiteHeader.getCustomInitialProps = async function ({agility, languageCode, channelName}: CustomInitPropsArg) {
	// set up api
	const api = agility

	// set up content item
	let contentItem: ContentItem<IHeader> | null = null

	// set up links
	let links = []

	try {
		// try to fetch our site header
		let header = await api.getContentList({
			referenceName: "siteheader",
			languageCode: languageCode,
			take: 1,
		})

		// if we have a header, set as content item
		if (header && header.items && header.items.length > 0) {
			contentItem = header.items[0]
		}

		if (!contentItem) {
			return null
		}
	} catch (error) {
		if (console) console.error("Could not load site header item.", error)
		return null
	}

	try {
		// get the nested sitemap
		let sitemap = await api.getSitemapNested({
			channelName: channelName,
			languageCode: languageCode,
		})

		// grab the top level links that are visible on menu
		links = sitemap
			.filter((node: any) => node.visible.menu)
			.map((node: any) => {
				return {
					title: node.menuText || node.title,
					path: node.path,
				}
			})
	} catch (error) {
		if (console) console.error("Could not load nested sitemap.", error)
	}

	// return clean object...
	return {
		siteName: contentItem.fields.siteName,
		logo: contentItem.fields.logo,
		links,
	} as ICustomData
}

export default SiteHeader
