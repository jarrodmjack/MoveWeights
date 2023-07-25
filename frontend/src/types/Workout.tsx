export interface Workout {
    id: string
    exercises: Exercise[]
    date: Date
}

export interface Exercise {
    id: string
    userId: string
    name: string
    muscleGroup: string
    sets: Set[]
}

export interface Set {
    id: string
    reps: number
    weight: number
}