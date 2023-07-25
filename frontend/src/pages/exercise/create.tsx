import AddNewExerciseForm from "@/components/form/AddNewExerciseForm"
import Layout from "@/components/layout/Layout"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import {toast} from 'react-hot-toast'

const create = () => {
	const { user } = useAuthContext()
	const router = useRouter()
	const createExercise = async (data: {
		muscleGroup: string
		exerciseName: string
	}) => {
		try {
			const exerciseName = data.exerciseName.trim()
			console.log(data.muscleGroup)
			console.log(exerciseName)
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/create-exercise`,
				{
					method: "POST",
					headers: { 
						"Content-type": "application/json",
						'Authorization': `Bearer ${user.token}`
					 },
					body: JSON.stringify({muscleGroup: data.muscleGroup, exerciseName}),
				}
			)
			toast.success('Successfully added')
				router.push('/workout/addExercise')
		} catch(e) {
			toast.error('There was an issue, please try again')
		}
		
	}

	return (
		<Layout>
			<div className="flex flex-col gap-8 p-4">
				<h3 className="text-xl font-semibold">Add a new exercise</h3>
				<AddNewExerciseForm handleSubmit={createExercise} />
			</div>
		</Layout>
	)
}

export default create
