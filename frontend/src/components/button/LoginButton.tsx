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
			className="py-2 px-4 rounded-lg text-white transition ease-in bg-blush hover:bg-blushDark"
		>
			Log in
		</button>
	)
}

export default LoginButton
