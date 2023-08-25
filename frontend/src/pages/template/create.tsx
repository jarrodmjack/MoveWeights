import Layout from "@/components/layout/Layout"
import { useAuthContext } from "@/hooks/useAuthContext"
import { Template } from "@/types/Templates"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { globalExercises } from "@/utils/globalExercises"
import Select from "react-select"

const create = () => {
	const { user } = useAuthContext()
	const router = useRouter()

	const [template, setTemplate] = useState({
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
					body: JSON.stringify({ test: "test" }),
				}
			)
			console.log("resposne: ", response)
			const data = await response.json()
			toast.success(`Successfully created ${data.templateName} template`)
			router.push("/template")
		} catch (e) {
			toast.error(
				"There was an issue creating the template. Please try again"
			)
		}
	}

	return (
		<Layout>
			<div className="flex flex-col p-4 gap-8">
				<div className="flex flex-col gap-4">
					<p className="text-xl font-semibold">Template name</p>
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
							<option value={`${exercise.name}`}>
								{exercise.name}
							</option>
						))}
					</select>
				</div>
				<div></div>
				<button
					onClick={() => {
						return handleCreateTemplate()
					}}
					className="btn bg-primary-focus text-white"
				>
					Create template +
				</button>
			</div>
		</Layout>
	)
}

export default create
