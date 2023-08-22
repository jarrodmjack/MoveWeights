import { useAuthContext } from "@/hooks/useAuthContext"
import { Workout } from "@/types/Workout"
import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import WorkoutCard from "../exerciseView/WorkoutCard"
import LoadingSpinner from "../loading/LoadingSpinner"

const WorkoutHistoryList = () => {
	const [workouts, setWorkouts] = useState<Workout[]>()
	const [isLoading, setIsLoading] = useState(true)
	const { user } = useAuthContext()

	useEffect(() => {
		const fetchWorkoutHistory = async () => {
			if (!user) return

			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/history/workouts/all`,
					{
						method: "GET",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
					}
				)
				console.log("response: ", response)
				const data = await response.json()
				setWorkouts(data)
				setIsLoading(false)
			} catch (e) {
				setIsLoading(false)
				toast.error("There was an issue getting your workout history")
			}
		}
		fetchWorkoutHistory()
	}, [])

	if (isLoading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<LoadingSpinner />
			</div>
		)
	}

	return (
		<div>
			{workouts &&
				workouts.length > 0 &&
				workouts?.map((workout) => (
					<WorkoutCard key={workout._id} workout={workout} />
				))}
		</div>
	)
}

export default WorkoutHistoryList
