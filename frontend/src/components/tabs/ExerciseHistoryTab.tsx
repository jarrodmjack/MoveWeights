import { useAuthContext } from "@/hooks/useAuthContext"
import React, { useEffect } from "react"
import { toast } from "react-hot-toast"



const ExerciseHistoryTab = ({

}) => {
	const { user } = useAuthContext()

	return <div className="flex flex-col gap-8 p-4">ExerciseHistoryTab</div>
}

export default ExerciseHistoryTab
