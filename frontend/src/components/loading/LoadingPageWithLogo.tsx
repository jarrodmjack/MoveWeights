import Image from "next/image"
import React from "react"

const LoadingPageWithLogo = () => {
	return (
		<div className="flex justify-center items-center">
			<Image
				className="animate-pulse mt-60"
				width={250}
				height={150}
				src="/images/mw-blue-logo.png"
				alt="moveweights blue logo"
			/>
		</div>
	)
}

export default LoadingPageWithLogo
