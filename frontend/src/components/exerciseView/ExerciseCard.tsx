import { Exercise } from "@/types/Workout"
import React from "react"

type ExerciseCardOwnProps = {
	exercise: Exercise
}

const ExerciseCard: React.FC<ExerciseCardOwnProps> = ({ exercise }) => {
	return (
		<div className="shadow border-1 border-primary-content p-4 font-bold flex flex-col gap-2">
			<h3>{exercise.name}</h3>
			<div className="border border-aqua w-full" />
			<div>
				{exercise.sets.map((set, idx) => (
					<div key={set.id} className="flex justify-between w-2/3">
						<p>
							{set.weight}{" "}
							<span className="font-normal">lbs</span>
						</p>
						<p>
							{set.reps} <span className="font-normal">reps</span>
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default ExerciseCard
