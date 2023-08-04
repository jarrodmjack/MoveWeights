import React, { useState, useEffect } from "react"
import PrimaryBorderDivider from "../divider/PrimaryBorderDivider"
import { useAuthContext } from "@/hooks/useAuthContext"
import { toast } from "react-hot-toast"
import { useRouter } from "next/router"
import { globalExercises } from "@/utils/globalExercises"
import Select from "react-select"
import LoadingPageWithLogo from "../loading/LoadingPageWithLogo"
import LoadingDots from "../loading/LoadingDots"

type AddNewExerciseToWorkoutFormOwnProps = {
	handleSubmit: (data: {
		muscleGroup: string
		exerciseName: string
		numOfReps: number
		weight: number
	}) => void
	actionLoading: boolean
}

const AddExerciseToWorkoutForm: React.FC<
	AddNewExerciseToWorkoutFormOwnProps
> = ({ handleSubmit, actionLoading }) => {
	const { user } = useAuthContext()

	const [isLoading, setIsLoading] = useState(false)
	const [muscleGroup, setMuscleGroup] = useState<string>("")
	const [exerciseName, setExerciseName] = useState<string>("")
	const [weight, setWeight] = useState(0)
	const [numOfReps, setNumOfReps] = useState(0)
	const [userSpecificExercises, setUserSpecificExercises] = useState([])
	const [allExercises, setAllExercises] = useState(globalExercises)
	const router = useRouter()

	const handleSetExerciseName = (option: {
		label: string
		value: string
	}) => {
		setExerciseName(option.value)
	}

	useEffect(() => {
		const fetchMatchingExercises = async () => {
			if (!user) {
				return
			}
			try {
				setIsLoading(true)
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/exercises`,
					{
						method: "GET",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
					}
				)
				const data = await response.json()
				setUserSpecificExercises(data)
				setIsLoading(false)
			} catch (e) {
				toast.error("There was an error fetching your exercises")
				router.push("/")
				setIsLoading(false)
			}
		}
		fetchMatchingExercises()
	}, [user])

	const filterExercisesByMuscleGroup = (muscleGrp: string) => {
		const exercises = [...globalExercises, ...userSpecificExercises]
		const filteredExercises = exercises.filter(
			(exercise) => exercise.muscleGroup === muscleGrp
		)
		setAllExercises(filteredExercises)
	}

	if (isLoading) {
		return <LoadingPageWithLogo />
	}

	const options = allExercises.map((exercise, i) => {
		return { label: exercise.name, value: exercise.name }
	})

	return (
		<form className="flex flex-col gap-4 items-center p-4">
			<div className="flex flex-col w-full gap-4">
				<p className="font-semibold">Muscle group</p>
				<PrimaryBorderDivider />
				<select
					className="select select-bordered w-full max-w-xs self-center"
					onChange={(e) => {
						setMuscleGroup(e.target.value)
						setExerciseName("")
						filterExercisesByMuscleGroup(e.target.value)
					}}
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
					{/* <option value="cardio">Cardio</option>  <-- DISABLED FOR NOW */}
				</select>
			</div>
			<div className="flex flex-col w-full gap-4">
				<p className="font-semibold">Exercise</p>
				<PrimaryBorderDivider />
				<Select
					className="self-center w-full"
					isDisabled={muscleGroup ? false : true}
					options={options}
					onChange={handleSetExerciseName} //can ignore error coming from react-select
				/>
			</div>
			<div className="flex flex-col w-full gap-4">
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
					className="input input-bordered w-full max-w-xs self-center"
				/>
			</div>
			<div className="flex flex-col w-full gap-4">
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
					className="input input-bordered w-full max-w-xs self-center"
				/>
			</div>
			<button
				disabled={actionLoading}
				onClick={(e) => {
					e.preventDefault()
					if (!muscleGroup || !exerciseName) {
						toast.error(
							"Please select a muscle group and exercise name"
						)
						return
					}
					handleSubmit({
						muscleGroup,
						exerciseName,
						numOfReps,
						weight,
					})
				}}
				className="w-full py-4 bg-primary-focus rounded-lg text-white cursor-pointer"
			>
				{actionLoading ? <LoadingDots /> : <span>+ Add</span>}
			</button>
		</form>
	)
}

export default AddExerciseToWorkoutForm
