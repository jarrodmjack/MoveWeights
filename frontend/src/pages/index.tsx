import NewWorkoutButton from "@/components/button/NewWorkoutButton"
import Layout from "@/components/layout/Layout"
import ExerciseList from "@/components/exerciseView/ExerciseList"
import { useAuthContext } from "@/hooks/useAuthContext"
import React, { useContext, useState } from "react"
import { WorkoutContext } from "@/context/WorkoutContext"
import Modal from "react-modal"
import Link from "next/link"

const index = () => {
	const { user } = useAuthContext()
	const { workout } = useContext(WorkoutContext)!

	return (
		<Layout>
			<div className="flex flex-col mt-10">
				<div className="overflow-y-auto max-h-[700px] sm:max-h-[800px]">
					{workout ? (
						<>
							<h2 className="ml-10 md:ml-16 mb-8 text-2xl font-semibold">
								Today's workout
							</h2>
							<ExerciseList />
						</>
					) : (
						<div className="flex flex-col items-center gap-20">
							<div className="flex flex-col gap-2">
								<p className="font-semibold text-xl">
									No workout recorded yet today.
								</p>
								<Link
									className="btn bg-primary-focus text-white w-full"
									href="/template"
								>
									Apply a template
								</Link>
							</div>
							<NewWorkoutButton text="New workout" />
						</div>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default index
