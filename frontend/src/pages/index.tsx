import NewWorkoutButton from "@/components/button/NewWorkoutButton"
import Layout from "@/components/layout/Layout"
import ExerciseList from "@/components/exerciseView/ExerciseList"
import { useAuthContext } from "@/hooks/useAuthContext"
import React, { useContext, useEffect } from "react"
import { WorkoutContext } from "@/context/WorkoutContext"

const index = () => {
	const { user } = useAuthContext()
	const { workout, fetchTodaysWorkout } = useContext(WorkoutContext)!

	useEffect(() => {
		const saveGeoLocationData = async () => {
			if (!user) {
				return
			}

			try {
				const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=bbd3d0696e0e4a1c8ceb4b72a639d2df`

				const geoResponse = await fetch(url)
				console.log("geo: ", geoResponse)
				const geoData = await geoResponse.json()
				console.log("geo data: ", geoData)

				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/geo`,
					{
						method: "POST",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
						body: JSON.stringify({geoData: geoData}),
					}
				)
				console.log("response: ", response)
			} catch (e) {
				console.log(e)
			}
		}
		saveGeoLocationData()
	}, [user])

	return (
		<Layout>
			<div className="flex flex-col mt-10">
				<div className="overflow-y-auto max-h-[700px] sm:max-h-[900px]">
					{workout ? (
						<>
							<h2 className="w-5/6 mx-auto mb-4 text-2xl">
								Today's workout
							</h2>
							<ExerciseList exercises={workout.exercises} />
						</>
					) : (
						<div className="flex flex-col items-center gap-20">
							<p className="font-semibold text-xl">
								No workout recorded yet today.
							</p>
							<NewWorkoutButton text="New workout" />
						</div>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default index
