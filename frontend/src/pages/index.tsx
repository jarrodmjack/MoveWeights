import NewWorkoutButton from "@/components/button/NewWorkoutButton"
import Layout from "@/components/layout/Layout"
import { Workout } from "@/types/Workout"
import React, { useState } from "react"

const index = () => {
	const workout: Workout = {
		id: "1",
		date: new Date(),
		exercises: [
			{
				id: "blabla1",
        workoutId: "1",
				name: "Barbell Row",
				muscleGroup: "Back",
				sets: [
					{
						id: "1",
						weight: 100,
						reps: 10,
					},
				],
			},
		],
	}

	const [workouts, setWorkouts] = useState([workout])

  console.log(workouts)

	return (
		<Layout>
			<div className="border h-screen flex flex-col justify-end items-center">
				<div>
					<NewWorkoutButton text="New workout" />
				</div>
			</div>
		</Layout>
	)
}

export default index
