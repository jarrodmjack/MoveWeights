import DoughnutChart from "@/components/chart/DoughnutChart"
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
	const [activeFilterTab, setActiveFilterTab] = useState("All time")

	useEffect(() => {
		fetchSetAnalytics()
	}, [])

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

			if (response.ok) {
				const data = await response.json()
				setSetCounts(data.setPercentageList)
				setSetAnalyticsData(data.setEntries)
			}
			setIsLoading(false)
		} catch (e) {
			toast.error(
				"There was an issue getting your analytics. Please reload the page and try again."
			)
			setIsLoading(false)
		}
	}

	const fetchSetAnalyticsPastWeek = async () => {
		console.log("HIT FETCH PAST WEEK")
		try {
			setIsLoading(true)
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/sets/week`,
				{
					method: "GET",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
				}
			)

			const data = await response.json()

			setSetCounts(data.setPercentageList)
			setSetAnalyticsData(data.setEntries)
			setIsLoading(false)
		} catch (e) {
			toast.error(
				"There was an issue getting your analytics. Please reload the page and try again."
			)
			setIsLoading(false)
		}
	}

	const fetchSetAnalyticsPastMonth = async () => {
		try {
			setIsLoading(true)
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/sets/month`,
				{
					method: "GET",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
				}
			)

			const data = await response.json()
			setSetCounts(data.setPercentageList)
			setSetAnalyticsData(data.setEntries)
			setIsLoading(false)
		} catch (e) {
			toast.error(
				"There was an issue getting your analytics. Please reload the page and try again."
			)
			setIsLoading(false)
		}
	}

	if (isLoading) {
		return <LoadingPageWithLogo />
	}

	const filterTabs = [
		{
			text: "All time",
			filterFn: fetchSetAnalytics,
		},
		{
			text: "1 Week",
			filterFn: fetchSetAnalyticsPastWeek,
		},
		{
			text: "1 Month",
			filterFn: fetchSetAnalyticsPastMonth,
		},
	]

	return (
		<Layout>
			<div className="flex flex-col gap-8 p-4 justify-center">
				<div className="flex justify-center">
					<div className="tabs tabs-boxed w-fit">
						{filterTabs.map(({ text, filterFn }, i) => (
							<a
								key={text}
								onClick={() => {
									setActiveFilterTab(text)
									if (activeFilterTab !== text) {
										filterFn()
									}
								}}
								className={`tab ${
									text === activeFilterTab &&
									"bg-primary-focus text-white transition ease-in-out"
								}`}
							>
								{text}
							</a>
						))}
					</div>
				</div>
				<DoughnutChart setCounts={setCounts} />
				{setAnalyticsData && (
					<SetAnalyticsTable setAnalyticsData={setAnalyticsData} />
				)}
			</div>
		</Layout>
	)
}

export default analytics
