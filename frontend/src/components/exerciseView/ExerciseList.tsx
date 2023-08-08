import { Exercise } from "@/types/Workout"
import React, { useState } from "react"
import Modal from "react-modal"
import ExerciseCard from "./ExerciseCard"
import { FaTimes, FaTimesCircle } from "react-icons/fa"

type ExerciseListOwnProps = {
	exercises: Exercise[]
	handleDeleteExercise: (exerciseId: string) => void
}

const ExerciseList: React.FC<ExerciseListOwnProps> = ({
	exercises,
	handleDeleteExercise,
}) => {
	const [modalIsOpen, setIsOpen] = React.useState(false)
	const [selectedExerciseId, setSelectedExerciseId] = useState("")
	function openModal() {
		setIsOpen(true)
	}

	function closeModal() {
		setSelectedExerciseId("")
		setIsOpen(false)
	}

	if (!exercises || exercises.length === 0) {
		return <>No exercises have been added to todays workout</>
	}

	return (
		<div className="w-5/6 mx-auto flex flex-col gap-8 mb-20">
			<Modal
				ariaHideApp={false}
				isOpen={modalIsOpen}
				style={{
					content: {
						width: "100%",
						top: "50%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%, -50%)",
					},
				}}
				onRequestClose={closeModal}
				contentLabel="Example Modal"
			>
				<button
					className="absolute top-2 right-2 cursor-pointer"
					onClick={closeModal}
				>
					<FaTimes className="scale-125" />
				</button>
				<div className="flex flex-col items-center gap-4 px-4">
					<p className="text-center">
						Are you sure you want to delete this exercise?
					</p>
					<div>
						<button
							onClick={(e) => handleDeleteExercise(selectedExerciseId)}
							className="btn bg-danger text-white"
						>
							Delete
						</button>
					</div>
				</div>
			</Modal>
			{exercises.map((exercise, i) => (
				<div key={exercise._id} className="flex gap-2">
					<ExerciseCard exercise={exercise} />
					<FaTimesCircle
						className="text-danger scale-125"
						onClick={(e) => {
							e.stopPropagation()
							setSelectedExerciseId(exercise._id)
							openModal()
						}}
					/>
				</div>
			))}
		</div>
	)
}

export default ExerciseList
