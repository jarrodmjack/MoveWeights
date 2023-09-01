import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const index = () => {
	const router = useRouter()
	const [linkIsVerified, setLinkIsVerified] = useState<boolean | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [password2, setPassword2] = useState("")

	useEffect(() => {
		if (!router.query.userId || !router.query.token) return

		const verifyPasswordResetLink = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/user/reset-password/${router.query.userId}/${router.query.token}`,
				{
					method: "GET",
					headers: {
						"Content-type": "application/json",
					},
				}
			)
			if (response.ok) {
				setLinkIsVerified(true)
				const data = await response.json()
				setEmail(data.email)
			} else {
				setLinkIsVerified(false)
				toast.error("Invalid link. Please request another")
			}
		}
		verifyPasswordResetLink()
	}, [router.query])

	const handleSubmitPasswordReset = async () => {
		setIsLoading(true)
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/user/reset-password/${router.query.userId}/${router.query.token}`,
			{
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ password, password2 }),
			}
		)

		if (response.ok) {
			router.push("/login")
		} else {
			setIsLoading(false)
			const data = await response.json()
			toast.error(data.error)
		}
	}

	if (!router.query) {
		return <>Loading...</>
	}

	if (linkIsVerified) {
		return (
			<div className="h-screen flex flex-col justify-center items-center">
				<div className="flex flex-col gap-4 rounded-lg shadow-xl p-8">
					<p className="text-xl font-semibold">
						Please enter your new password
					</p>
					<form className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<label htmlFor="password">New password</label>
							<input
								onChange={(e) => setPassword(e.target.value)}
								className="input input-bordered"
								type="password"
								name="password"
								id="password"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="password2">
								Confirm new password
							</label>
							<input
								onChange={(e) => setPassword2(e.target.value)}
								className="input input-bordered"
								type="password"
								name="password2"
								id="password2"
							/>
						</div>
						<button
							disabled={isLoading}
							className="btn bg-primary-focus text-white"
							onClick={(e) => {
								e.preventDefault()
								handleSubmitPasswordReset()
							}}
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		)
	}

	if (linkIsVerified === false) {
		return (
			<div className="h-screen flex flex-col items-center justify-center">
				<div>
					<p>
						The link has expired or there was an issue verifying the
						link.{" "}
						<Link className="text-primary hover:underline" href="/forgot-password">
							Please make another request
						</Link>
					</p>
				</div>
			</div>
		)
	}

	return <div></div>
}

export default index
