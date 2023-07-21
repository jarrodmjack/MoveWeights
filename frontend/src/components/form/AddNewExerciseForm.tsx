import React, { useState } from "react"

const AddNewExerciseForm = () => {
	const [muscleGroup, setMuscleGroup] = useState<string>("")

	return (
		<form>
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
            <input type="text" required placeholder="Enter exercise name" className="input input-bordered w-full max-w-xs" />
		</form>
	)
}

export default AddNewExerciseForm
