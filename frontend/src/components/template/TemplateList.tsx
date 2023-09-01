import { useAuthContext } from "@/hooks/useAuthContext"
import { Template } from "@/types/Templates"
import Link from "next/link"
import React, { useState } from "react"
import { FaTimesCircle } from "react-icons/fa"
import LoadingDots from "../loading/LoadingDots"
import { toast } from "react-hot-toast"
import LoadingSpinner from "../loading/LoadingSpinner"

type TemplateListOwnProps = {
	templates: Template[]
	handleDeleteTemplate: (templateId: string) => void
}

const TemplateList: React.FC<TemplateListOwnProps> = ({
	templates,
	handleDeleteTemplate,
}) => {
	const { user } = useAuthContext()
	const [isLoading, setIsLoading] = useState(false)

	if (isLoading) {
		return (
			<div className="h-screen mt-40 flex items-start justify-center">
				<LoadingSpinner />
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-6 h-[450px] overflow-auto py-4">
			{templates.map((template) => (
				<div key={template._id} className="flex flex-col gap-1">
					<FaTimesCircle
						id={template._id}
						onClick={(e) => {
							handleDeleteTemplate(e.currentTarget.id)
						}}
						className="text-danger scale-125 self-end mr-2 cursor-pointer"
					/>
					<Link
						className="transition shadow-md hover:bg-primary-content hover:shadow-none"
						href={`/template/${template._id}`}
					>
						<div
							id={`${template._id}`}
							className="p-4 relative transition shadow-md hover:bg-primary-content hover:shadow-none"
							key={template._id}
						>
							<p className="text-xl text-center">
								{template.name}
							</p>
						</div>
					</Link>
				</div>
			))}
		</div>
	)
}

export default TemplateList
