import { useRouter } from "next/router"
import React from "react"

const LoginButton = () => {
	const router = useRouter()

	const handleRedirectToLogin = () => {
		router.push("/login")
	}

	return (
		<button
        onClick={handleRedirectToLogin}
			type="button"
			className="btn bg-primary-focus text-white"
		>
			Log in
		</button>
	)
}

export default LoginButton
