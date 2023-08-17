import { analyticsChartColors } from "@/utils/analyticsChartColours"
import React, { useState } from "react"

type SetAnalyticsTableOwnProps = {
	setAnalyticsData: [string, { sets: number; percOfLifts: number }][]
}

const SetAnalyticsTable: React.FC<SetAnalyticsTableOwnProps> = ({
	setAnalyticsData,
}) => {
	return (
		<div className="overflow-x-auto mb-20 flex md:justify-center">
			<table className="table md:w-1/2">
				<thead>
					<tr className="flex">
						<th className="flex-1">Muscle Group</th>
						<th className="flex-1 text-center">Sets</th>
						<th className="flex-1 text-right">% of lifts</th>
					</tr>
				</thead>
				<tbody>
					{setAnalyticsData.map((entry, i) => (
						<tr key={i} className="flex">
						<td
							className={`capitalize flex-1`}
							style={{ color: analyticsChartColors[i] }}
						>
							{entry[0]}
						</td>
						<td className="flex-1 text-center">{entry[1].sets}</td>
						<td className="flex-1 text-right">{entry[1].percOfLifts}%</td>
					</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default SetAnalyticsTable
