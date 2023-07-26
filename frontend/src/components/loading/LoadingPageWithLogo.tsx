import Image from "next/image"
import React from "react"

const LoadingPageWithLogo = () => {
	return (
		<div className="h-screen flex justify-center items-center">
			<Image
				className="animate-pulse"
				width={250}
				height={150}
				src="/images/mw-blue-logo.png"
				alt="moveweights blue logo"
			/>
		</div>
	)
}

export default LoadingPageWithLogo
