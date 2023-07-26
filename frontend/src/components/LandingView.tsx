import Image from "next/image"
import React from "react"
import LoginButton from "./button/LoginButton"
import SignupButton from "./button/SignupButton"
import Link from "next/link"

const LandingView = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="p-4 flex flex-col gap-4 items-center">
				<h2 className="text-2xl font-semibold">Track your workouts</h2>
				<Image
					className="shadow-xl"
					width={175}
					height={190}
					src="/images/trackworkoutslanding.png"
					alt="app workout history image"
				/>
			</div>
			<div className="p-4 flex flex-col gap-4 items-center">
				<h2 className="text-2xl font-semibold">Add custom exercises</h2>
				<Image
					className="shadow-xl"
					width={175}
					height={210}
					src="/images/addexerciseexample.png"
					alt="app workout history image"
				/>
			</div>
            <div className="flex justify-center items-center gap-2 text-xl">
                <Link className="text-primary" href="/login">
                    Log in
                </Link>
                <p>or</p>
                <Link className="text-primary" href="signup">
                    Sign up
                </Link>
            </div>
		</div>
	)
}

export default LandingView
