import Layout from "@/components/layout/Layout"
import TemplateList from "@/components/template/TemplateList"
import { useAuthContext } from "@/hooks/useAuthContext"
import { Template, TemplateExercise } from "@/types/Templates"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { FaPlus } from "react-icons/fa"

const templates = () => {
	const { user } = useAuthContext()
	const [templates, setTemplates] = useState<Template[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (!user) return
		const fetchUserTemplates = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/templates/all-user-templates`,
					{
						method: "GET",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
					}
				)

				const userTemplates = await response.json()
				setTemplates([...userTemplates])
				setIsLoading(false)
			} catch (e) {
				toast.error("There was an issue fetching your templates")
				setIsLoading(false)
			}
		}
		fetchUserTemplates()
	}, [])

	if (isLoading) {
		return <></>
	}

	return (
		<Layout>
			<div className="flex flex-col gap-8 p-4">
				<h2 className="text-2xl font-semibold text-center">
					Templates
				</h2>
				{templates.length > 0 ? (
					<TemplateList templates={templates} />
				) : (
					<div>No templates</div>
				)}
				<div className="flex items-center gap-2 justify-center mt-10">
					<p>Add a template</p>
					<Link href={`/template/create`}>
						<FaPlus className="text-primary-focus hover:text-primary cursor-pointer scale-150" />
					</Link>
				</div>
			</div>
		</Layout>
	)
}

export default templates
