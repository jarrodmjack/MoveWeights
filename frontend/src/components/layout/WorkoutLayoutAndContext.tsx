import React, { PropsWithChildren, useEffect, useState } from "react"
import { WorkoutContext } from "@/context/WorkoutContext"
import { Exercise, Workout } from "@/types/Workout"
import { useAuthContext } from "@/hooks/useAuthContext"
import LoadingPageWithLogo from "../loading/LoadingPageWithLogo"
import { useRouter } from "next/router"
import { useLogout } from "@/hooks/useLogout"

const WorkoutLayoutAndContext: React.FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuthContext()

	const [workout, setWorkout] = useState<Workout | undefined>(undefined)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const { logout } = useLogout()

	const fetchTodaysWorkout = async () => {
		if (!user) {
			return
		}

		try {
			setIsLoading(true)
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/todaysWorkout`,
				{
					method: "GET",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
				}
			)

			if (!response.ok) {
				setWorkout(undefined)
				logout()
			} else {
				const data = await response.json()
				setWorkout(data)
			}

			setIsLoading(false)
		} catch (e) {
			setWorkout(undefined)
			setIsLoading(false)
		}
	}

	const updateExercises = (updatedExercises: Exercise[]) => {
		setWorkout((prev) => {
			if (prev) {
				return { ...prev, exercises: updatedExercises }
			}
			return prev
		})
	}

	useEffect(() => {
		fetchTodaysWorkout()
	}, [user])

	if (isLoading) {
		return <LoadingPageWithLogo />
	}

	return (
		<WorkoutContext.Provider
			value={{ workout, isLoading, fetchTodaysWorkout, updateExercises }}
		>
			{children}
		</WorkoutContext.Provider>
	)
}

export default WorkoutLayoutAndContext
