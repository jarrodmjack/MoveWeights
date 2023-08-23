export interface Workout {
    _id: string
    exercises: Exercise[]
    date: Date | undefined
    createdAt: string
}

export interface Exercise {
    _id: string
    userId: string
    name: string
    muscleGroup: string
    sets: Set[]
    createdAt: string
}

export interface Set {
    _id: string
    reps: number
    weight: number
    exerciseId: string
}