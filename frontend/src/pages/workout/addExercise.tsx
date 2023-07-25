import AddExerciseToWorkoutForm from "@/components/form/AddExerciseToWorkoutForm"
import Layout from "@/components/layout/Layout"
import { useAuthContext } from "@/hooks/useAuthContext"
import React from "react"

const addExercise = () => {

	const { user } = useAuthContext()

	const addExerciseToWorkout = () => {

	}

	return (
		<Layout>
			<div className="flex flex-col gap-8 p-4">
				<h3 className="text-xl font-semibold">
					Add an exercise to your current workout
				</h3>
				<AddExerciseToWorkoutForm handleSubmit={addExerciseToWorkout} />
			</div>
		</Layout>
	)
}

export default addExercise
