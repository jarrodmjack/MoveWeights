// components/LineChart.js
import React from "react"
import { Doughnut } from "react-chartjs-2"
import { CategoryScale } from "chart.js"
import Chart from "chart.js/auto"
import { analyticsChartColors } from "@/utils/analyticsChartColours"

Chart.register(CategoryScale)

type AnalyticsDoughnutChartOwnProps = {
	setCounts: Number[]
}

const AnalyticsDoughnutChart: React.FC<AnalyticsDoughnutChartOwnProps> = ({
	setCounts,
}) => {
	const chartData = {
		labels: [],
		datasets: [
			{
				label: "My First Dataset",
				data: setCounts,
				backgroundColor: analyticsChartColors,
				hoverOffset: 4,
			},
		],
	}

	return (
		<div className="flex justify-center">
			<div className="w-1/2 md:w-1/4">
				<Doughnut data={chartData} />
			</div>
		</div>
	)
}
export default AnalyticsDoughnutChart
