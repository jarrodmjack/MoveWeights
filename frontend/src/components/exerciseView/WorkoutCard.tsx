import { Workout } from "@/types/Workout"
import React from "react"
import ExerciseCard from "./ExerciseCard"

type WorkoutCardOwnProps = {
	workout: Workout
}

const WorkoutCard: React.FC<WorkoutCardOwnProps> = ({ workout }) => {
	const date = new Date(workout.createdAt)

	return (
		<div>
			<h2 className="text-xl font-semibold">{date.toDateString()}</h2>
            {workout.exercises.map((exercise) => (
                <div key={exercise._id}></div>
            ))}
		</div>
	)
}

export default WorkoutCard
