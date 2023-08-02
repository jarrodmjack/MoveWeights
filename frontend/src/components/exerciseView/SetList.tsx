import { Set } from "@/types/Workout"
import React from "react"

type SetListOwnProps = {
	sets: Set[]
	selectedSetId: string
	handleSelectSet: (setId: string) => void
}

const SetList: React.FC<SetListOwnProps> = ({
	sets,
	handleSelectSet,
	selectedSetId,
}) => {
	return (
		<div className="flex flex-col overflow-auto h-72">
			{sets.map((set, i) => (
				<div
					onClick={() => handleSelectSet(set._id)}
					className={`flex flex-row items-center px-10 py-4 cursor-pointer border-b border-b-neutral-300 ${
						set._id === selectedSetId && "bg-primary-content"
					}`}
					key={set._id}
				>
					<div className="flex-1">
						<p className="font-semibold text-neutral-500">{i + 1}.</p>
					</div>
					<div className="flex gap-2 items-center flex-1">
						<p className="text-2xl font-bold">{set.weight}</p>
						<p className="text-neutral-500">lbs</p>
					</div>
					<div className="flex gap-2 items-center flex-1">
						<p className="text-2xl font-bold">{set.reps}</p>
						<p className="text-neutral-500">reps</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default SetList
