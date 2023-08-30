import Layout from "@/components/layout/Layout"
import { WorkoutContext } from "@/context/WorkoutContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import { Template } from "@/types/Templates"
import { useRouter } from "next/router"
import React, { useEffect, useState, useContext } from "react"
import { toast } from "react-hot-toast"

const index = () => {
	const router = useRouter()
	const { workout, fetchTodaysWorkout } = useContext(WorkoutContext)!
	const { user } = useAuthContext()
	const [template, setTemplate] = useState<Template>()
	const [isLoading, setIsLoading] = useState(true)
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
				setTemplate(data)
				setIsLoading(false)
			} catch (e) {
				toast.error("There was an issue fetching the template")
				setIsLoading(false)
			}
		}
		fetchTemplateById()
	}, [router])

	const handleApplyTemplateToWorkout = async () => {
		setIsLoading(true)
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
			await fetchTodaysWorkout()
			setIsLoading(false)
			router.push("/")
		} catch (e) {
			toast.error("Error applying template to workout")
		}
	}

	if (!template || isLoading) {
		return <></>
	}

	return (
		<Layout>
			<div className="flex flex-col p-4 gap-8">
				<div className="flex flex-col gap-10">
					<h2 className="text-2xl font-semibold text-center">
						{template.name}
					</h2>
					<div className="flex flex-col h-96 overflow-auto w-full md:w-2/3 md:self-center">
						{template.exercises.map((exercise, i) => (
							<div
								key={i}
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
				</div>
				<div className="flex justify-center mt-10">
					<button
						onClick={() => {
							handleApplyTemplateToWorkout()
						}}
						className="btn bg-primary-focus text-white self-center"
					>
						Apply template to workout
					</button>
				</div>
			</div>
		</Layout>
	)
}

export default index
