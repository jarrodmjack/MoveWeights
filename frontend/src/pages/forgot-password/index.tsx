import { useRouter } from "next/router"
import React, { useState } from "react"
import { toast } from "react-hot-toast"

const ForgotPassword = () => {
	const [email, setEmail] = useState("")
	const [hasError, setHasError] = useState<boolean | null>(null)
	const router = useRouter()

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
					"User with this email does not exist. Please ensure the information you entered is correct and try again."
				)
			} else {
				setHasError(false)
				toast.success(
					"A password reset link has been sent to your email"
				)
			}

			setTimeout(() => {
				router.push("/")
			}, 5000)
		} catch (e) {
			// toast.error("No user with that email")
		}
	}

	if (hasError === false) {
		return (
			<div className="p-8 sm:w-1/2 md:w-1/4 mx-auto flex flex-col h-screen justify-center items-center">
				<p>
					An email with a link has been sent to your email. You will be redirected in 5 seconds
				</p>
			</div>
		)
	}

	return (
		<div className="p-8 sm:w-1/2 md:w-1/4 mx-auto">
			<form className="flex flex-col mt-40 md:mt-0 gap-8">
				<img
					src="/images/cappasswordmeme.png"
					alt="captain america meme"
				/>
				<p className="text-xl font-semibold">
					Enter the email associated with your{" "}
					<span className="font-bold">MoveWeights</span> account
				</p>
				<div className="flex flex-col gap-4 w-full">
					<input
						placeholder="Account email"
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
				</div>
			</form>
		</div>
	)
}

export default ForgotPassword
