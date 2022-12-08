import "server-only";
import agility from '@agility/content-fetch'
import { previewData } from 'next/headers';


let sdk: any = null

const getAgilitySDK = () => {

	if (!sdk) {

		const data = previewData();
		const isPreview = !!data

		const apiKey = isPreview ? process.env.AGILITY_API_PREVIEW_KEY : process.env.AGILITY_API_FETCH_KEY

		sdk = agility.getApi({
			guid: process.env.AGILITY_GUID,
			apiKey,
			isPreview
		});
	}

	return sdk

}

export default getAgilitySDK