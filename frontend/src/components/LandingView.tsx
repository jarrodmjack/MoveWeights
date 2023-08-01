import Image from "next/image"
import React from "react"
import LoginButton from "./button/LoginButton"
import SignupButton from "./button/SignupButton"
import Link from "next/link"

const LandingView = () => {


	const saveGeoLocationData = async () => {


		try {
			const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=bbd3d0696e0e4a1c8ceb4b72a639d2df`

			const geoResponse = await fetch(url)
			const geoData = await geoResponse.json()

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/exercise/geo`,
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({geoData: geoData}),
				}
			)
			console.log("response: ", response)
		} catch (e) {
			console.log(e)
		}
	}
	saveGeoLocationData()


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
