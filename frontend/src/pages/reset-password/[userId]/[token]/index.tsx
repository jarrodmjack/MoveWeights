import { useRouter } from "next/router"
import React, { useEffect } from "react"

const index = () => {
	const router = useRouter()
	console.log(router.query)

	useEffect(() => {
		if (!router.query.userId || !router.query.token) return

		const verifyPasswordResetLink = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/user/reset-password/${router.query.userId}/${router.query.token}`,
				{
					method: "GET",
					headers: {
						"Content-type": "application/json",
					},
				}
			)

			console.log("response: ", response)
		}
		verifyPasswordResetLink()
	}, [router.query])

	if (!router.query) {
		return <>Loading...</>
	}

	return <div>test</div>
}

export default index
