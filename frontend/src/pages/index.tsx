import NewWorkoutButton from "@/components/button/NewWorkoutButton"
import Layout from "@/components/layout/Layout"
import ExerciseList from "@/components/exerciseView/ExerciseList"
import { useAuthContext } from "@/hooks/useAuthContext"
import { Workout } from "@/types/Workout"
import { isSameDay } from "@/utils/checkIfSameDay"
import React, { useState } from "react"
import { testWorkouts } from "@/utils/testData"

const index = () => {
	const { user } = useAuthContext()

	console.log(testWorkouts)
	const [workouts, setWorkouts] = useState<Workout[]>([])
	const todaysWorkout = workouts.filter((item, i) =>
		isSameDay(item.date, new Date())
	)

	return (
		<Layout>
			<div className="flex flex-col mt-10">
				<div className="overflow-y-auto max-h-[700px] sm:max-h-[900px]">
					{todaysWorkout.length > 0 ? (
						<>
							<h2 className="w-5/6 mx-auto mb-4 text-2xl">Today's workout</h2>
							<ExerciseList exercises={todaysWorkout[0].exercises} />
						</>
					) : (
						<div className="flex flex-col items-center gap-20">
							<p className="font-semibold text-xl">No workout recorded yet today.</p>
							<NewWorkoutButton text="New workout" />
						</div>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default index
