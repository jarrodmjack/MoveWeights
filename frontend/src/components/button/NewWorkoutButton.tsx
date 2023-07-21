import { useRouter } from "next/router"
import React from "react"
import { FaPlus } from "react-icons/fa"

type NewWorkoutButtonOwnProps = {
	text: string
}

const NewWorkoutButton: React.FC<NewWorkoutButtonOwnProps> = ({
	text = "",
}) => {
	const router = useRouter()

	const handleRedirectToCreateNewWorkout = () => {
		// router.push('/create-workout')
		console.log("create new workout")
	}

	return (
		<div className="flex flex-col items-center">
			<FaPlus
				className="text-aqua hover:text-aquaDark cursor-pointer scale-150"
				onClick={() => handleRedirectToCreateNewWorkout()}
			/>
			<p>{text}</p>
		</div>
	)
}

export default NewWorkoutButton
