import React from "react"

type NewWorkoutButtonOwnProps = {
	text: "string"
}

const NewWorkoutButton = ({ text = "" }) => {
	return <div className="text-neutral">+ {text}</div>
}

export default NewWorkoutButton
