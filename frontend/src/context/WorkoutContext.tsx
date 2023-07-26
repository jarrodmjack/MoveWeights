import { Workout } from "@/types/Workout";
import { createContext } from "react";

export const WorkoutContext = createContext<Workout | undefined>(undefined);