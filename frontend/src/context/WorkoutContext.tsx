import { Workout } from "@/types/Workout";
import { createContext } from "react";

type WorkoutContextType = {
    workout: Workout | undefined;
    fetchTodaysWorkout: () => void;
  };

export const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);