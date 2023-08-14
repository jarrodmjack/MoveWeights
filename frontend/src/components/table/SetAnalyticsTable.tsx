import React, { useState } from "react"

type SetAnalyticsTableOwnProps = {
	setAnalyticsData: [string, { sets: number; percOfLifts: number }][]
}

const SetAnalyticsTable: React.FC<SetAnalyticsTableOwnProps> = ({
	setAnalyticsData,
}) => {

	return (
		<div className="overflow-x-auto">
			<table className="table">
				<thead>
					<tr>
						<th>Muscle Group</th>
						<th>Sets</th>
						<th>% of lifts</th>
					</tr>
				</thead>
				<tbody>
					{setAnalyticsData.map((entry, i) => (
						<tr key={i}>
							<td className="capitalize">{entry[0]}</td>
							<td>{entry[1].sets}</td>
							<td>{entry[1].percOfLifts}%</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default SetAnalyticsTable
