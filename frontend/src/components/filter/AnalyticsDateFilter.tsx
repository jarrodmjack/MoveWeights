import React, { useState } from "react"

type AnalyticsDateFilterOwnProps = {
	handleClick: (timePeriod: Date | null) => void
}

const AnalyticsDateFilter: React.FC<AnalyticsDateFilterOwnProps> = ({
	handleClick,
}) => {
	const [activeTab, setActiveTab] = useState<any>({
		text: "1 Week",
		value: new Date(Date.now() - 604800000),
	})

	const filterTabs = [
		{
			text: "1 Week",
			value: new Date(Date.now() - 604800000),
		},
		{
			text: "1 Month",
			value: new Date(Date.now() - 2628000000),
		},
		{
			text: "All time",
			value: null,
		},
	]

	return (
		<div className="flex justify-center">
			<div className="tabs tabs-boxed w-fit">
				{filterTabs.map(({ text, value }, i) => (
					<a
						key={text}
						onClick={() => {
							setActiveTab(
								filterTabs.find((tab) => tab.text === text)
							)
							handleClick(value)
						}}
						className={`tab ${
							text === activeTab.text &&
							"bg-primary-focus text-white transition ease-in-out"
						}`}
					>
						{text}
					</a>
				))}
				{/* <a className="tab">Tab 1</a>
			<a className="tab">Tab 2</a>
			<a className="tab">Tab 3</a> */}
			</div>
		</div>
	)
}

export default AnalyticsDateFilter
