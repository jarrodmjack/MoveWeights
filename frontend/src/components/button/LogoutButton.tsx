import React from "react"
import { useRouter } from "next/router"
import { useLogout } from "@/hooks/useLogout"

const LogoutButton = () => {
	const { logout } = useLogout()

	return (
		<button
			onClick={logout}
			type="button"
			className="py-2 px-4 rounded-lg text-white transition ease-in bg-blush hover:bg-blushDark"
		>
			Log out
		</button>
	)
}

export default LogoutButton
