export interface Workout {
    _id: string
    exercises: Exercise[]
    date: Date | undefined
}

export interface Exercise {
    _id: string
    userId: string
    name: string
    muscleGroup: string
    sets: Set[]
}

export interface Set {
    reps: number
    weight: number
}