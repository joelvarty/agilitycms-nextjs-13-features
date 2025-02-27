"use client"

// 'use client' marks this page as a Client Component
// https://beta.nextjs.org/docs/rendering/server-and-client-components

import {useEffect} from "react"

export default function Error({error, reset}: {error: Error; reset: () => void}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div>
			<h1>This is the error page.</h1>
			<p>Something went wrong!</p>
			<button onClick={() => reset()}>Start over</button>
		</div>
	)
}
