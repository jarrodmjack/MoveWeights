import React, { useState } from "react"

const SetAnalyticsTable = () => {

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
					<tr>
						<td>Chest</td>
						<td>24 sets</td>
						<td>15%</td>
					</tr>
					<tr>
						<td>Back</td>
						<td>37 sets</td>
						<td>19%</td>
					</tr>
					<tr>
						<td>Shoulders</td>
						<td>37 sets</td>
						<td>19%</td>
					</tr>
					<tr>
						<td>Biceps</td>
						<td>37 sets</td>
						<td>19%</td>
					</tr>
					<tr>
						<td>Triceps</td>
						<td>37 sets</td>
						<td>19%</td>
					</tr>
					<tr>
						<td>Legs</td>
						<td>37 sets</td>
						<td>19%</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default SetAnalyticsTable
