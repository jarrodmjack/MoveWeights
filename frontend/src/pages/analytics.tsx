import DoughnutChart from "@/components/chart/DoughnutChart"
import AnalyticsDateFilter from "@/components/filter/AnalyticsDateFilter"
import Layout from "@/components/layout/Layout"
import LoadingPageWithLogo from "@/components/loading/LoadingPageWithLogo"
import SetAnalyticsTable from "@/components/table/SetAnalyticsTable"
import { useAuthContext } from "@/hooks/useAuthContext"
import React, { useState, useEffect } from "react"
import { toast } from "react-hot-toast"

const analytics = () => {
	const { user } = useAuthContext()

	const [isLoading, setIsLoading] = useState(false)
	const [setCounts, setSetCounts] = useState<number[]>([])
	const [setAnalyticsData, setSetAnalyticsData] = useState<
		[string, { sets: number; percOfLifts: number }][] | null
	>(null)

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
				const resSetCountMap = await response.json()

				const setEntries: [
					string,
					{ sets: number; percOfLifts: number }
				][] = Object.entries(resSetCountMap)

				const setPercentageList = setEntries.map(
					(entry) => entry[1].sets
				)

				setSetCounts(setPercentageList)
				setSetAnalyticsData(setEntries)
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

	const fetchSetAnalyticsByTimePeriod = async (timePeriod: Date | null) => {

		console.log('tp: ', timePeriod)

	}

	if (isLoading) {
		return <LoadingPageWithLogo />
	}

	return (
		<Layout>
			<div className="flex flex-col gap-8 p-4 justify-center">
				<AnalyticsDateFilter handleClick={fetchSetAnalyticsByTimePeriod} />
				<DoughnutChart setCounts={setCounts} />
				{setAnalyticsData && (
					<SetAnalyticsTable setAnalyticsData={setAnalyticsData} />
				)}
			</div>
		</Layout>
	)
}

export default analytics
