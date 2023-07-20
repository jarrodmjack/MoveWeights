import { useAuthContext } from "@/hooks/useAuthContext"
import Link from "next/link"
import React, { PropsWithChildren } from "react"

type LayoutOwnProps = {} & PropsWithChildren

const Layout: React.FC<LayoutOwnProps> = ({ children }) => {
	const { user } = useAuthContext()

	return (
		<main className="flex flex-col borderh-screen">
			<nav className="navbar bg-neutral text-base-100">
				<div className="flex-1">
					<a className="btn btn-ghost normal-case text-xl">
						MoveWeights
					</a>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal px-1">
						<li className="text-3xl">+</li>
						<li>
							<details>
								<summary>Menu</summary>
								<ul className="p-2 bg-neutral">
									{user ? (
										<li>
											<a>Log out</a>
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
									<li>
										<a>Settings</a>
									</li>
								</ul>
							</details>
						</li>
					</ul>
				</div>
			</nav>
			{children}
		</main>
	)
}

export default Layout
