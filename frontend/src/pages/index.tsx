import NewWorkoutButton from "@/components/button/NewWorkoutButton"
import Layout from "@/components/layout/Layout"
import ExerciseList from "@/components/exerciseView/ExerciseList"
import { useAuthContext } from "@/hooks/useAuthContext"
import React, { useContext, useEffect } from "react"
import { WorkoutContext } from "@/context/WorkoutContext"

const index = () => {
	const { user } = useAuthContext()
	const { workout, fetchTodaysWorkout } = useContext(WorkoutContext)!

	const handleDeleteExercise = (exerciseId: string) => {
		console.log(
			workout?.exercises.filter(
				(exercise) => exercise._id !== "64d17c2aca3d71520653a031"
			)
		)
		// workout?.exercises = workout?.exercises.filter(exercise => exercise._id !== exerciseId)
		// workout?.exercises = workout?.exercises.filter(exercise => exercise._id !== exerciseId)
	}

	return (
		<Layout>
			<div className="flex flex-col mt-10">
				<div className="overflow-y-auto max-h-[700px] sm:max-h-[900px]">
					{workout ? (
						<>
							<h2 className="w-5/6 mx-auto mb-4 text-2xl">
								Today's workout
							</h2>
							<ExerciseList
								handleDeleteExercise={handleDeleteExercise}
								exercises={workout.exercises}
							/>
						</>
					) : (
						<div className="flex flex-col items-center gap-20">
							<p className="font-semibold text-xl">
								No workout recorded yet today.
							</p>
							<NewWorkoutButton text="New workout" />
						</div>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default index
