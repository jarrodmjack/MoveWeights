import React, { useState, useEffect } from "react"
import PrimaryBorderDivider from "../divider/PrimaryBorderDivider"
import { Set } from "@/types/Workout"
import LoadingDots from "../loading/LoadingDots"

type AddSetToExerciseFormOwnProps = {
	handleSubmit: (setData: { numOfReps: number; weight: number }) => void
	handleDeleteSet: (setId: string) => void
	selectedSet: Set | null | undefined
	isLoading: boolean
}

const AddSetToExerciseForm: React.FC<AddSetToExerciseFormOwnProps> = ({
	handleSubmit,
	selectedSet,
	handleDeleteSet,
	isLoading,
}) => {
	const [weight, setWeight] = useState(0)
	const [numOfReps, setNumOfReps] = useState(0)

	useEffect(() => {
		if (selectedSet) {
			setWeight(selectedSet.weight)
			setNumOfReps(selectedSet.reps)
		}
	}, [selectedSet])

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
			{selectedSet ? (
				<div className="flex">
					<button onClick={(e) => {
						e.preventDefault()
					}} className="btn bg-primary-focus text-white flex-1">

						Update
					</button>
					<button
						className="btn bg-danger text-white flex-1"
						onClick={(e) => {
							e.preventDefault()
							handleDeleteSet(selectedSet._id)
						}}
					>
						Delete
					</button>
				</div>
			) : (
				<button
					className="btn bg-primary-focus text-white flex-1"
					disabled={isLoading}
					onClick={(e) => {
						e.preventDefault()
						handleSubmit({
							numOfReps: numOfReps,
							weight: weight,
						})
					}}
				>
					{isLoading ? <LoadingDots /> : <span>+ Add</span>}
				</button>
			)}
		</form>
	)
}

export default AddSetToExerciseForm
