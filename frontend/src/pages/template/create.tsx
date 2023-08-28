import Layout from "@/components/layout/Layout"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useRouter } from "next/router"
import React, { useState, useContext } from "react"
import { toast } from "react-hot-toast"
import { globalExercises } from "@/utils/globalExercises"
import { WorkoutContext } from "@/context/WorkoutContext"

const create = () => {
	const { user } = useAuthContext()
	const { workout } = useContext(WorkoutContext)!
	const router = useRouter()

	const [template, setTemplate] = useState<{
		templateName: string
		templateExercises: { exerciseName: string; muscleGroup: string }[]
	}>({
		templateName: "",
		templateExercises: [],
	})
	const [templateExercise, setTemplateExercise] = useState<{
		exerciseName: string
		muscleGroup: string
	}>({ exerciseName: "", muscleGroup: "" })
	const [allExercises, setAllExercises] = useState(globalExercises)

	const handleCreateTemplate = async () => {
		if (!user) return
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/templates`,
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({ template, workoutId: workout?._id || null }),
				}
			)
			console.log("response: ", response)
			const data = await response.json()
			toast.success(`Successfully created ${data.templateName} template`)
			router.push("/template")
		} catch (e) {
			toast.error(
				"There was an issue creating the template. Please try again"
			)
		}
	}
	console.log(template)
	return (
		<Layout>
			<div className="flex flex-col p-4 gap-8">
				<div className="flex flex-col gap-4">
					<p className="text-xl font-semibold ml-5 sm:text-center sm:ml-0">
						Template name
					</p>
					<input
						onChange={(e) => {
							setTemplate({
								...template,
								templateName: e.target.value,
							})
						}}
						type="text"
						placeholder="Add template name"
						className="input input-bordered w-full max-w-xs self-center"
					/>
				</div>
				<div className="flex flex-col items-center gap-4">
					<select
						value={templateExercise.muscleGroup}
						className="select select-bordered w-full max-w-xs self-center text-xl"
						onChange={(e) => {
							setAllExercises(
								globalExercises.filter(
									(exercise) =>
										exercise.muscleGroup === e.target.value
								)
							)
							setTemplateExercise({
								exerciseName: "",
								muscleGroup: e.target.value,
							})
						}}
					>
						<option disabled selected value="">
							Select a muscle group
						</option>
						<option value="abs">Abs</option>
						<option value="back">Back</option>
						<option value="biceps">Biceps</option>
						<option value="chest">Chest</option>
						<option value="legs">Legs</option>
						<option value="shoulders">Shoulders</option>
						<option value="triceps">Triceps</option>
					</select>
					<select
						className="select select-bordered w-full max-w-xs self-center text-xl"
						disabled={!templateExercise.muscleGroup}
						value={templateExercise.exerciseName}
						onChange={(e) => {
							setTemplateExercise({
								...templateExercise,
								exerciseName: e.target.value,
							})
						}}
					>
						<option disabled selected value="">
							Select an exercise
						</option>
						{allExercises.map((exercise) => (
							<option
								key={exercise._id}
								value={`${exercise.name}`}
							>
								{exercise.name}
							</option>
						))}
					</select>
					<button
						className={`text-primary-focus`}
						onClick={() => {
							if (
								!templateExercise.exerciseName ||
								!templateExercise.muscleGroup
							) {
								toast.error(
									"The exercise must have a muscle group and name selected"
								)
								return
							}

							const currentTemplateExercises =
								template.templateExercises

							if (
								currentTemplateExercises.filter(
									(item) =>
										item.exerciseName ===
										templateExercise.exerciseName
								).length > 0
							) {
								toast.error(
									"You have already added this exercise to this template"
								)
								return
							}
							currentTemplateExercises.push({
								exerciseName: templateExercise.exerciseName,
								muscleGroup: templateExercise.muscleGroup,
							})
							setTemplate({
								...template,
								templateExercises: currentTemplateExercises,
							})
							setTemplateExercise({
								exerciseName: "",
								muscleGroup: "",
							})
						}}
					>
						Add exercise to template
					</button>
				</div>
				<div className="h-72 overflow-auto flex flex-col gap-4 md:w-[325px] md:self-center">
					{template.templateExercises.length > 0 && (
						<div>
							<p className="text-xl font-semibold ml-5 sm:text-center sm:ml-0">
								Exercises
							</p>
							{template.templateExercises.map((exercise, i) => (
								<div
									key={exercise.exerciseName}
									className="p-4 border-b border-primary-content"
								>
									<p className="font-semibold">
										{exercise.exerciseName}
									</p>
									<div className="border border-primary w-full" />
									<p className="capitalize">
										{exercise.muscleGroup}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
				<button
					onClick={() => {
						if (!template.templateName) {
							toast.error("Template must be named")
							return
						} else if (template.templateExercises.length == 0) {
							toast.error("Template must have exercises")
							return
						}
						return handleCreateTemplate()
					}}
					className="btn bg-primary-focus text-white md:w-[325px] md:self-center"
				>
					Create template +
				</button>
			</div>
		</Layout>
	)
}

export default create
