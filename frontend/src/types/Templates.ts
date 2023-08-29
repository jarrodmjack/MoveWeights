export interface Template {
	_id: string
	name: string
	exercises: { exerciseName: string; muscleGroup: string }[]
}

export type TemplateExercise = {
	exerciseName: string
	muscleGroup: string
}
