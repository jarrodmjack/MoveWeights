import AddExerciseToWorkoutForm from "@/components/form/AddExerciseToWorkoutForm"
import Layout from "@/components/layout/Layout"
import { useAuthContext } from "@/hooks/useAuthContext"
import React from "react"
import { toast } from "react-hot-toast"

const create = () => {
	const { user } = useAuthContext()

	const createWorkout = async (data: {
		muscleGroup: string
		exerciseName: string
		numOfReps: number
		weight: number
	}) => {
		if (!user) {
			toast.error("There was an error with user")
			return
		}

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/create-workout`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify(data),
			})
			const resData = await response.json()
			console.log('data: ', resData)
		} catch (e) {
			toast.error("error")
		}

		// console.log('response: ', response)
		// const resData = await response.json()
		// console.log('data: ', resData)
	}

	return (
		<Layout>
			<div className="flex flex-col gap-8 p-4">
				<h3 className="text-xl font-semibold">
					Add an exercise to the new workout
				</h3>
				<AddExerciseToWorkoutForm handleSubmit={createWorkout} />
			</div>
		</Layout>
	)
}

export default create
