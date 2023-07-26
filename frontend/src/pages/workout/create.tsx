import AddExerciseToWorkoutForm from "@/components/form/AddExerciseToWorkoutForm"
import Layout from "@/components/layout/Layout"
import { WorkoutContext } from "@/context/WorkoutContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import { toast } from "react-hot-toast"

const create = () => {
	const { user } = useAuthContext()
	const router = useRouter()

	// const workout = useContext(WorkoutContext)
	const { fetchTodaysWorkout } = useContext(WorkoutContext)!

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
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/create-workout`,
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify(data),
				}
			)
			fetchTodaysWorkout()
			router.push("/")
		} catch (e) {
			toast.error(
				"There was an error creating the workout, please try again"
			)
			router.push("/")
		}
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
