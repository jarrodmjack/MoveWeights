import Layout from "@/components/layout/Layout"
import AddSetToExerciseTab from "@/components/tabs/AddSetToExerciseTab"
import ExerciseHistoryTab from "@/components/tabs/ExerciseHistoryTab"
import { ActiveTab } from "@/types/ActiveTab"
import React, { useState } from "react"

const index = () => {
	const [activeTab, setActiveTab] = useState(ActiveTab.EXERCISE)

	const tabs = {
		Exercise: {
			component: <AddSetToExerciseTab />,
		},
		History: {
			component: <ExerciseHistoryTab />,
		},
	}

	return (
		<Layout>
			<div>
				<div className="flex justify-center gap-2">
					<span
						onClick={() => setActiveTab(ActiveTab.EXERCISE)}
						className={`text-primary-focus ${
							activeTab === ActiveTab.EXERCISE && "underline"
						}`}
					>
						Exercise
					</span>
					|
					<span
						onClick={() => setActiveTab(ActiveTab.HISTORY)}
						className={`text-primary-focus ${
							activeTab === ActiveTab.HISTORY && "underline"
						}`}
					>
						History
					</span>
				</div>
				{tabs[activeTab].component}
			</div>
		</Layout>
	)
}

export default index
