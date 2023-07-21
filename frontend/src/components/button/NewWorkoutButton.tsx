import Link from "next/link"
import React from "react"
import { FaPlus } from "react-icons/fa"

type NewWorkoutButtonOwnProps = {
	text: string
}

const NewWorkoutButton: React.FC<NewWorkoutButtonOwnProps> = ({
	text = "",
}) => {

	return (
		<div className="flex flex-col items-center">
			<Link href="/workout/create">
				<FaPlus className="text-primary hover:text-primary-focus cursor-pointer scale-150" />
			</Link>
			<p>{text}</p>
		</div>
	)
}

export default NewWorkoutButton
