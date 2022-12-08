import { previewData } from "next/headers";



const useAgilityContext =() => {

	const data = previewData();
	const isDevelopmentMode = process.env.NODE_ENV === "development"

	const isPreview = !!data || isDevelopmentMode

	return {
		locale: "en-us",
		channelName: "website",
		isPreview,
		isDevelopmentMode
	}
}

export default useAgilityContext