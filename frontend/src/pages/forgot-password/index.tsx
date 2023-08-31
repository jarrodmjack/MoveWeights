import React, { useState } from "react"
import { toast } from "react-hot-toast"

const ForgotPassword = () => {
	const [email, setEmail] = useState("")
	const [hasError, setHasError] = useState<boolean | null>(null)

	const handleSendResetPasswordRequest = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/user/forgot-password`,
				{
					method: "POST",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({
						email,
					}),
				}
			)

			if (!response.ok) {
				toast.error(
					"User with this email does not exist. Please try a different email"
				)
			} else {
				setHasError(false)
				toast.success(
					"A password reset link has been sent to your email"
				)
			}
		} catch (e) {
			// toast.error("No user with that email")
		}
	}

	if (hasError === false) {
		//if we sent a request successfully
		return <>SUCCESSFUL</>
	}

	return (
		<div>
			Enter email
			<form className="flex flex-col items-start mt-40">
				<input
					className="input input-bordered"
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					name="email"
					id="email"
				/>
				<button
					className="btn bg-primary-focus text-white"
					onClick={(e) => {
						e.preventDefault()
						handleSendResetPasswordRequest()
					}}
				>
					Submit
				</button>
			</form>
		</div>
	)
}

export default ForgotPassword
