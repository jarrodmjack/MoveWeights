import { Exercise } from "@/types/Workout"
import Link from "next/link"
import React from "react"
import { FaPlus } from "react-icons/fa"

type ExerciseCardOwnProps = {
	exercise: Exercise
}

const ExerciseCard: React.FC<ExerciseCardOwnProps> = ({ exercise }) => {
	if (exercise.sets.length === 0) {
		return (
			<Link className="flex-1" href={`/exercise/${exercise._id}`}>
				<div className="shadow border-1 border-primary-content p-4 font-bold flex flex-col gap-2 w-full">
					<h3>{exercise.name}</h3>
					<div className="border border-primary-focus w-full" />
					<p className="flex items-center gap-2">
						No sets have been added{" "}
						<FaPlus className="text-primary-focus" />
					</p>
				</div>
			</Link>
		)
	}

	return (
		<Link className="flex-1" href={`/exercise/${exercise._id}`}>
			<div className="shadow border-1 border-primary-content p-4 font-bold flex flex-col gap-2">
				<h3>{exercise.name}</h3>
				<div className="border border-primary w-full" />
				<div>
					{exercise.sets.map((set, idx) => (
						<div key={idx} className="flex justify-between w-2/3">
							<p>
								{set.weight}{" "}
								<span className="font-normal">lbs</span>
							</p>
							<p>
								{set.reps}{" "}
								<span className="font-normal">reps</span>
							</p>
						</div>
					))}
				</div>
			</div>
		</Link>
	)
}

export default ExerciseCard
