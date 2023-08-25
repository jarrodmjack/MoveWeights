import Layout from "@/components/layout/Layout"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useRouter } from "next/router"
import React from "react"
import { FaCheck } from "react-icons/fa"

const index = () => {
	const { user } = useAuthContext()
	const router = useRouter()

	const handleCreateCheckoutSession = async () => {
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
			}
		} catch (e) {
			console.log("error: ", e)
		}
	}

	return (
		<Layout>
			<div className="flex flex-col md:flex-row md:justify-evenly">
				<div className="flex flex-col justify-center self-center mt-8">
					<p className="text-2xl font-semibold text-center">Pay once</p>
					<p className="text-2xl font-semibold text-center">Access forever</p>
				</div>
				<div className="shadow-xl p-5 rounded-lg flex flex-col gap-10 w-5/6 mx-auto">
					<div>
						<h1 className="text-2xl font-bold">One-time payment of $10 CAD</h1>
						<span className="text-sm text-base-300">
							*local taxes may apply
						</span>
					</div>
					<div className="flex flex-col gap-2">
						<p className="flex items-center gap-2">
							<FaCheck className="text-success" />
							Analytics
						</p>
						<p className="flex items-center gap-2">
							<FaCheck className="text-success" />
							Workout History
						</p>
						<p className="flex items-center gap-2">
							<FaCheck className="text-success" />
							Workout Templates
						</p>
						<p className="flex items-center gap-2">
							<FaCheck className="text-success" />
							How-to Training videos
						</p>
					</div>
					<button className="btn text-white bg-primary-focus">Purchase MoveWeights+</button>
					<p>This item is non-refundable</p>
				</div>
			</div>
		</Layout>
	)
}

export default index
