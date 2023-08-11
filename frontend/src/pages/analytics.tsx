import DoughnutChart from "@/components/chart/DoughnutChart"
import Layout from "@/components/layout/Layout"
import SetAnalyticsTable from "@/components/table/SetAnalyticsTable"
import { useAuthContext } from "@/hooks/useAuthContext"
import React, { useState, useEffect } from "react"

const analytics = () => {
	const testData = [26, 22, 17, 17, 9, 7]
	const { user } = useAuthContext()

	console.log(user)

	const [setPercentageData, setSetPercentageData] = useState({
		chest: {
			sets: 0,
		},
		back: {
			sets: 0,
		},
		shoulders: {
			sets: 0,
		},
		biceps: {
			sets: 0,
		},
		triceps: {
			sets: 0,
		},
		legs: {
			sets: 0,
		},
	})

	useEffect(() => {}, [user])

	return (
		<Layout>
			<div className="flex flex-col gap-8 p-4">
				<DoughnutChart setPercentages={testData} />
				<SetAnalyticsTable />
			</div>
		</Layout>
	)
}

export default analytics
