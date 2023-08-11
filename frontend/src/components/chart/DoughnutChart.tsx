// components/LineChart.js
import React from "react"
import { Doughnut } from "react-chartjs-2"
import { CategoryScale } from "chart.js"
import Chart from "chart.js/auto"

Chart.register(CategoryScale)

type AnalyticsDoughnutChartOwnProps = {
	setPercentages: Number[]
}

const AnalyticsDoughnutChart: React.FC<AnalyticsDoughnutChartOwnProps> = ({
	setPercentages,
}) => {
	console.log("in doughnut: ", setPercentages)

	const chartData = {
		labels: [],
		datasets: [
			{
				label: "My First Dataset",
				data: setPercentages,
				backgroundColor: [
					"#f51905",
					"#31f505",
					"#05f5e9",
					"#f5a905",
					"#7505f5",
					"#c807de",
				],
				hoverOffset: 4,
			},
		],
	}

	return (
		<div className="border flex justify-center">
			<div className="w-1/2">
				<Doughnut data={chartData} />
			</div>
		</div>
	)
}
export default AnalyticsDoughnutChart
