import React, { useState, useEffect } from "react"
import PrimaryBorderDivider from "../divider/PrimaryBorderDivider"
import { Set } from "@/types/Workout"
import LoadingDots from "../loading/LoadingDots"

type AddSetToExerciseFormOwnProps = {
	selectedSet: Set | null | undefined
	isLoading: boolean
	handleSubmit: (setData: { numOfReps: number; weight: number }) => void
	handleDeleteSet: (setId: string) => void
	handleUpdateSet: (weight: number, reps: number) => void
}

const AddSetToExerciseForm: React.FC<AddSetToExerciseFormOwnProps> = ({
	selectedSet,
	isLoading,
	handleSubmit,
	handleUpdateSet,
	handleDeleteSet,
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
					className="input input-bordered w-1/2 self-center text-2xl text-center"
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
					className="input input-bordered w-1/2 self-center text-2xl text-center"
				/>
			</div>
			{selectedSet ? (
				<div className="flex">
					<button
						disabled={isLoading}
						onClick={(e) => {
							e.preventDefault()
							handleUpdateSet(weight, numOfReps)
						}}
						className="btn bg-primary-focus text-white flex-1"
					>
						{isLoading ? <LoadingDots /> : <span>Update</span>}
					</button>
					<button
						disabled={isLoading}
						className="btn bg-danger text-white flex-1"
						onClick={(e) => {
							e.preventDefault()
							handleDeleteSet(selectedSet._id)
						}}
					>
						{isLoading ? <LoadingDots /> : <span>Delete</span>}
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
