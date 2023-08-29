import Layout from "@/components/layout/Layout"
import { WorkoutContext } from "@/context/WorkoutContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import { Template } from "@/types/Templates"
import { useRouter } from "next/router"
import React, { useEffect, useState, useContext } from "react"
import { toast } from "react-hot-toast"

const index = () => {
	const router = useRouter()
	const { workout } = useContext(WorkoutContext)!
	const { user } = useAuthContext()
	const [template, setTemplate] = useState<Template>()
	const [isLoading, setIsLoading] = useState(false)
	const currentDate = new Date()
	const currentTimeZoneOffset = currentDate.getTimezoneOffset()

	useEffect(() => {
		if (!router.query.id || !user) return

		const fetchTemplateById = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/templates/template/${router.query.id}`,
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
				setTemplate(data)
				setIsLoading(false)
			} catch (e) {
				toast.error("There was an issue fetching the template")
				setIsLoading(false)
			}
		}
		fetchTemplateById()
	}, [router])
	console.log("workout id: ", workout?._id)
	const handleApplyTemplateToWorkout = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/apply-template`,
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({
						tzOffset: currentTimeZoneOffset,
						workoutId: workout?._id || null,
						templateId: template!._id,
					}),
				}
			)
            const data = await response.json()
            console.log('data: ', data)
		} catch (e) {
			toast.error("Error applying template to workout")
		}
	}

	if (!template) {
		return <></>
	}

	return (
		<Layout>
			<div className="flex flex-col p-4 gap-8">
				{template.name}
				{template.exercises.map((exercise, i) => (
					<span key={i}>{exercise.exerciseName}</span>
				))}
			</div>
			<button
				onClick={() => {
					handleApplyTemplateToWorkout()
				}}
				className="btn bg-primary-focus text-white"
			>
				Apply template to workout
			</button>
		</Layout>
	)
}

export default index
