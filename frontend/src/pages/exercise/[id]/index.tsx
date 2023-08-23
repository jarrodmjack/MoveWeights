import Layout from "@/components/layout/Layout"
import LoadingPageWithLogo from "@/components/loading/LoadingPageWithLogo"
import AddSetToExerciseTab from "@/components/tabs/AddSetToExerciseTab"
import ExerciseHistoryTab from "@/components/tabs/ExerciseHistoryTab"
import { WorkoutContext } from "@/context/WorkoutContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import { ActiveTab } from "@/types/ActiveTab"
import { Exercise, Set } from "@/types/Workout"
import { useRouter } from "next/router"
import React, { useState, useContext, useEffect, useCallback } from "react"
import { toast } from "react-hot-toast"

const index = () => {
	const [activeTab, setActiveTab] = useState(ActiveTab.EXERCISE)
	const [isLoading, setIsLoading] = useState(false)
	const [actionLoading, setActionLoading] = useState(false)
	const [exercise, setExercise] = useState<Exercise>()
	const { workout } = useContext(WorkoutContext)!
	const { user } = useAuthContext()
	const [exerciseSets, setExerciseSets] = useState<Set[]>([])
	const [selectedSetId, setSelectedSetId] = useState("")
	const [selectedSet, setSelectedSet] = useState<Set | null | undefined>(null)
	const router = useRouter()

	useEffect(() => {
		const fetchExerciseById = async () => {
			if (!user || !router.query.id) {
				return
			}
			try {
				setIsLoading(true)
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/exercise/${router.query.id}`,
					{
						method: "GET",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
					}
				)

				if (response.ok) {
					const data = await response.json()
					setExercise(data)
					setExerciseSets(data.sets)
				}
				setIsLoading(false)
			} catch (e) {
				toast.error(
					"There was an issue adding your set. Please try again"
				)
				setIsLoading(false)
			}
		}

		fetchExerciseById()
	}, [user, router])

	useEffect(() => {
		const getExerciseHistory = async () => {
			if (!user || !exercise) return
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/history/exercises/${exercise.name}`,
					{
						method: "GET",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
					}
				)
				const data = await response.json()
				console.log("data: ", data)
			} catch (e) {
				toast.error("There was an issue getting your exercise history")
			}
		}

		getExerciseHistory()
	}, [exercise])

	const handleAddSetToExercise = useCallback(
		async (setData: { weight: number; numOfReps: number }) => {
			try {
				setActionLoading(true)
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/exercise/add-set`,
					{
						method: "POST",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
						body: JSON.stringify({
							exerciseId: router.query.id,
							weight: setData.weight,
							numOfReps: setData.numOfReps,
						}),
					}
				)
				const data: Set = await response.json()
				setExerciseSets([...exerciseSets, data])
				setActionLoading(false)
				// For updating workout context
				let foundExercise = workout?.exercises.find(
					(exercise) => exercise._id === router.query.id
				)
				if (foundExercise) {
					foundExercise.sets.push(data)
				}
			} catch (e) {
				toast.error(
					"There was an issue adding the set. Please try again"
				)
				setActionLoading(false)
			}
		},
		[user, router, exerciseSets, workout]
	)

	const handleUpdateSet = useCallback(
		async (weight: number, reps: number) => {
			try {
				setActionLoading(true)
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/set/${selectedSetId}`,
					{
						method: "PUT",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
						body: JSON.stringify({
							weight: weight,
							reps: reps,
						}),
					}
				)
				const newSet: Set = await response.json()
				let oldSet = exerciseSets.find((set) => set._id === newSet._id)
				oldSet!.reps = newSet.reps
				oldSet!.weight = newSet.weight
				let foundExercise = workout?.exercises.find(
					(exercise) => exercise._id === router.query.id
				)
				if (foundExercise) {
					let oldSetInContext = foundExercise.sets.find(
						(set) => set._id === newSet._id
					)
					oldSetInContext!.reps = newSet.reps
					oldSetInContext!.weight = newSet.weight
				}
				setSelectedSetId("")
				setSelectedSet(null)
				setActionLoading(false)
			} catch (e) {
				toast.error(
					"There was an issue updating the set. Please try again"
				)
				setActionLoading(false)
			}
		},
		[exerciseSets, router, user, workout, selectedSetId]
	)

	const handleDeleteSetFromExercise = useCallback(async (setId: string) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/set/${setId}`,
				{
					method: "DELETE",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({ exerciseId: exercise?._id }),
				}
			)
			if (response.ok) {
				setExerciseSets([
					...exerciseSets.filter((set) => set._id !== setId),
				])
				setSelectedSet(null)
				setSelectedSetId("")
			}

			// For updating workout context
			let foundExercise = workout?.exercises.find(
				(exercise) => exercise._id === router.query.id
			)
			if (foundExercise) {
				foundExercise.sets = foundExercise.sets.filter(
					(set) => set._id !== setId
				)
			}
		} catch (e) {
			toast.error(
				"There was an issue deleting the set, please try again."
			)
		}
	}, [user, exerciseSets, workout, exercise, router])

	const handleSelectSet = useCallback((setId: string) => {
		if (selectedSetId === setId) {
			setSelectedSetId("")
			setSelectedSet(null)
		} else {
			setSelectedSetId(setId)
			setSelectedSet(exerciseSets.find((set) => set._id === setId))
		}
	}, [exerciseSets, selectedSetId])

	const tabs = {
		Exercise: {
			component: (
				<AddSetToExerciseTab
					actionLoading={actionLoading}
					selectedSet={selectedSet}
					handleAddSetToExercise={handleAddSetToExercise}
					handleUpdateSet={handleUpdateSet}
					handleDeleteSetFromExercise={handleDeleteSetFromExercise}
					exercise={exercise}
					exerciseSets={exerciseSets}
					handleSelectSet={handleSelectSet}
				/>
			),
		},
		History: {
			component: <ExerciseHistoryTab />,
		},
	}

	if (isLoading) {
		return <LoadingPageWithLogo />
	}

	return (
		<Layout>
			<div>
				<div className="flex justify-center gap-2">
					<span
						onClick={() => setActiveTab(ActiveTab.EXERCISE)}
						className={`text-primary-focus ${
							activeTab === ActiveTab.EXERCISE && "underline"
						}`}
					>
						Exercise
					</span>
					|
					<span
						onClick={() => setActiveTab(ActiveTab.HISTORY)}
						className={`text-primary-focus ${
							activeTab === ActiveTab.HISTORY && "underline"
						}`}
					>
						History
					</span>
				</div>
				{tabs[activeTab].component}
			</div>
		</Layout>
	)
}

export default index
