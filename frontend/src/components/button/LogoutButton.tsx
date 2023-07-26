import React from "react"
import { useLogout } from "@/hooks/useLogout"

const LogoutButton = () => {
	const { logout } = useLogout()

	return (
		<button
			onClick={logout}
			type="button"
			className=""
		>
			Log out
		</button>
	)
}

export default LogoutButton
