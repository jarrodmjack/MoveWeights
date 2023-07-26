import React, { PropsWithChildren, useEffect, useState } from "react"
import { WorkoutContext } from "@/context/WorkoutContext"
import { Workout } from "@/types/Workout"
import { useAuthContext } from "@/hooks/useAuthContext"
import { toast } from "react-hot-toast"

const WorkoutLayoutAndContext: React.FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuthContext()

	const [workout, setWorkout] = useState<Workout | undefined>(undefined)

	useEffect(() => {
		const fetchTodaysWorkout = async () => {
			if (!user) {
				return
			}

			try {
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
				const data = await response.json()
				setWorkout(data)
			} catch (e) {
				setWorkout(undefined)
			}
		}
		fetchTodaysWorkout()
	}, [user])

	return (
		<WorkoutContext.Provider value={workout}>
			{children}
		</WorkoutContext.Provider>
	)
}

export default WorkoutLayoutAndContext
