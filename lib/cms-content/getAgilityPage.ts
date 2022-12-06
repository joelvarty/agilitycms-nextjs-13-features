import { AgilityPageProps } from "@agility/nextjs";
import { getAgilityPageProps } from "@agility/nextjs/node";
import { cache } from "react";

import { previewData } from 'next/headers';

export interface GetPageProps {
	params: { slug: string[] }
	searchParams?: { [key: string]: string | string[] | undefined }
}



export const getAgilityPage = async ({ params }: GetPageProps) => {



	const data = previewData();
	const preview = !!data

	if (!params.slug) params.slug = [""]

	console.log("Fetching Page", params, preview)

	const agilityPage = await getAgilityPageProps({ params, preview, getModule })
	return agilityPage
}



const getModule = (name: string) => {
	return null
}