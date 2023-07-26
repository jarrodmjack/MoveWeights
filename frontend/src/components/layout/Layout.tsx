import { useAuthContext } from "@/hooks/useAuthContext"
import Link from "next/link"
import React, { PropsWithChildren, useEffect } from "react"
import BottomNav from "../nav/BottomNav"
import { useRouter } from "next/router"
import LandingView from "../LandingView"
import LogoutButton from "../button/LogoutButton"

type LayoutOwnProps = {} & PropsWithChildren

const Layout: React.FC<LayoutOwnProps> = ({ children }) => {
	const { user } = useAuthContext()
	const router = useRouter()

	return (
		<main className="flex flex-col borderh-screen">
			<nav className="navbar bg-neutral text-base-100">
				<div className="flex-1">
					<a className="btn btn-ghost normal-case text-xl">
						MoveWeights
					</a>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal">
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
													Sign in
												</Link>
											</li>
											<li>
												<Link href="/signup">
													Sign up
												</Link>
											</li>
										</>
									)}
									{/* <li>
										<a>Settings</a>
									</li> */}
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
