import AddExerciseToWorkoutForm from "@/components/form/AddExerciseToWorkoutForm"
import Layout from "@/components/layout/Layout"
import { WorkoutContext } from "@/context/WorkoutContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useRouter } from "next/router"
import React, { useEffect, useState, useContext } from "react"
import { toast } from "react-hot-toast"

const AddExercise = () => {
	const router = useRouter()
	const { user } = useAuthContext()
	const { workout } = useContext(WorkoutContext)!
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {}, [router])

	const handleAddExerciseToWorkout = async (data: {
		muscleGroup: string
		exerciseName: string
		numOfReps: number
		weight: number
	}) => {
		try {
			setIsLoading(true)
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/workout/${router.query.id}/add-exercise`,
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
			router.push(`/exercise/${newExercise._id}`)
			setIsLoading(false)
		} catch (e) {
			setIsLoading(false)
			toast.error(
				"There was an issue adding your exercise. Please try again"
			)
		}
	}

	return (
		<Layout>
			<div className="flex flex-col gap-8 p-4">
				<AddExerciseToWorkoutForm
          actionLoading={isLoading}
					handleSubmit={handleAddExerciseToWorkout}
				/>
			</div>
		</Layout>
	)
}

export default AddExercise
