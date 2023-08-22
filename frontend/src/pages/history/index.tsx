import WorkoutHistoryList from "@/components/history/WorkoutHistoryList"
import Layout from "@/components/layout/Layout"
import React from "react"

const index = () => {
	return (
		<Layout>
			<div className="border flex justify-center">
				<WorkoutHistoryList />
			</div>
		</Layout>
	)
}

export default index
