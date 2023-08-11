import DoughnutChart from "@/components/chart/DoughnutChart"
import Layout from "@/components/layout/Layout"
import LoadingPageWithLogo from "@/components/loading/LoadingPageWithLogo"
import SetAnalyticsTable from "@/components/table/SetAnalyticsTable"
import { useAuthContext } from "@/hooks/useAuthContext"
import React, { useState, useEffect } from "react"
import { toast } from "react-hot-toast"

const analytics = () => {
	const testData = [26, 22, 17, 17, 9, 7]
	const { user } = useAuthContext()

	const [isLoading, setIsLoading] = useState(false)
	const [setPercentages, setSetPercentages] = useState<number[]>([])

	useEffect(() => {
		const fetchSetAnalytics = async () => {
			if (!user) {
				return
			}

			try {
				setIsLoading(true)
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/sets`,
					{
						method: "GET",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
					}
				)
				const setPercs = await response.json()
				setSetPercentages(setPercs)
				setIsLoading(false)
			} catch (e) {
				toast.error(
					"There was an issue getting your analytics. Please reload the page and try again."
				)
				setIsLoading(false)
			}
		}
		fetchSetAnalytics()
	}, [])

	if (isLoading) {
		return <LoadingPageWithLogo />
	}

	return (
		<Layout>
			<div className="flex flex-col gap-8 p-4">
				<DoughnutChart setPercentages={setPercentages} />
				<SetAnalyticsTable />
			</div>
		</Layout>
	)
}

export default analytics
