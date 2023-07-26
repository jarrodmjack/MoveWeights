import React, { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"

const signup = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { signup, error } = useSignup()

	const handleSignup = async () => {
		await signup(email, password)
	}

	return (
		<div className="h-screen flex flex-col justify-center gap-4 items-center">
			<h2 className="text-2xl font-semibold">Sign up for MoveWeights</h2>
			<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
				<div className="card-body">
					<Link href="/">
						<FaArrowLeft />
					</Link>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							onChange={(e) => setEmail(e.target.value)}
							required
							value={email}
							type="text"
							placeholder="email"
							className="input input-bordered"
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							onChange={(e) => setPassword(e.target.value)}
							required
							value={password}
							type="password"
							placeholder="password"
							className="input input-bordered"
						/>
						<label className="label">
							<a
								href="#"
								className="label-text-alt link link-hover"
							>
								Forgot password?
							</a>
						</label>
						{error && <p className="text-danger">{error}</p>}
					</div>
					<div className="form-control mt-6">
						<button
							onClick={() => handleSignup()}
							className="btn bg-primary text-white"
						>
							Sign up
						</button>
					</div>
					<p>
						Already have an account?{" "}
						<Link className="text-primary underline" href="/login">
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

export default signup
