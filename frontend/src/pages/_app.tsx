import { type AppType } from "next/app"
import Head from "next/head"
import "tailwindcss/tailwind.css"
import { AuthContextProvider } from "../context/AuthContext"
import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import React from "react"
import "../app/globals.css"
import { Toaster } from "react-hot-toast"

const App: AppType = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>MoveWeights</title>
				<meta name="description" content="🐢" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Toaster position="top-right" reverseOrder={false} />
			<AuthContextProvider>
				<Component {...pageProps} />
			</AuthContextProvider>
		</>
	)
}

export default dynamic(() => Promise.resolve(App), {
	ssr: false,
})
