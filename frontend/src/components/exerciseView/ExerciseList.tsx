import { Exercise } from "@/types/Workout"
import React from "react"
import ExerciseCard from "./ExerciseCard"

type ExerciseListOwnProps = {
	exercises: Exercise[]
}

const ExerciseList: React.FC<ExerciseListOwnProps> = ({ exercises }) => {

	return (
		<div className="w-5/6 mx-auto flex flex-col gap-8 mb-20">
			{exercises.map((exercise, i) => (
				<ExerciseCard key={i} exercise={exercise} /> //change this key back to ID - changed to i because using dummy data
			))}
		</div>
	)
}

export default ExerciseList
