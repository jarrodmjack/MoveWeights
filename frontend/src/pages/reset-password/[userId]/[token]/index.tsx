import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const index = () => {
	const router = useRouter()
	const [linkIsVerified, setLinkIsVerified] = useState(false)
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
				toast.error("Invalid link. Please request another")
			}
		}
		verifyPasswordResetLink()
	}, [router.query])

	const handleSubmitPasswordReset = async () => {
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
			console.log("ok")
		} else {
			const data = await response.json()
			toast.error(data.error)
		}
	}

	if (!router.query) {
		return <>Loading...</>
	}

	if (linkIsVerified) {
		return (
			<div>
				<p>Change the password for {email}</p>
				<form>
					<div>
						<label htmlFor="password">New password</label>
						<input
							onChange={(e) => setPassword(e.target.value)}
							className="input input-bordered"
							type="password"
							name="password"
							id="password"
						/>
					</div>
					<div>
						<label htmlFor="password2">Confirm new password</label>
						<input
							onChange={(e) => setPassword2(e.target.value)}
							className="input input-bordered"
							type="password"
							name="password2"
							id="password2"
						/>
					</div>
					<button
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
		)
	}

	return <div>test</div>
}

export default index
