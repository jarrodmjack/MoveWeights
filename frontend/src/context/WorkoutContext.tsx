import { Workout } from "@/types/Workout";
import { createContext } from "react";

type WorkoutContextType = {
    workout: Workout | undefined;
    fetchTodaysWorkout: () => void;
    isLoading: boolean
  };

export const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);