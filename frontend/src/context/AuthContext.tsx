import { useRouter } from "next/router"
import { createContext, useReducer, useEffect } from "react"

export const AuthContext = createContext()

export const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { user: action.payload }
		case "LOGOUT":
			return { user: null }
		default:
			return state
	}
}

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(
		authReducer,
		JSON.parse(localStorage.getItem("user"))
	)
	const router = useRouter()
	// check for token in local storage to see if there is already a user logged in

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"))

		if (user) {
			dispatch({ type: "LOGIN", payload: user })
		} else {
			if (router.pathname !== "/") {
				router.push("/login")
			}
		}
	}, [])

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}
