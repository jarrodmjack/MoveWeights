import { useRouter } from "next/router"
import React from "react"

const SignupButton = () => {
	const router = useRouter()

	const handleRedirectToSignup = () => {
		router.push("/signup")
	}

	return (
		<button
			onClick={handleRedirectToSignup}
			type="button"
			className="py-2 px-4 rounded-lg text-white transition ease-in bg-blush hover:bg-blushDark"
		>
			Sign up
		</button>
	)
}

export default SignupButton
