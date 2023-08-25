import Layout from "@/components/layout/Layout"
import TemplateList from "@/components/template/TemplateList"
import Link from "next/link"
import React from "react"
import { FaPlus } from "react-icons/fa"

const templates = () => {
	const testTemplates = [
		{
			_id: "24af7cde-9487-48c6-bfe6-1bf62cf68268",
			templateName: "Monday Full Upper Body",
			templateExercises: [
				{ exerciseName: "Chest Press", muscleGroup: "chest" },
				{ exerciseName: "Barbell Row", muscleGroup: "back" },
				{ exerciseName: "Barbell Curl", muscleGroup: "biceps" },
				{ exerciseName: "Tricep Pushdown", muscleGroup: "triceps" },
				{ exerciseName: "Lat Pulldown", muscleGroup: "back" },
				{ exerciseName: "Delt Raise", muscleGroup: "shoulders" },
			],
		},
		{
			_id: "cf53be7d-a781-4ae5-b37a-c9613b2a874c",
			templateName: "Wednesday Full Body",
			templateExercises: [
				{ exerciseName: "Chest Press", muscleGroup: "chest" },
				{ exerciseName: "Barbell Row", muscleGroup: "back" },
				{ exerciseName: "Barbell Curl", muscleGroup: "biceps" },
				{ exerciseName: "Tricep Pushdown", muscleGroup: "triceps" },
				{ exerciseName: "Squat", muscleGroup: "legs" },
				{ exerciseName: "Delt Raise", muscleGroup: "shoulders" },
			],
		},
		{
			_id: "faa16a3e-eb9c-459c-8c78-2209535b46a7",
			templateName: "Friday Leg Day",
			templateExercises: [
				{ exerciseName: "Leg Press", muscleGroup: "legs" },
				{ exerciseName: "Squat", muscleGroup: "legs" },
				{ exerciseName: "Leg Curl", muscleGroup: "legs" },
				{ exerciseName: "Deadlift", muscleGroup: "legs" },
				{ exerciseName: "Delt Raise", muscleGroup: "shoulders" },
			],
		},
        // {
		// 	_id: "faa16a3e-eb9c-459c-8c78-2209535b46a7",
		// 	templateName: "Friday Leg Day",
		// 	templateExercises: [
		// 		{ exerciseName: "Leg Press", muscleGroup: "legs" },
		// 		{ exerciseName: "Squat", muscleGroup: "legs" },
		// 		{ exerciseName: "Leg Curl", muscleGroup: "legs" },
		// 		{ exerciseName: "Deadlift", muscleGroup: "legs" },
		// 		{ exerciseName: "Delt Raise", muscleGroup: "shoulders" },
		// 	],
		// },
        // {
		// 	_id: "faa16a3e-eb9c-459c-8c78-2209535b46a7",
		// 	templateName: "Friday Leg Day",
		// 	templateExercises: [
		// 		{ exerciseName: "Leg Press", muscleGroup: "legs" },
		// 		{ exerciseName: "Squat", muscleGroup: "legs" },
		// 		{ exerciseName: "Leg Curl", muscleGroup: "legs" },
		// 		{ exerciseName: "Deadlift", muscleGroup: "legs" },
		// 		{ exerciseName: "Delt Raise", muscleGroup: "shoulders" },
		// 	],
		// },
        // {
		// 	_id: "faa16a3e-eb9c-459c-8c78-2209535b46a7",
		// 	templateName: "Friday Leg Day",
		// 	templateExercises: [
		// 		{ exerciseName: "Leg Press", muscleGroup: "legs" },
		// 		{ exerciseName: "Squat", muscleGroup: "legs" },
		// 		{ exerciseName: "Leg Curl", muscleGroup: "legs" },
		// 		{ exerciseName: "Deadlift", muscleGroup: "legs" },
		// 		{ exerciseName: "Delt Raise", muscleGroup: "shoulders" },
		// 	],
		// },
        // {
		// 	_id: "faa16a3e-eb9c-459c-8c78-2209535b46a7",
		// 	templateName: "Friday Leg Day",
		// 	templateExercises: [
		// 		{ exerciseName: "Leg Press", muscleGroup: "legs" },
		// 		{ exerciseName: "Squat", muscleGroup: "legs" },
		// 		{ exerciseName: "Leg Curl", muscleGroup: "legs" },
		// 		{ exerciseName: "Deadlift", muscleGroup: "legs" },
		// 		{ exerciseName: "Delt Raise", muscleGroup: "shoulders" },
		// 	],
		// },
        // {
		// 	_id: "faa16a3e-eb9c-459c-8c78-2209535b46a7",
		// 	templateName: "Friday Leg Day",
		// 	templateExercises: [
		// 		{ exerciseName: "Leg Press", muscleGroup: "legs" },
		// 		{ exerciseName: "Squat", muscleGroup: "legs" },
		// 		{ exerciseName: "Leg Curl", muscleGroup: "legs" },
		// 		{ exerciseName: "Deadlift", muscleGroup: "legs" },
		// 		{ exerciseName: "Delt Raise", muscleGroup: "shoulders" },
		// 	],
		// },
        // {
		// 	_id: "faa16a3e-eb9c-459c-8c78-2209535b46a7",
		// 	templateName: "Friday Leg Day",
		// 	templateExercises: [
		// 		{ exerciseName: "Leg Press", muscleGroup: "legs" },
		// 		{ exerciseName: "Squat", muscleGroup: "legs" },
		// 		{ exerciseName: "Leg Curl", muscleGroup: "legs" },
		// 		{ exerciseName: "Deadlift", muscleGroup: "legs" },
		// 		{ exerciseName: "Delt Raise", muscleGroup: "shoulders" },
		// 	],
		// },
        // {
		// 	_id: "faa16a3e-eb9c-459c-8c78-2209535b46a7",
		// 	templateName: "Friday Leg Day",
		// 	templateExercises: [
		// 		{ exerciseName: "Leg Press", muscleGroup: "legs" },
		// 		{ exerciseName: "Squat", muscleGroup: "legs" },
		// 		{ exerciseName: "Leg Curl", muscleGroup: "legs" },
		// 		{ exerciseName: "Deadlift", muscleGroup: "legs" },
		// 		{ exerciseName: "Delt Raise", muscleGroup: "shoulders" },
		// 	],
		// },
	]

	return (
		<Layout>
			<div className="flex flex-col gap-8 p-4">
				<h2 className="text-2xl font-semibold">Templates</h2>
				{testTemplates.length > 0 ? (
					<TemplateList templates={testTemplates} />
				) : (
					<div>No templates</div>
				)}
                <div className="flex items-center gap-2 justify-center mt-10">
                <p>Add a template</p>
					<Link href={`/template/create`}>
						<FaPlus className="text-primary-focus hover:text-primary cursor-pointer scale-150" />
					</Link>
                </div>
			</div>
		</Layout>
	)
}

export default templates
