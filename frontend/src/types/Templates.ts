export interface Template {
	_id: string
	name: string
	templateExercises: { exerciseName: string; muscleGroup: string }[]
}

export type TemplateExercise = {
	exerciseName: string
	muscleGroup: string
}
