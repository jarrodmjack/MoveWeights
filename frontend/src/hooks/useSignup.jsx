import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useRouter } from "next/router"

export const useSignup = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(null) //loading state
	const { dispatch } = useAuthContext()
	const router = useRouter()

	const signup = async (email, password) => {
		setIsLoading(true)
		setError(null)

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`,
			{
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ email, password }),
			}
		)
		const json = await response.json() //contains jwt and email

		if (!response.ok) {
			setIsLoading(false)
			setError(json.error)
			return
		}
		if (response.ok) {
			//save user to local storage
			localStorage.setItem("user", JSON.stringify(json)) //store email/jwt in local storage

			dispatch({ type: "LOGIN", payload: json }) // this goes to the context to set global state data

			setIsLoading(false)
			router.push("/")
		}
	}

	return { signup, isLoading, error }
}
