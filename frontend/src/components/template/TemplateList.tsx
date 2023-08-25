import { Template } from "@/types/Templates"
import Link from "next/link"
import React, { useEffect } from "react"

type TemplateListOwnProps = {
	templates: Template[]
}

const TemplateList: React.FC<TemplateListOwnProps> = ({ templates }) => {

	
    return (
		<div className="flex flex-col gap-6 h-[450px] overflow-auto">
			{templates.map((template) => (
				<Link href={`/template/${template._id}`}>
                <div
					onClick={(e) => console.log(e.currentTarget.id)}
					id={`${template._id}`}
					className="shadow-lg p-4"
					key={template._id}
				>
					<p className="text-xl text-center">
						{template.templateName}
					</p>
				</div>
                </Link>
			))}
		</div>
	)
}

export default TemplateList
