import Layout from "@/components/layout/Layout"
import LoadingPageWithLogo from "@/components/loading/LoadingPageWithLogo"
import { WorkoutContext } from "@/context/WorkoutContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import { Exercise, Set } from "@/types/Workout"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"

const index = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [exercise, setExercise] = useState<Exercise | undefined>(undefined)
	const { user } = useAuthContext()
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

	console.log(exercise)

	return (
		<Layout>
			{exercise ? (
				<div>
					{exercise.sets.length > 0 &&
						exercise.sets.map((set: Set, i) => (
							<div>
								<p>{set.weight}</p>
								<p>{set.reps}</p>
							</div>
						))}
				</div>
			) : (
				<div>Loading...</div>
			)}
		</Layout>
	)
}

export default index
