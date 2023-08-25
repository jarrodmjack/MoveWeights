export interface Template {
	_id: string
	templateName: string
	templateExercises: { exerciseName: string; muscleGroup: string }[]
}
