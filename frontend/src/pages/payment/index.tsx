import { useAuthContext } from "@/hooks/useAuthContext"
import { useRouter } from "next/router"
import React from "react"
import { toast } from "react-hot-toast"

const index = () => {
	const { user } = useAuthContext()
	const router = useRouter()

	const handlePayment = async () => {
	    if (!user) return
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-checkout-session`,
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
				}
			)
	        if (response.ok) {
				const data = await response.json()
				router.push(data.url)
			} else {
				// router.push('/payment/cancel')
			}


		} catch (e) {
	        console.log('error: ', e)
	    }
	}

	// const handlePayment = () => {
	// 	if(!user || !router) {
	// 		toast.error("Please try again")
	// 		return
	// 	}
	// 	fetch(
	// 		`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-checkout-session`,
	// 		{
	// 			method: "POST",
	// 			headers: {
	// 				"Content-type": "application/json",
	// 				Authorization: `Bearer ${user.token}`,
	// 			},
	// 		}
	// 	).then(res => {
	// 		if (res.ok) return res.json()
	// 		return res.json().then(json => Promise.reject(json))
	// 	}).then(({url}) => {
	// 		router.push(url)
	// 	})

	// }

	return (
		<div>
			Subscribe to MoveWeights +
			<button
				onClick={handlePayment}
				className="btn bg-primary-focus text-white"
			>
				Join move weights +
			</button>
		</div>
	)
}

export default index
