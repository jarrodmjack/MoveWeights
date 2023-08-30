import { useAuthContext } from "@/hooks/useAuthContext"
import Link from "next/link"
import React, { PropsWithChildren, useContext } from "react"
import BottomNav from "../nav/BottomNav"
import { useRouter } from "next/router"
import LandingView from "../LandingView"
import LogoutButton from "../button/LogoutButton"
import Image from "next/image"
import { WorkoutContext } from "@/context/WorkoutContext"
import { FaChevronDown } from "react-icons/fa"

type LayoutOwnProps = {} & PropsWithChildren

const Layout: React.FC<LayoutOwnProps> = ({ children }) => {
	const { user } = useAuthContext()
	const router = useRouter()
	const { workout } = useContext(WorkoutContext)!

	return (
		<main className="flex flex-col h-screen">
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
				<div className="flex mr-4">
					<ul className="mb-1">
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
					</ul>
				</div>
				<div className="dropdown dropdown-bottom dropdown-end cursor-pointer">
					<label tabIndex={0} className="m-1 cursor-pointer flex items-center gap-1">
						<span>Menu</span>
						<FaChevronDown className="scale-75" />
					</label>
					<ul
						tabIndex={0}
						className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-neutral-focus cursor-pointer"
					>
						{user ? (
							<>
								<li>
									<LogoutButton />
								</li>
								<li>
									<Link href="/template">Templates</Link>
								</li>
							</>
						) : (
							<>
								<li>
									<Link href="/login">Log in</Link>
								</li>
								<li>
									<Link href="/signup">Sign up</Link>
								</li>
							</>
						)}
					</ul>
				</div>
				{/* <div className="flex-none border">
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
										<>
											<li>
												<LogoutButton />
											</li>
											<li>
												<Link href="/template">
													Templates
												</Link>
											</li>
										</>
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
				</div> */}
			</nav>
			{!user ? (
				<LandingView />
			) : (
				<div className="w-full md:w-1/2 mx-auto">
					{children}
					<BottomNav />
				</div>
			)}
		</main>
	)
}

export default Layout
