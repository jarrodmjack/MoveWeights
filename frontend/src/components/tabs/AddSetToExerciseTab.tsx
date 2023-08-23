import AddSetToExerciseForm from "@/components/form/AddSetToExerciseForm"
import { Exercise, Set } from "@/types/Workout"
import React, { memo } from "react"

type AddSetToExerciseFormOwnProps = {
	actionLoading: boolean
	exercise: Exercise | undefined
	selectedSet: Set | null | undefined
	handleAddSetToExercise: any
	handleUpdateSet: any
	handleDeleteSetFromExercise: any
	exerciseSets: any
	handleSelectSet: any
}

const AddSetToExerciseTab: React.FC<AddSetToExerciseFormOwnProps> = ({
	actionLoading,
	exercise,
	selectedSet,
	handleAddSetToExercise,
	handleUpdateSet,
	handleDeleteSetFromExercise,
	exerciseSets,
	handleSelectSet,
}) => {
	console.log('render child')
	return (
		<div className="flex flex-col gap-8 p-4">
			<h3 className="text-xl font-semibold">
				Add a set to {exercise?.name}
			</h3>
			<AddSetToExerciseForm
				isLoading={actionLoading}
				selectedSet={selectedSet}
				handleSubmit={handleAddSetToExercise}
				handleUpdateSet={handleUpdateSet}
				handleDeleteSet={handleDeleteSetFromExercise}
				sets={exerciseSets}
				handleSelectSet={handleSelectSet}
			/>
		</div>
	)
}

export default memo(AddSetToExerciseTab)
