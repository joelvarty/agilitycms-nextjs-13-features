import "#/styles/globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {

	return (
		<html lang="en" className="">
			<head />

			<body>
				<header>
					<nav>NAV HERE</nav>
				</header>
				{children}
				<footer>FOOTER</footer>
			</body>
		</html>
	)


}

