import AddNewExerciseForm from "@/components/form/AddNewExerciseForm"
import Layout from "@/components/layout/Layout"
import React, { useEffect, useState } from "react"

const create = () => {
	const [muscleGroup, setMuscleGroup] = useState<string>("")

	useEffect(() => {
		// const createExercise = async () => {
		// 	const response = await fetch(
		// 		`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
		// 		{
		// 			method: "POST",
		// 			headers: { "Content-type": "application/json" },
		// 			body: JSON.stringify({}),
		// 		}
		// 	)
		// }
		// createExercise()
	}, [])

	return (
		<Layout>
			<div>
				ADD A NEW EXERCISE FOR THE USER TO USE
				<AddNewExerciseForm />
			</div>
		</Layout>
	)
}

export default create
