import { useAuthContext } from "@/hooks/useAuthContext"
import Link from "next/link"
import React, { PropsWithChildren, useContext } from "react"
import BottomNav from "../nav/BottomNav"
import { useRouter } from "next/router"
import LandingView from "../LandingView"
import LogoutButton from "../button/LogoutButton"
import Image from "next/image"
import { WorkoutContext } from "@/context/WorkoutContext"

type LayoutOwnProps = {} & PropsWithChildren

const Layout: React.FC<LayoutOwnProps> = ({ children }) => {
	const { user } = useAuthContext()
	const router = useRouter()
	const { workout, fetchTodaysWorkout } = useContext(WorkoutContext)!

	return (
		<main className="flex flex-col borderh-screen">
			<nav className="navbar bg-neutral text-base-100">
				<div className="flex-1">
					<Link
						href="/"
						className="btn btn-ghost normal-case text-xl"
					>
						<Image
							width={150}
							height={60}
							src="/images/mw-white-logo.png"
							alt="moveweights white logo"
						/>
					</Link>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal">
						{router.pathname === "/" && workout && (
							<Link href={`/workout/${workout._id}/addExercise`}>
								<li className="text-3xl">+</li>
							</Link>
						)}
						{router.pathname === "/workout/create" && (
							<Link href="/exercise/create">
								<li className="text-3xl">+</li>
							</Link>
						)}
						<li>
							<details>
								<summary>Menu</summary>
								<ul className="p-2 bg-neutral">
									{user ? (
										<li>
											<LogoutButton />
										</li>
									) : (
										<>
											<li>
												<Link href="/login">
													Log in
												</Link>
											</li>
											<li>
												<Link href="/signup">
													Sign up
												</Link>
											</li>
										</>
									)}
								</ul>
							</details>
						</li>
					</ul>
				</div>
			</nav>
			{!user ? (
				<LandingView />
			) : (
				<>
					{children}
					<BottomNav />
				</>
			)}
		</main>
	)
}

export default Layout
