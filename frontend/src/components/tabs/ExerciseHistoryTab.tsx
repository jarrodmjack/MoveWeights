import { Exercise } from "@/types/Workout"
import React from "react"

type ExerciseHistoryTabOwnProps = {
	exercises: Exercise[]
	exerciseName: string | undefined
}

const ExerciseHistoryTab: React.FC<ExerciseHistoryTabOwnProps> = ({
	exerciseName,
	exercises,
}) => {
	if (exercises.length === 0) {
		return (
			<div className="flex flex-col gap-8 p-4">
				No history exists for this exercise
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-8 p-4">
			<h3 className="text-xl font-semibold md:text-center">Workout history for {exerciseName}</h3>
			{exercises.map((exercise) => {
				const exerciseDate = new Date(exercise.createdAt)

				return (
					<div key={exercise._id} className="border-1 border-primary-content p-4 font-bold flex flex-col gap-2">
						<h3>{exerciseDate.toDateString()}</h3>
						<div className="border border-primary w-full" />
						<div>
							{exercise.sets.map((set, idx) => (
								<div
									key={set._id}
									className="flex justify-between w-2/3"
								>
									<p>
										{set.weight}{" "}
										<span className="font-normal">lbs</span>
									</p>
									<p>
										{set.reps}{" "}
										<span className="font-normal">
											reps
										</span>
									</p>
								</div>
							))}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default ExerciseHistoryTab
