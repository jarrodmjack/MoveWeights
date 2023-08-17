import AddExerciseToWorkoutForm from "@/components/form/AddExerciseToWorkoutForm"
import Layout from "@/components/layout/Layout"
import { WorkoutContext } from "@/context/WorkoutContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { toast } from "react-hot-toast"

const create = () => {
	const { user } = useAuthContext()
	const router = useRouter()
	const { workout, fetchTodaysWorkout, isLoading } =
		useContext(WorkoutContext)!
	const [actionLoading, setActionLoading] = useState(false)

	const createWorkout = async (data: {
		tzOffset: number
		muscleGroup: string
		exerciseName: string
		numOfReps: number
		weight: number
	}) => {
		if (!user) {
			toast.error("There was an error with user")
			return
		} else if (data.exerciseName.length === 0) {
			toast.error(
				`Please select an exercise under the ${data.muscleGroup} category.`
			)
			return
		}
		setActionLoading(true)

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
			const newExercise = await response.json()
			workout?.exercises.push(newExercise)
			fetchTodaysWorkout()
			router.push(`/exercise/${newExercise._id}`)
			setActionLoading(false)
		} catch (e) {
			toast.error(
				"There was an error creating the workout, please try again"
			)
			setActionLoading(false)
			router.push("/")
		}
	}

	if (isLoading) {
		return <></>
	}

	return (
		<Layout>
			<div className="flex flex-col gap-8 p-4">
				<p className="text-2xl font-semibold text-center">
					Add the first exercise to your workout
				</p>
				<AddExerciseToWorkoutForm
					actionLoading={actionLoading}
					handleSubmit={createWorkout}
				/>
			</div>
		</Layout>
	)
}

export default create
