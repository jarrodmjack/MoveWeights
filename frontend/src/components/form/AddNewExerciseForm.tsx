import React, { useState } from "react"

type AddNewExerciseFormOwnProps = {
	handleSubmit: (data: { muscleGroup: string; exerciseName: string }) => void
}

const AddNewExerciseForm: React.FC<AddNewExerciseFormOwnProps> = ({
	handleSubmit,
}) => {
	const [muscleGroup, setMuscleGroup] = useState<string>("")
	const [exerciseName, setExerciseName] = useState<string>("")

	return (
		<form className="flex flex-col gap-4 items-center py-4 px-5">
			<select
				className="select select-bordered w-full max-w-xs"
				onChange={(e) => setMuscleGroup(e.target.value)}
			>
				<option disabled selected>
					Select a muscle group
				</option>
				<option value="abs">Abs</option>
				<option value="back">Back</option>
				<option value="biceps">Biceps</option>
				<option value="chest">Chest</option>
				<option value="legs">Legs</option>
				<option value="shoulders">Shoulders</option>
				<option value="triceps">Triceps</option>
				<option value="cardio">Cardio</option>
			</select>
			<input
				onChange={(e) => setExerciseName(e.target.value)}
				value={exerciseName}
				type="text"
				required
				placeholder="Enter exercise name"
				className="input input-bordered w-full max-w-xs"
			/>
			<button
				onClick={(e) => {
					e.preventDefault()
					handleSubmit({ muscleGroup, exerciseName })
				}}
				className="w-full py-4 bg-primary-focus rounded-lg text-white cursor-pointer"
			>
				Submit
			</button>
		</form>
	)
}

export default AddNewExerciseForm
