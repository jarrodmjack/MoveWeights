import { Exercise, Workout } from "@/types/Workout"
import { createContext } from "react"

type WorkoutContextType = {
	workout: Workout | undefined
	isLoading: boolean
	fetchTodaysWorkout: () => void
  updateExercises: (updatedExercises: Exercise[]) => void
}

export const WorkoutContext = createContext<WorkoutContextType | undefined>(
	undefined
)
