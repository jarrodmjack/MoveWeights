import { Workout } from "@/types/Workout"
import React from "react"
import ExerciseCard from "../exerciseView/ExerciseCard"

type WorkoutsCarouselOwnProps = {
	workouts: Workout[]
}

const WorkoutsCarousel: React.FC<WorkoutsCarouselOwnProps> = ({ workouts }) => {
	return (
		<div className="carousel w-full">
			{workouts.map((workout, i) => (
				<div
					key={workout.id}
					className="w-full carousel-item relative flex flex-col"
					id={`slide${i + 1}`}
				>
					<div className="w-5/6 mx-auto flex flex-col gap-8 mt-20">
						{workout.exercises.map((exercise, i) => (
							<ExerciseCard
								key={i}
								exercise={exercise}
							/>
						))}
					</div>
					{/* <ExerciseCard /> */}
					<div className="absolute top-0 w-full border-2 flex justify-between">
						<a href={`#slide${i}`} className="btn btn-circle">
							❮
						</a>
						<a href={`#slide${i + 2}`} className="btn btn-circle">
							❯
						</a>
					</div>
				</div>
			))}
		</div>
	)
}

export default WorkoutsCarousel
