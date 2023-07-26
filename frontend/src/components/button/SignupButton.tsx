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
			className="btn bg-primary-focus text-white"
		>
			Sign up
		</button>
	)
}

export default SignupButton
