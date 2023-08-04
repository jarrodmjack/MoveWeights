import React, { PropsWithChildren, useEffect, useState } from "react"
import { WorkoutContext } from "@/context/WorkoutContext"
import { Workout } from "@/types/Workout"
import { useAuthContext } from "@/hooks/useAuthContext"
import LoadingPageWithLogo from "../loading/LoadingPageWithLogo"

const WorkoutLayoutAndContext: React.FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuthContext()

	const [workout, setWorkout] = useState<Workout | undefined>(undefined)
	const [isLoading, setIsLoading] = useState(false)

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

	useEffect(() => {
		fetchTodaysWorkout()
	}, [user])

	if (isLoading) {
		return <LoadingPageWithLogo />
	}

	return (
		<WorkoutContext.Provider value={{ workout, fetchTodaysWorkout }}>
			{children}
		</WorkoutContext.Provider>
	)
}

export default WorkoutLayoutAndContext
