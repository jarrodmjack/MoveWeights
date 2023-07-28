import React, { useState } from "react"
import PrimaryBorderDivider from "../divider/PrimaryBorderDivider"

type AddSetToExerciseFormOwnProps = {
	handleSubmit: (setData: {numOfReps: number, weight: number}) => void
}

const AddSetToExerciseForm: React.FC<AddSetToExerciseFormOwnProps> = ({
	handleSubmit,
}) => {
	const [weight, setWeight] = useState(0)
	const [numOfReps, setNumOfReps] = useState(0)

	return (
		<form className="flex flex-col gap-4">
			<div className="flex flex-col w-full gap-2">
				<p className="font-semibold">Weight</p>
				<PrimaryBorderDivider />
				<input
					pattern="[0-9]*"
					onChange={(e) =>
						setWeight(
							parseInt(e.target.value) && parseInt(e.target.value)
						)
					}
					value={weight}
					type="number"
					maxLength={4}
					required
					className="input input-bordered w-1/2 self-center"
				/>
			</div>
			<div className="flex flex-col w-full gap-2">
				<p className="font-semibold">Reps</p>
				<PrimaryBorderDivider />
				<input
					pattern="[0-9]*"
					onChange={(e) =>
						setNumOfReps(
							parseInt(e.target.value) && parseInt(e.target.value)
						)
					}
					value={numOfReps}
					type="number"
					maxLength={4}
					required
					className="input input-bordered w-1/2 self-center"
				/>
			</div>
			<button onClick={(e) => {
                e.preventDefault()
                handleSubmit({numOfReps: numOfReps, weight: weight})
            }}>test</button>
		</form>
	)
}

export default AddSetToExerciseForm
