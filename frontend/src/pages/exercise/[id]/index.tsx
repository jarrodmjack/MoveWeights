import SetList from "@/components/exerciseView/SetList"
import AddSetToExerciseForm from "@/components/form/AddSetToExerciseForm"
import Layout from "@/components/layout/Layout"
import LoadingPageWithLogo from "@/components/loading/LoadingPageWithLogo"
import { WorkoutContext } from "@/context/WorkoutContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import { Exercise, Set } from "@/types/Workout"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const index = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [exercise, setExercise] = useState<Exercise>()
	const { workout } = useContext(WorkoutContext)!
	const { user } = useAuthContext()
	const [exerciseSets, setExerciseSets] = useState<Set[]>([])
	const router = useRouter()

	useEffect(() => {
		const fetchExerciseById = async () => {
			if (!user || !router.query.id) {
				return
			}
			try {
				setIsLoading(true)
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/exercise/${router.query.id}`,
					{
						method: "GET",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
					}
				)

				if (response.ok) {
					const data = await response.json()
					setExercise(data)
					setExerciseSets(data.sets)
				}
				setIsLoading(false)
			} catch (e) {
				toast.error(
					"There was an issue adding your set. Please try again"
				)
				setIsLoading(false)
			}
		}

		fetchExerciseById()
	}, [user, router])

	const handleAddSetToExercise = async (setData: {
		weight: number
		numOfReps: number
	}) => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/exercise/add-set`,
			{
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					exerciseId: router.query.id,
					weight: setData.weight,
					numOfReps: setData.numOfReps,
				}),
			}
		)
		const data: Set = await response.json()
		setExerciseSets([...exerciseSets, data])

		// For updating context
		let foundExercise = workout?.exercises.find(
			(exercise) => exercise._id === router.query.id
		)
		if (foundExercise) {
			foundExercise.sets.push(data)
		}
	}

	const handleDeleteSetFromExercise = async (setId: string) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/set/${setId}`,
				{
					method: "DELETE",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({ exerciseId: exercise?._id }),
				}
			)
			if (response.ok) {
				setExerciseSets([
					...exerciseSets.filter((set) => set._id !== setId),
				])
			}

			// For updating context
			let foundExercise = workout?.exercises.find(
				(exercise) => exercise._id === router.query.id
			)
			if (foundExercise) {
				foundExercise.sets = foundExercise.sets.filter(
					(set) => set._id !== setId
				)
			}
		} catch (e) {
			toast.error(
				"There was an issue deleting the set, please try again."
			)
		}
	}

	if (isLoading) {
		return <LoadingPageWithLogo />
	}

	return (
		<Layout>
			<div className="flex flex-col gap-8 p-4">
				<h3 className="text-xl font-semibold">
					Add a set to {exercise?.name}
				</h3>
				<AddSetToExerciseForm handleSubmit={handleAddSetToExercise} />
				{exerciseSets.length > 0 ? (
					<SetList
						handleDeleteSet={handleDeleteSetFromExercise}
						sets={exerciseSets}
					/>
				) : (
					<div className="flex justify-center">
						<h4>No sets have been added to this exercise</h4>
					</div>
				)}
			</div>
		</Layout>
	)
}

export default index
