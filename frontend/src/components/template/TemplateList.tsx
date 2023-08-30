import { Template } from "@/types/Templates"
import Link from "next/link"
import React from "react"

type TemplateListOwnProps = {
	templates: Template[]
}

const TemplateList: React.FC<TemplateListOwnProps> = ({ templates }) => {
	return (
		<div className="flex flex-col gap-6 h-[450px] overflow-auto">
			{templates.map((template) => (
				<Link
					className="transition shadow-md hover:bg-primary-content hover:shadow-none"
					key={template._id}
					href={`/template/${template._id}`}
				>
					<div
						id={`${template._id}`}
						className="p-4"
						key={template._id}
					>
						<p className="text-xl text-center">{template.name}</p>
					</div>
				</Link>
			))}
		</div>
	)
}

export default TemplateList
