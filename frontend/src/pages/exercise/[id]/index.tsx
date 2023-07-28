import AddSetToExerciseForm from "@/components/form/AddSetToExerciseForm"
import Layout from "@/components/layout/Layout"
import LoadingPageWithLogo from "@/components/loading/LoadingPageWithLogo"
import { WorkoutContext } from "@/context/WorkoutContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import { Exercise, Set } from "@/types/Workout"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"

const index = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [exercise, setExercise] = useState<Exercise>()
	const { user } = useAuthContext()
	const [exerciseSets, setExerciseSets] = useState([])
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
				const data = await response.json()
				setExercise(data)
				setIsLoading(false)
			} catch (e) {
				console.log("e: ", e)
				setIsLoading(false)
			}
		}

		fetchExerciseById()
	}, [user, router])

	const handleAddSetToExercise = async (setData: {
		weight: number
		numOfReps: number
	}) => {
		// console.log("data: ", setData.reps)
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
		const data = await response.json()
		console.log("data: ", data)
	}

	// /exercise/add-set

	return (
		<Layout>
			<div className="flex flex-col gap-8 p-4">
				<h3 className="text-xl font-semibold">
					Add a set to {exercise?.name}
				</h3>
				<AddSetToExerciseForm handleSubmit={handleAddSetToExercise} />
				{exercise ? (
					<div>
						{exercise.sets.length > 0 &&
							exercise.sets.map((set: Set, i) => (
								<div
									className="flex border-b border-neutral-content justify-evenly"
									key={i}
								>
									<div className="flex gap-2 items-center">
										<p className="text-2xl font-bold">
											{set.weight}
										</p>
										<p className="text-neutral">lbs</p>
									</div>
									<div className="flex gap-2 items-center">
										<p className="text-2xl font-bold">
											{set.reps}
										</p>
										<p className="text-neutral">reps</p>
									</div>
								</div>
							))}
					</div>
				) : (
					<div>Loading...</div>
				)}
			</div>
		</Layout>
	)
}

export default index
