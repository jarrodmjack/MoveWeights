import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useRouter } from "next/router"

export const useLogin = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const { dispatch } = useAuthContext()
	const router = useRouter()

	const currentDate = new Date()
	const currentTimeZoneOffset = currentDate.getTimezoneOffset()

	const login = async (email, password) => {
		setIsLoading(true)
		setError(null)
		email = email.toLowerCase()
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
			{
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					email,
					password,
					tzOffset: currentTimeZoneOffset,
				}),
			}
		)

		const json = await response.json()

		if (!response.ok) {
			setIsLoading(false)
			setError(json.error)
		}

		if (response.ok) {
			localStorage.setItem("user", JSON.stringify(json))
			dispatch({ type: "LOGIN", payload: json }) // this goes to the context to set global state data

			setIsLoading(false)
			router.push("/")
		}
	}

	return { login, isLoading, error }
}
