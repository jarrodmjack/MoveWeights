
import { type AppType } from "next/app"
import Head from "next/head"
import "tailwindcss/tailwind.css"
import { AuthContextProvider } from "../context/AuthContext"
import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import React from "react"
import '../app/globals.css'

const App: AppType = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>TravelGuide</title>
				<meta name="description" content="🐢" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AuthContextProvider>
				<Component {...pageProps} />
			</AuthContextProvider>
		</>
	)
}

export default dynamic(() => Promise.resolve(App), {
	ssr: false,
})
