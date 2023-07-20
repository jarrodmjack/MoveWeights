import React, { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useRouter } from "next/router"
import Link from "next/link"
;("use-client")
import { FaArrowLeft } from 'react-icons/fa';


const login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { login, error } = useLogin()
	const { user } = useAuthContext()
	const router = useRouter()

	const handleLogin = async () => {
		console.log("login")
		await login(email, password)
	}

	if (user) {
		router.push("/")
	}

	return (
		<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div className="card-body">
				<Link href="/"><FaArrowLeft /></Link>
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
						<a href="#" className="label-text-alt link link-hover">
							Forgot password?
						</a>
					</label>
					{error && <p className="text-danger">{error}</p>}
				</div>
				<div className="form-control mt-6">
					<button
						onClick={() => handleLogin()}
						className="btn bg-aqua"
					>
						Sign in
					</button>
				</div>
				<p>
					Don't have an account? <Link className="text-primary underline" href="/signup">Sign up</Link>
				</p>
			</div>
		</div>
	)
}

export default login
