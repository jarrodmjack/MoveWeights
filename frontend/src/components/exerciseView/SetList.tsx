import { Set } from "@/types/Workout"
import React from "react"
import { FaRegTimesCircle } from "react-icons/fa"

type SetListOwnProps = {
	sets: Set[]
	handleDeleteSet: (setId: string) => void
}

const SetList: React.FC<SetListOwnProps> = ({ sets, handleDeleteSet }) => {
	return (
		<div className="flex flex-col gap-6 overflow-auto h-72">
			{sets.map((set, i) => (
				<div className="flex flex-row items-center px-10" key={set._id}>
					<div className="flex gap-2 items-center flex-1">
						<p className="text-2xl font-bold">{set.weight}</p>
						<p className="text-neutral">lbs</p>
					</div>
					<div className="flex gap-2 items-center flex-1">
						<p className="text-2xl font-bold">{set.reps}</p>
						<p className="text-neutral">reps</p>
					</div>
					<div>
						<FaRegTimesCircle
							onClick={(e) => {
								handleDeleteSet(e.currentTarget.id)
							}}
							id={`${set._id}`}
							className="flex-1 text-danger hover:scale-125 cursor-pointer"
						/>
					</div>
				</div>
			))}
		</div>
	)
}

export default SetList
