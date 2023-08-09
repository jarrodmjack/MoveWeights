import { Exercise } from "@/types/Workout"
import React, { useContext, useEffect, useState } from "react"
import Modal from "react-modal"
import ExerciseCard from "./ExerciseCard"
import { FaTimes, FaTimesCircle, FaPlus } from "react-icons/fa"
import { WorkoutContext } from "@/context/WorkoutContext"
import Link from "next/link"
import { useAuthContext } from "@/hooks/useAuthContext"
import { toast } from "react-hot-toast"

const ExerciseList = () => {
	const { workout, updateExercises } = useContext(WorkoutContext)!
	const [modalIsOpen, setIsOpen] = React.useState(false)
	const [selectedExerciseId, setSelectedExerciseId] = useState("")
	const [exercises, setExercises] = useState<Exercise[]>()
	const { user } = useAuthContext()

	useEffect(() => {
		setExercises(workout?.exercises)
	}, [workout])

	const handleDeleteExercise = async (exerciseId: string) => {
		try {
			const newExerciseList = exercises?.filter(
				(exercise) => exercise._id !== exerciseId
			)
			setExercises(newExerciseList)
			updateExercises(newExerciseList || [])
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/exercise/${exerciseId}/delete`,
				{
					method: "DELETE",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({ exerciseId }),
				}
			)
		} catch (e) {
			console.error(e)
			toast.error(
				"There was an issue deleting the exercise. Please try again"
			)
		}
	}

	function openModal() {
		setIsOpen(true)
	}

	function closeModal() {
		setSelectedExerciseId("")
		setIsOpen(false)
	}

	if (!exercises || exercises.length === 0) {
		return (
			<div className="w-5/6 mx-auto flex flex-col gap-8 mb-20">
				<div className="flex flex-col items-center gap-4 mt-10">
					<p>Add an exercise</p>
					<Link href={`/workout/${workout?._id}/addExercise`}>
						<FaPlus className="text-primary hover:text-primary-focus cursor-pointer scale-150" />
					</Link>
				</div>
			</div>
		)
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
							onClick={(e) => {
								handleDeleteExercise(selectedExerciseId)
								closeModal()
							}}
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
